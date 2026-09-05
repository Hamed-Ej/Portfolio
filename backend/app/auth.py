import functools
from datetime import datetime, timedelta, timezone
from flask import request, jsonify, current_app, g
import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher()

def hash_password(plain: str) -> str:
    return ph.hash(plain)

def verify_password(hash_: str, plain: str) -> bool:
    try:
        ph.verify(hash_, plain)
        return True
    except VerifyMismatchError:
        return False
    except Exception:
        return False

def create_token(username: str, secret: str, expires_hours=24*7):
    now = datetime.now(timezone.utc)
    payload = {"sub": username, "iat": now, "exp": now + timedelta(hours=expires_hours)}
    return jwt.encode(payload, secret, algorithm="HS256")

def verify_token(token: str, secret: str):
    try:
        data = jwt.decode(token, secret, algorithms=["HS256"])
        return data.get("sub")
    except Exception:
        return None

def ensure_admin_hash(app):
    # If ADMIN_PASSWORD provided and hash missing, generate hash and log
    cfg = app.config
    if not cfg.get("ADMIN_PASSWORD_HASH") and cfg.get("ADMIN_PASSWORD"):
        h = hash_password(cfg["ADMIN_PASSWORD"])
        app.logger.warning(f"Generated ADMIN_PASSWORD_HASH (set in env): {h}")
        cfg["ADMIN_PASSWORD_HASH"] = h
    # also support hashing on startup for .env convenience: if hash empty, create default admin/admin123? no — require env
    # create upload folder
    from pathlib import Path
    Path(app.config["UPLOAD_FOLDER"]).mkdir(parents=True, exist_ok=True)

def require_admin(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        token = request.cookies.get("access_token")
        if not token:
            auth = request.headers.get("Authorization", "")
            if auth.startswith("Bearer "):
                token = auth[7:]
        if not token:
            return jsonify({"error": "unauthorized"}), 401
        secret = current_app.config.get("JWT_SECRET") or current_app.config.get("SECRET_KEY")
        user = verify_token(token, secret)
        if not user:
            return jsonify({"error": "unauthorized"}), 401
        g.current_user = user
        # CSRF double-submit for state-changing
        if request.method in ("POST", "PUT", "DELETE", "PATCH"):
            csrf_cookie = request.cookies.get("csrf_token")
            csrf_header = request.headers.get("X-CSRF-Token") or request.headers.get("X-CSRF-TOKEN")
            # If csrf_cookie present, require header match
            if csrf_cookie and csrf_header != csrf_cookie:
                return jsonify({"error": "csrf mismatch"}), 403
        return fn(*args, **kwargs)
    return wrapper

def set_auth_cookies(resp, token: str):
    # csrf token is random hex
    import secrets
    csrf = secrets.token_hex(16)
    # Secure=False keeps local http dev working; nginx terminates TLS in prod
    # and the backend only sees internal http, so Secure cookies would never be set
    resp.set_cookie("access_token", token, httponly=True, secure=False, samesite="Lax", path="/", max_age=7*24*3600)
    resp.set_cookie("csrf_token", csrf, httponly=False, secure=False, samesite="Lax", path="/", max_age=7*24*3600)
    return resp

def clear_auth_cookies(resp):
    resp.set_cookie("access_token", "", max_age=0, path="/")
    resp.set_cookie("csrf_token", "", max_age=0, path="/")
    return resp
