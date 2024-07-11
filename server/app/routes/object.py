from fastapi import HTTPException, APIRouter, UploadFile, File, Depends, Form
from app.schemas.object import ObjectResponseSchema, ObjectListResponseSchema
from app.services.object import save_files_and_update_object
from app.models.user import User
from app.db.connection import get_db_dependency
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.auth import get_current_user
from typing import List
from bson import ObjectId

router = APIRouter()

async def insert_object(db: AsyncIOMotorDatabase, new_object: dict) -> dict:
    result = await db.object.insert_one(new_object)
    new_object['_id'] = str(result.inserted_id)
    return new_object

async def fetch_objects(db: AsyncIOMotorDatabase, user_id: str) -> List[dict]:
    cursor = db.object.find({ 'user': user_id })
    objects = []
    async for obj in cursor:
        obj['_id'] = str(obj['_id'])
        objects.append(obj)
    return objects

async def delete_object_from_db(db: AsyncIOMotorDatabase, object_id: str, user_id: str) -> bool:
    result = await db.object.delete_one({ '_id': ObjectId(object_id), 'user': user_id })
    return result.deleted_count > 0

@router.post('/', response_model=ObjectResponseSchema)
async def create_object(
    name: str = Form(...),
    description: str = Form(...),
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        new_object = {
            'name': name,
            'description': description,
            'user': current_user['_id'],
            'samples': []
        }
        new_object = await save_files_and_update_object(new_object, files)
        new_object = await insert_object(db, new_object)
        return {
            'status': 'success',
            'data': new_object
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/me/', response_model=ObjectListResponseSchema)
async def get_all_objects(
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        objects = await fetch_objects(db, current_user['_id'])
        return {
            'status': 'success',
            'data': objects
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete('/me/{object_id}', response_model=ObjectListResponseSchema)
async def delete_object(
    object_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        if not await delete_object_from_db(db, object_id, current_user['_id']):
            raise HTTPException(status_code=404, detail='Object not found')
        objects = await fetch_objects(db, current_user['_id'])
        return {
            'status': 'success',
            'data': objects
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))