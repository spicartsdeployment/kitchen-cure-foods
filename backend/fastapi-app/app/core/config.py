import os
from dotenv import load_dotenv
from datetime import timedelta
import secrets

load_dotenv()

class Settings:
    PROJECT_NAME: str = "FastAPI Async Boilerplate"
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "kitchen-cure-foods")

    # JWT Config
    SECRET_KEY: str = os.getenv("SECRET_KEY", secrets.token_urlsafe(32))
    # SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()
