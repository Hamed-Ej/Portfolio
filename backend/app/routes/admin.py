from flask import Blueprint, request, jsonify, current_app, g
from datetime import datetime, timezone
from slugify import slugify
import secrets
from pathlib import Path
from werkzeug.utils import secure_filename
from ..extensions import db
from ..models import Post
from ..auth import require_admin, create_token, verify_password, set_auth_cookies, clear_auth_cookies
from .blog import md_to_html, excerpt_from_md

admin_bp = Blueprint("admin_bp", __name__)

ALLOWED_EXT = {".png",".jpg",".jpeg",".webp",".gif",".svg"}

@admin_bp.route("/login", methods=["POST"])
def login():
    # rate limiter will wrap globally, but also simple check
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""
    cfg_user = current_app.config.get("ADMIN_USERNAME")
    cfg_hash = current_app.config.get("ADMIN_PASSWORD_HASH")
    if not cfg_hash:
        return jsonify({"error": "admin not configured"}), 500
    if username != cfg_user or not verify_password(cfg_hash, password):
        return jsonify({"error": "invalid credentials"}), 401
    token = create_token(username, current_app.config.get("JWT_SECRET") or current_app.config["SECRET_KEY"])
    resp = jsonify({"ok": True, "user": username})
    set_auth_cookies(resp, token)
    return resp

@admin_bp.route("/logout", methods=["POST"])
def logout():
    resp = jsonify({"ok": True})
    clear_auth_cookies(resp)
    return resp

@admin_bp.route("/me", methods=["GET"])
@require_admin
def me():
    return jsonify({"user": g.current_user})

# --- posts admin ---
@admin_bp.route("/posts", methods=["GET"])
@require_admin
def admin_list():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([p.to_dict(include_content=False) for p in posts])

@admin_bp.route("/posts/<int:post_id>", methods=["GET"])
@require_admin
def admin_get(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.to_dict(include_content=True))

def _detect_lang(text: str) -> str:
    # naive Persian detection: if contains Arabic block chars
    import re
    if re.search(r'[\u0600-\u06FF]', text or ""):
        return "fa"
    return "en"

def _validate_payload(data):
    title = (data.get("title") or "").strip()
    if len(title) < 3 or len(title) > 120:
        return None, "title must be 3-120 chars"
    raw_slug = (data.get("slug") or "").strip()
    slug = slugify(raw_slug) if raw_slug else slugify(title)
    if not slug or len(slug) < 3:
        return None, "invalid slug"
    content_md = data.get("content_md") or data.get("content") or ""
    if len(content_md) > 100000:
        return None, "content too large"
    excerpt = (data.get("excerpt") or "").strip() or excerpt_from_md(content_md)
    cover = (data.get("cover_image") or "").strip() or None
    status = data.get("status") or "draft"
    if status not in ("draft","published"):
        status = "draft"
    lang = (data.get("lang") or "").strip().lower()
    if lang not in ("en", "fa"):
        # auto-detect from title+content if not provided
        lang = _detect_lang(title + " " + content_md) if (title or content_md) else "en"
        if lang not in ("en", "fa"):
            lang = "en"
    return {"title": title, "slug": slug, "excerpt": excerpt[:300], "content_md": content_md, "cover_image": cover, "status": status, "lang": lang}, None

@admin_bp.route("/posts", methods=["POST"])
@require_admin
def admin_create():
    data = request.get_json(silent=True) or {}
    validated, err = _validate_payload(data)
    if err:
        return jsonify({"error": err}), 400
    # unique slug
    if Post.query.filter_by(slug=validated["slug"]).first():
        return jsonify({"error": "slug already exists"}), 409
    html = md_to_html(validated["content_md"])
    now = datetime.now(timezone.utc)
    post = Post(
        slug=validated["slug"],
        title=validated["title"],
        excerpt=validated["excerpt"],
        content_md=validated["content_md"],
        content_html=html,
        cover_image=validated["cover_image"],
        lang=validated["lang"],
        status=validated["status"],
        published_at=now if validated["status"]=="published" else None,
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict(include_content=True)), 201

@admin_bp.route("/posts/<int:post_id>", methods=["PUT"])
@require_admin
def admin_update(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json(silent=True) or {}
    validated, err = _validate_payload(data)
    if err:
        return jsonify({"error": err}), 400
    # check slug unique (excluding self)
    existing = Post.query.filter_by(slug=validated["slug"]).first()
    if existing and existing.id != post.id:
        return jsonify({"error": "slug already exists"}), 409
    html = md_to_html(validated["content_md"])
    post.slug = validated["slug"]
    post.title = validated["title"]
    post.excerpt = validated["excerpt"]
    post.content_md = validated["content_md"]
    post.content_html = html
    post.cover_image = validated["cover_image"]
    post.lang = validated["lang"]
    was_draft = post.status == "draft"
    post.status = validated["status"]
    if validated["status"] == "published" and was_draft and not post.published_at:
        post.published_at = datetime.now(timezone.utc)
    if validated["status"] == "draft":
        # keep published_at but allow republish later; don't clear
        pass
    db.session.commit()
    return jsonify(post.to_dict(include_content=True))

@admin_bp.route("/posts/<int:post_id>", methods=["DELETE"])
@require_admin
def admin_delete(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"ok": True})

@admin_bp.route("/upload", methods=["POST"])
@require_admin
def upload():
    if "file" not in request.files:
        return jsonify({"error": "no file"}), 400
    f = request.files["file"]
    if not f.filename:
        return jsonify({"error": "no filename"}), 400
    ext = Path(f.filename).suffix.lower()
    if ext not in ALLOWED_EXT:
        return jsonify({"error": f"extension {ext} not allowed"}), 400
    # size check done by MAX_CONTENT_LENGTH, but also manual
    filename = secure_filename(Path(f.filename).stem)[:40]
    new_name = f"{secrets.token_hex(8)}_{filename}{ext}"
    dest = Path(current_app.config["UPLOAD_FOLDER"]) / new_name
    dest.parent.mkdir(parents=True, exist_ok=True)
    f.save(dest)
    # return url; nginx serves /uploads/ -> instance/uploads, flask fallback also serves
    url = f"/uploads/{new_name}"
    return jsonify({"url": url})
