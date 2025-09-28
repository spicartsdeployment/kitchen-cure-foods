from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import settings
from app.models.user import UserResponse
from app.core.logger import logger
from app.services.auth import decode_access_token
from app.db.mongo import db
from bson import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Extract and validate the current user from JWT token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        print('get_current_user called.')
        print('token-',token)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
        print('payload = jwt.decode')
        user_id: str = payload.get("sub") 
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise credentials_exception

    # Convert ObjectId to string for easier use
    user["_id"] = str(user["_id"])
    return user