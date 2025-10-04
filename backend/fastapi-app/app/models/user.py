from pydantic import BaseModel, EmailStr
from typing import Optional

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    
class UserCreate(BaseModel):
    userName: str
    email: EmailStr
    password: str
    role: str = "user"  # default role
    dob: str
    phone: str
    gender: str

class UserUpdate(BaseModel):
    userName: str
    phone: str
    gender: str
    address: str
    state: str
    city: str
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    userName: str
    email: EmailStr
    role: str

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    dob: str  # YYYY-MM-DD
    new_password: str

class Subscribe(BaseModel):
    email: EmailStr