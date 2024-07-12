from app.services.image_processing import compare_images, save_image_with_background_removed
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.services.object import fetch_objects_samples_urls
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.connection import get_db_dependency
from app.core.config import settings
from uuid import uuid4
import os

router = APIRouter()

@router.post('/')
async def compare_images_endpoint(
    file: UploadFile = File(...),
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    try:
        print('@compare_images_endpoint: INIT')
        content = await file.read()
        filename = f'{uuid4()}.webp'
        file_path = os.path.join(settings.PUBLIC_DIR, filename)
        print('@compare_images_endpoint: TO REMOVE BG')
        await save_image_with_background_removed(content, file_path)
        print('@compare_images_endpoint: BG REMOVED')
        if not os.path.exists(file_path):
            raise HTTPException(status_code=500, detail='Error saving image')
        samples_urls = await fetch_objects_samples_urls(db)
        print('@compare_images_endpoint: TO COMPARE IMGS')
        result = await compare_images(file_path, samples_urls)
        print('@compare_images_endpoint: OK ' + str(result))
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