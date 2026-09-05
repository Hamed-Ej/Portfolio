try:
    from app import create_app  # when run as `python main.py` inside backend/ or via gunicorn (WORKDIR /app)
except ModuleNotFoundError:
    from backend.app import create_app  # when run as `python -m flask --app backend.main` from repo root

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)

