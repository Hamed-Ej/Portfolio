from datetime import datetime, timezone
from .extensions import db

def utcnow():
    return datetime.now(timezone.utc)

class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False, index=True)
    title = db.Column(db.String(120), nullable=False)
    excerpt = db.Column(db.String(300), nullable=False, default="")
    content_md = db.Column(db.Text, nullable=False, default="")
    content_html = db.Column(db.Text, nullable=False, default="")
    cover_image = db.Column(db.String(500), nullable=True)
    lang = db.Column(db.String(5), nullable=False, default="en", server_default="en")  # en | fa
    status = db.Column(db.String(20), nullable=False, default="draft")  # draft | published
    published_at = db.Column(db.DateTime, nullable=True, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=utcnow, onupdate=utcnow)

    def to_dict(self, include_content=True):
        d = {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "excerpt": self.excerpt,
            "cover_image": self.cover_image,
            "lang": self.lang or "en",
            "status": self.status,
            "published_at": self.published_at.isoformat() if self.published_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
        if include_content:
            d["content_md"] = self.content_md
            d["content_html"] = self.content_html
        return d
