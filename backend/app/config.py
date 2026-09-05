import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
    JWT_SECRET = os.getenv("JWT_SECRET", SECRET_KEY)
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH", "")
    # Set plain password via ADMIN_PASSWORD env to auto-hash on start if hash not provided
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")
    _default_db = f"sqlite:///{(BASE_DIR / 'instance' / 'blog.db').as_posix()}"
    DATABASE_URL = os.getenv("DATABASE_URL", _default_db)
    # Resolve relative sqlite path to absolute based on BASE_DIR
    if DATABASE_URL.startswith("sqlite:///") and not DATABASE_URL.startswith("sqlite:////"):
        rel = DATABASE_URL.replace("sqlite:///", "", 1)
        # if not absolute (contains : or starts with /), make absolute
        if not (":" in rel or rel.startswith("/")):
            abs_path = (BASE_DIR / rel).resolve().as_posix()
            DATABASE_URL = f"sqlite:///{abs_path}"
    # Normalize postgres url for sqlalchemy if needed
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {"connect_args": {"check_same_thread": False}} if SQLALCHEMY_DATABASE_URI.startswith("sqlite") else {}
    CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "https://ejbari.me,https://www.ejbari.me,http://localhost:3000").split(",") if o.strip()]
    UPLOAD_FOLDER = Path(os.getenv("UPLOAD_FOLDER", str(BASE_DIR / "instance" / "uploads")))
    MAX_CONTENT_LENGTH = int(os.getenv("MAX_UPLOAD_MB", "10")) * 1024 * 1024
