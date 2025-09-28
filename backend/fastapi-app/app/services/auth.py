from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from functools import wraps
from app.core.config import settings
# from app.routers.users import get_current_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        return payload
    except JWTError:
        return None

# # Decorator for role-based access
# def role_required(*roles: str):
#     def wrapper(endpoint_func):
#         @wraps(endpoint_func)
#         async def inner(*args, current_user=Depends(get_current_user), **kwargs):
#             if current_user["role"] not in roles:
#                 raise HTTPException(status_code=403, detail="Permission denied")
#             return await endpoint_func(*args, current_user=current_user, **kwargs)
#         return inner
#     return wrapper

