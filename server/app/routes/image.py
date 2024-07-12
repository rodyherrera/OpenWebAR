from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.db.connection import get_db_dependency
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.image_processing import compare_images, remove_background
from typing import List
from PIL import Image
from app.core.config import settings
from uuid import uuid4
from concurrent.futures import ProcessPoolExecutor
import os, io

router = APIRouter()
executor = ProcessPoolExecutor()

async def fetch_objects_samples_urls(db: AsyncIOMotorDatabase) -> List[str]:
    cursor = db.object.find({}, {'samples': 1, '_id': 0})
    samples_urls = []
    async for obj in cursor:
        samples_urls.extend(obj.get('samples', []))
    return samples_urls

@router.post('/')
async def compare_images_endpoint(
    file: UploadFile = File(...),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        print('here')
        filename = f'{uuid4()}.webp'
        file_path = os.path.join(settings.PUBLIC_DIR, filename)
        content = await file.read()
        with Image.open(io.BytesIO(content)) as img:
            img_without_bg = await remove_background(img)
            img_without_bg.save(file_path, 'WEBP')
            if not os.path.exists(file_path):
                raise HTTPException(status_code=500, detail='Error saving image')
        result = compare_images(file_path, await fetch_objects_samples_urls(db))
        print(result)
        return {
            'status': 'success',
            'data': {
                'most_similar_image': result['image_path'],
                'similarity_percentage': result['similarity_score']
            }
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f'Error processing image: {str(e)}')