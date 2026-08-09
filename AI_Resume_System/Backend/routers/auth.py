from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

from ..database import get_user_by_email, save_user
from ..utils.auth_utils import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter()

class RegisterSchema(BaseModel):
    name: str = Field(..., min_length=2, example="Alex Morgan")
    email: EmailStr = Field(..., example="alex.morgan@example.com")
    password: str = Field(..., min_length=6, example="password123")

class LoginSchema(BaseModel):
    email: EmailStr = Field(..., example="alex.morgan@example.com")
    password: str = Field(..., example="password123")

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: RegisterSchema):
    existing_user = get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists"
        )
    
    hashed_pwd = hash_password(user_data.password)
    user_doc = {
        "name": user_data.name,
        "email": user_data.email.lower(),
        "password": hashed_pwd,
        "created_at": datetime.utcnow().isoformat()
    }
    
    saved_user = save_user(user_doc)
    user_id = str(saved_user.get("_id", saved_user.get("id")))
    
    token = create_access_token({"sub": user_id, "email": saved_user["email"], "name": saved_user["name"]})
    
    return {
        "message": "User registered successfully",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": saved_user["name"],
            "email": saved_user["email"]
        }
    }

@router.post("/login")
async def login(credentials: LoginSchema):
    user = get_user_by_email(credentials.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    user_id = str(user.get("_id", user.get("id")))
    token = create_access_token({"sub": user_id, "email": user["email"], "name": user["name"]})
    
    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"]
        }
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    user = get_user_by_email(current_user["email"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user_id = str(user.get("_id", user.get("id")))
    return {
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"]
        }
    }
