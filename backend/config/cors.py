import os

# the CORS origins allowed to access the Flask app
CORS_ALLOWED_ORIGINS = [
  "file://*",
  "app://*"
]

if os.getenv("APP_ENV") == "development":
  frontend_app_url = os.getenv("FRONTEND_APP_URL")
  CORS_ALLOWED_ORIGINS.append(frontend_app_url)