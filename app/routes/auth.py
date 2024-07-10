from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.auth import AuthResponseModel, LoginModel
from app.schemas.user import UserCreateModel, UserModel
from app.services.auth import authenticate_user, create_access_token, get_password_hash, get_current_user
from app.models.user import User

router = APIRouter()

@router.post('/sign-up/', response_model=AuthResponseModel)
async def signup(user: UserCreateModel):
    user_obj = User(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password)
    )
    user_obj.save()
    access_token = create_access_token(data={'sub': user.username})
    user_model = UserModel(username=user_obj.username, email=user_obj.email)
    return {
        'status': 'success',
        'data': {
            'token': access_token,
            'user': user_model
        }
    }

@router.post('/sign-in/', response_model=AuthResponseModel)
async def signin(login: LoginModel):
    user = await authenticate_user(login.username, login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={'sub': user.username})
    user_model = UserModel(username=user.username, email=user.email)
    return {
        'status': 'success',
        'data': {
            'token': access_token,
            'user': user_model
        }
    }

@router.get('/me/', response_model=UserModel)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user