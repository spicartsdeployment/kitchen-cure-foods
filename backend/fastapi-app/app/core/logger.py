# app/core/logger.py
import logging
from logging.handlers import RotatingFileHandler
import os

# Ensure logs directory exists
LOG_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, "app.log")

# Logger configuration
logger = logging.getLogger("app_logger")
logger.setLevel(logging.INFO)

# Console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# File handler (rotates at 5MB, keeps 5 backups)
file_handler = RotatingFileHandler(LOG_FILE, maxBytes=5*1024*1024, backupCount=5)
file_handler.setLevel(logging.INFO)

# Formatter
formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s"
)
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# Add handlers (avoid duplicates)
if not logger.hasHandlers():
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
