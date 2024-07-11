from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    if db.client is None:
        db.client = AsyncIOMotorClient(settings.DATABASE_URL)
    return db.client

async def get_db():
    client = await get_database()
    return client.get_default_database()

async def get_db_dependency():
    db = await get_db()
    try:
        yield db
    finally:
        pass