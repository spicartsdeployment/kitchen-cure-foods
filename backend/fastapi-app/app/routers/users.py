from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from app.models.user import UserCreate, UserLogin, UserResponse, ResetPasswordRequest, Subscribe
from app.services.auth import hash_password, verify_password, create_access_token
from app.core.config import settings
from datetime import timedelta
from bson import ObjectId
from app.core.logger import logger
from app.core.dependencies import get_current_user
from fastapi import APIRouter, Depends
from app.models.user import UserUpdate
from app.core.logger import logger
from app.db.mongo import db

router = APIRouter(prefix="/users", tags=["Users"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

@router.get("/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return {"user": current_user}

@router.post("/create", response_model=UserResponse)
async def create_user(user: UserCreate):
    logger.info("create_user API called")
    
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists!!")
    
    hashed_pwd = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pwd
    result = await db.users.insert_one(user_dict)

    return UserResponse(
        id=str(result.inserted_id),
        userName=user.userName,
        email=user.email,
        role=user.role
    )

@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": str(db_user["_id"]), 
            "role":str(db_user["role"]),
            "name": str(db_user["userName"]),
            "email": str(db_user["email"]),
            },
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.put("/update/{user_id}")
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_user),
):
    """
    Edit user details.
    - A user can edit their own profile.
    - Admin roles can edit any user.
    """

    print('user_update - ',user_update)

    # Convert user_id string → ObjectId
    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    # Fetch existing user
    db_user = await db.users.find_one({"_id": oid})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Authorization: Only SuperAdmin/SystemAdmin can edit others
    if str(db_user["_id"]) != str(current_user["_id"]) and current_user["role"] not in ["SuperAdmin", "SystemAdmin"]:
        raise HTTPException(status_code=403, detail="Not allowed to edit this user")

    update_data = user_update.dict(exclude_unset=True)

    # Hash new password if provided
    if "password" in update_data and update_data["password"]:
        update_data["password"] = hash_password(update_data.pop("password"))

    # Role change allowed only for admins
    if "role" in update_data and current_user["role"] not in ["SuperAdmin", "SystemAdmin"]:
        update_data.pop("role")

    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update")

    # Update in DB
    await db.users.update_one({"_id": oid}, {"$set": update_data})

    # Fetch updated user
    updated_user = await db.users.find_one({"_id": oid})
    updated_user["_id"] = str(updated_user["_id"])

    return {"msg": "User updated successfully", "user": updated_user}

@router.delete("/delete/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """
    Delete a user.
    - A user can delete their own account.
    - SuperAdmin/SystemAdmin can delete any user.
    """

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    # Find target user
    db_user = await db.users.find_one({"_id": oid})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Authorization check
    if str(db_user["_id"]) != str(current_user["_id"]) and current_user["role"] not in ["SuperAdmin", "SystemAdmin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete this user")

    # Delete
    await db.users.delete_one({"_id": oid})

    return {"msg": "User deleted successfully", "deleted_user_id": str(db_user["_id"]), "deleted_user_name": str(db_user["userName"])}

@router.post("/reset-password")
async def reset_password(payload: ResetPasswordRequest):
    print('reset called')
    user = await db.users.find_one({"email": payload.email, "dob": payload.dob})
    if not user:
        return {"error": "Email/DOB mismatch"}
    
    if user["dob"] != payload.dob:
        raise HTTPException(status_code=400, detail="Email and DOB do not match")
    
    await db.users.update_one(
        {"email": payload.email},
        {"$set": {"password": payload.new_password}}
    )
    return {"msg": "Password reset successful"}



@router.post("/subscribe/{email}")
async def subscribe(email: str):
    logger.info("subscribe API called")
    
    existing = await db.emailsubscriptions.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists!!")
    
    await db.emailsubscriptions.insert_one({"email": email})

    return {"msg": "subscribed successfully!!"}
