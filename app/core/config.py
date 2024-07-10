from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = ""
    ALGORITHM: str = 'HS256'
    PUBLIC_DIR: str = 'public'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL: str = ''
    ALLOWED_ORIGINS: list = ['http://172.20.10.2:5173']

settings = Settings()