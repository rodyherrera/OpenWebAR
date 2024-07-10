from pydantic import BaseModel
from typing import Optional

class TokenData(BaseModel):
    username: Optional[str] = None

class LoginModel(BaseModel):
    username: str
    password: str

class AuthResponseModel(BaseModel):
    status: str
    data: dict = {
        'token': str,
        'user': 'UserModel'
    }