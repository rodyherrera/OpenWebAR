from app.schemas.auth import TokenData, AuthResponseModel
from datetime import datetime, timezone, timedelta
from concurrent.futures import ThreadPoolExecutor
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from app.schemas.user import UserModel
from app.core.config import settings
from app.db.connection import get_db
from jose import JWTError, jwt
import asyncio

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')
executor = ThreadPoolExecutor()

def verify_password_sync(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token_sync(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({ 'exp': expire })
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def verify_password(plain_password, hashed_password):
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(executor, verify_password_sync, plain_password, hashed_password)

async def create_access_token(data: dict):
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(executor, create_access_token_sync, data)

async def get_user(username: str):
    db = await get_db()
    user = await db.user.find_one({ 'username': username })
    return user if user else None

async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if user and await verify_password(password, user['hashed_password']):
        return user
    return None

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get('sub')
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def create_user_response(username: str, email: str) -> AuthResponseModel:
    access_token = await create_access_token(data={ 'sub': username })
    user_model = UserModel(username=username, email=email)
    return AuthResponseModel(
        status='success',
        data={
            'token': access_token,
            'user': user_model
        }
    )