from flask import Blueprint, request, jsonify
from datetime import datetime, timezone
from slugify import slugify
import markdown
import bleach
from ..extensions import db
from ..models import Post

blog_bp = Blueprint("blog_bp", __name__)

ALLOWED_TAGS = bleach.sanitizer.ALLOWED_TAGS.union({"p","pre","code","h1","h2","h3","h4","h5","h6","img","hr","br","table","thead","tbody","tr","th","td","blockquote","ul","ol","li","a","strong","em","del","span","div"})
ALLOWED_ATTRS = {**bleach.sanitizer.ALLOWED_ATTRIBUTES, "a": ["href","title","target","rel"], "img": ["src","alt","title","width","height"], "code": ["class"], "span": ["class"], "pre": ["class"]}
ALLOWED_PROTOCOLS = ["http","https","mailto"]

def md_to_html(md_text: str) -> str:
    html = markdown.markdown(md_text or "", extensions=["fenced_code","codehilite","tables","toc"])
    clean = bleach.clean(html, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS, protocols=ALLOWED_PROTOCOLS, strip=False)
    # linkify without breaking
    return clean

def excerpt_from_md(md_text: str, max_len=160):
    import re
    txt = re.sub(r"[#*`_>\[\]\(\)!]", " ", md_text or "")
    txt = re.sub(r"\s+", " ", txt).strip()
    if len(txt) <= max_len:
        return txt
    return txt[:max_len-1].strip() + "…"

@blog_bp.route("/posts", methods=["GET"])
def list_posts():
    # public: only published, ordered published_at desc
    status = request.args.get("status")
    # ignore status param for anon, force published
    q = Post.query.filter_by(status="published").order_by(Post.published_at.desc(), Post.id.desc())
    try:
        limit = min(int(request.args.get("limit", 50)), 100)
        offset = int(request.args.get("offset", 0))
    except:
        limit, offset = 50, 0
    posts = q.offset(offset).limit(limit).all()
    return jsonify([p.to_dict(include_content=False) for p in posts])

@blog_bp.route("/posts/<slug>", methods=["GET"])
def get_post(slug):
    post = Post.query.filter_by(slug=slug, status="published").first()
    if not post:
        return jsonify({"error": "not found"}), 404
    return jsonify(post.to_dict(include_content=True))

# for sitemap generation (server fetch, not public enumeration of drafts)
@blog_bp.route("/posts-all-slugs", methods=["GET"])
def all_slugs():
    posts = Post.query.filter_by(status="published").all()
    return jsonify([{"slug": p.slug, "updated_at": p.updated_at.isoformat() if p.updated_at else None} for p in posts])
