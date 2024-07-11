from fastapi import APIRouter, UploadFile, File, Depends
from app.db.connection import get_db_dependency
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.image_processing import compare_images, load_model
from typing import List
from PIL import Image

router = APIRouter()

model = load_model()

async def fetch_objects_samples_urls(db: AsyncIOMotorDatabase) -> List[str]:
    cursor = db.object.find({ }, { 'samples': 1, '_id': 0 })
    samples_urls = []
    async for obj in cursor:
        samples_urls.extend(obj.get('samples', []))
    return samples_urls

@router.post('/')
async def compare_images_endpoint(
    file: UploadFile = File(...), 
    db: AsyncIOMotorDatabase = Depends(get_db_dependency)
):
    query_image = Image.open(file.file)
    samples = fetch_objects_samples_urls(db)
    result = compare_images(query_image, samples, model)
    return {
        'status': 'success',
        'data': {
            'most_similar_image': result['image_path'],
            'similarity_percentage': result['similarity_score']
        }
    }