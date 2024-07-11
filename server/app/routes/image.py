from fastapi import APIRouter, UploadFile, File
from PIL import Image
from app.services.image_processing import compare_images, load_model

router = APIRouter()

model = load_model()
database_paths = [
    '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '7.jpeg', '8.jpeg', '9.jpeg',
    '10.jpeg', '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg',
    '16.jpeg', '17.jpeg', '18.jpeg'
]

@router.post('/')
async def compare_images_endpoint(file: UploadFile = File(...)):
    query_image = Image.open(file.file)
    result = compare_images(query_image, database_paths, model)
    return {
        'status': 'success',
        'data': {
            'most_similar_image': result['image_path'],
            'similarity_percentage': result['similarity_score']
        }
    }