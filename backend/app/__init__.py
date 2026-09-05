from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # instance folder for sqlite
    import pathlib
    pathlib.Path(app.instance_path).mkdir(parents=True, exist_ok=True)

    origins = app.config.get("CORS_ORIGINS", [])
    CORS(app, origins=origins, supports_credentials=True)

    db.init_app(app)
    migrate.init_app(app, db)

    limiter = Limiter(get_remote_address, app=app, default_limits=[], storage_uri="memory://")

    # ensure upload folder and admin hash
    from .auth import ensure_admin_hash
    ensure_admin_hash(app)

    @app.route('/')
    def index():
        return jsonify({'status': 'online', 'message': 'Hamed Ejbari Portfolio Backend API'})

    @app.route('/healthz')
    def healthz():
        return jsonify({'status': 'ok'})

    @app.route('/uploads/<path:filename>')
    def uploads(filename):
        from pathlib import Path
        folder = Path(app.config["UPLOAD_FOLDER"])
        return send_from_directory(str(folder), filename)

    from .routes.data import data_bp
    app.register_blueprint(data_bp, url_prefix='/api')

    from .routes.blog import blog_bp
    app.register_blueprint(blog_bp, url_prefix='/api')

    from .routes.admin import admin_bp
    # rate limit login
    admin_bp_login = admin_bp
    # apply limiter to login route separately via decorator? do globally:
    # wrap login function
    original_login = None
    for rule in list(app.url_map.iter_rules()):
        pass
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # rate limit login endpoint
    limiter.limit("5/minute")(app.view_functions['admin_bp.login'])

    @app.errorhandler(413)
    def too_large(e):
        return jsonify({"error": "file too large"}), 413

    # create tables if not exists (for sqlite simple; migrations preferred for prod)
    with app.app_context():
        try:
            db.create_all()
            # add lang column if missing (for existing DBs)
            if app.config["SQLALCHEMY_DATABASE_URI"].startswith("sqlite"):
                from sqlalchemy import text, inspect
                try:
                    cols = [c["name"] for c in inspect(db.engine).get_columns("posts")]
                    if "lang" not in cols:
                        db.session.execute(text("ALTER TABLE posts ADD COLUMN lang VARCHAR(5) DEFAULT 'en'"))
                        db.session.execute(text("UPDATE posts SET lang='en' WHERE lang IS NULL"))
                        db.session.commit()
                except Exception as ie:
                    app.logger.warning(f"lang column migration: {ie}")
            # enable WAL for sqlite
            if app.config["SQLALCHEMY_DATABASE_URI"].startswith("sqlite"):
                from sqlalchemy import text
                db.session.execute(text("PRAGMA journal_mode=WAL;"))
                db.session.execute(text("PRAGMA synchronous=NORMAL;"))
                db.session.commit()
        except Exception as e:
            app.logger.warning(f"DB init warning: {e}")

    return app

