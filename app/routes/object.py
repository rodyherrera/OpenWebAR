from fastapi import HTTPException, APIRouter, UploadFile, File, Depends, Form
from app.schemas.object import ObjectResponseSchema, ObjectListResponseSchema
from app.services.object import save_files_and_update_object
from app.models.object import Object
from app.models.user import User
from app.db.connection import get_db_dependency
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.auth import get_current_user
from typing import List
from bson import ObjectId

router = APIRouter()

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
        result = await db.object.insert_one(new_object)
        new_object['_id'] = str(result.inserted_id)
        return {
            'status': 'success',
            'data': new_object
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/me/', response_model=ObjectListResponseSchema)
async def get_all_objects(
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        cursor = db.object.find({ 'user': current_user['_id'] })
        objects = []
        async for obj in cursor:
            obj['_id'] = str(obj['_id'])
            objects.append(obj)
        return {
            'status': 'success',
            'data': objects
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@router.delete('/me/{object_id}', response_model=ObjectListResponseSchema)
async def delete_object(
    object_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        result = await db.object.delete_one({ '_id': ObjectId(object_id), 'user': current_user['_id'] })
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail='Object not found')
        cursor = db.object.find({ 'user': current_user['_id'] })
        objects = []
        async for obj in cursor:
            obj['_id'] = str(obj['_id'])
            objects.append(obj)
        return {
            'status': 'success',
            'data': objects
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))