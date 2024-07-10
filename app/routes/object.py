from uuid import uuid4
from fastapi import HTTPException, APIRouter, UploadFile, File, Depends, Form
from app.schemas.object import ObjectResponseSchema, ObjectSchema
from app.models.object import Object
from app.models.user import User
from app.services.auth import get_current_user
from app.core.config import settings
from typing import List
from mongoengine import Document
import os

router = APIRouter()

async def save_files_and_update_object(object: Document, files: List[UploadFile]) -> List[str]:
    added_samples = []
    for file in files:
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f'{uuid4()}{file_extension}'
        file_path = os.path.join(settings.PUBLIC_DIR, unique_filename)
        with open(file_path, 'wb') as buffer:
            buffer.write(await file.read())
        relative_path = os.path.join('/', settings.PUBLIC_DIR, unique_filename)
        object.samples.append(relative_path)
        added_samples.append(relative_path)
    object.save()
    return added_samples

@router.post('/', response_model=ObjectResponseSchema)
async def create_object(
    name: str = Form(...),
    description: str = Form(...),
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user)
):
    try:
        new_object = Object(name=name, description=description, user=current_user)
        await save_files_and_update_object(new_object, files)
        return {
            'status': 'success',
            'data': new_object
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/{_id}/samples', response_model=ObjectResponseSchema)
async def add_samples(
    _id: str, 
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user)
):
    object = Object.objects(_id=_id, user=current_user).first()
    if not object:
        raise HTTPException(status_code=404, detail="Object not found")
    await save_files_and_update_object(object, files)
    return {
        'status': 'success',
        'data': object
    }