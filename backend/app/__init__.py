from flask import Flask, jsonify
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def index():
        return jsonify({'status': 'online', 'message': 'Hamed Ejbari Portfolio Backend API'})

    from .routes.data import data_bp
    app.register_blueprint(data_bp, url_prefix='/api')

    return app

