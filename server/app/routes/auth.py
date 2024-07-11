from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.auth import AuthResponseModel, LoginModel
from app.schemas.user import UserCreateModel, UserModel
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.connection import get_db_dependency
from app.models.user import User
from app.services.auth import (
    authenticate_user, 
    get_password_hash, 
    get_current_user, 
    create_user_response
)

router = APIRouter()

@router.post('/sign-up/', response_model=AuthResponseModel)
async def signup(user: UserCreateModel, db: AsyncIOMotorDatabase = Depends(get_db_dependency)):
    existing_user = await db.user.find_one({ 'username': user.username })
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Username already registered'
        )
    user_dict = user.dict()
    user_dict['hashed_password'] = get_password_hash(user.password)
    del user_dict['password']
    await db.user.insert_one(user_dict)
    return await create_user_response(user.username, user.email)

@router.post('/sign-in/', response_model=AuthResponseModel)
async def signin(login: LoginModel):
    user = await authenticate_user(login.username, login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={ 'WWW-Authenticate': 'Bearer' }
        )
    return await create_user_response(user['username'], user['email'])

@router.get('/me/', response_model=UserModel)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return UserModel(**current_user)