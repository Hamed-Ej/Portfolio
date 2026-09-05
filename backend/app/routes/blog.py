import re
from flask import Blueprint, request, jsonify
import markdown
import bleach
from ..extensions import db
from ..models import Post

blog_bp = Blueprint("blog_bp", __name__)

ALLOWED_TAGS = frozenset({"p","pre","code","h1","h2","h3","h4","h5","h6","img","hr","br","table","thead","tbody","tr","th","td","blockquote","ul","ol","li","a","strong","em","del","span","div",
    "b","i","u","s","sub","sup","kbd","samp","var","dl","dt","dd","caption","colgroup","col","tfoot","figure","figcaption","abbr","acronym"})
ALLOWED_ATTRS = {"a": ["href","title","target","rel"], "img": ["src","alt","title","width","height"], "code": ["class"], "span": ["class"], "pre": ["class"], "abbr": ["title"], "th": ["align"], "td": ["align"]}
ALLOWED_PROTOCOLS = ["http","https","mailto"]

_MD_STRIP_RE = re.compile(r"[#*`_>\[\]\(\)!]")
_WS_RE = re.compile(r"\s+")

def md_to_html(md_text: str) -> str:
    # fenced_code without codehilite: frontend already highlights via rehype-highlight,
    # so skip per-request Pygments highlighting here
    html = markdown.markdown(md_text or "", extensions=["fenced_code","tables","toc"])
    return bleach.clean(html, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS, protocols=ALLOWED_PROTOCOLS, strip=False)

def excerpt_from_md(md_text: str, max_len=160):
    txt = _MD_STRIP_RE.sub(" ", md_text or "")
    txt = _WS_RE.sub(" ", txt).strip()
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
