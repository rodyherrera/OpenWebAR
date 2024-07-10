from mongoengine import connect
from app.core.config import settings

def init_db():
    connect(host=settings.DATABASE_URL)