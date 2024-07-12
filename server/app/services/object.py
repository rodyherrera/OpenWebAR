from uuid import uuid4
from typing import List
from PIL import Image, ExifTags
from fastapi import UploadFile
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.config import settings
from app.services.image_processing import remove_background
import os, io, asyncio

num_threads = os.cpu_count()

async def fetch_objects_samples_urls(db: AsyncIOMotorDatabase) -> List[str]:
    cursor = db.object.find({ }, { 'samples': 1, '_id': 0 })
    samples_urls = []
    async for obj in cursor:
        samples_urls.extend(obj.get('samples', []))
    return samples_urls

def correct_image_orientation(image: Image.Image) -> Image.Image:
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = image._getexif()
        if exif is not None:
            orientation_value = exif.get(orientation)
            if orientation_value == 3:
                image = image.rotate(180, exapand=True)
            elif orientation_value == 6:
                image = image.rotate(270, expand=True)
            elif orientation_value == 8:
                image = image.rotate(90, exapnd=True)
    except Exception as e:
        print('@correct_image_orientation: ' + e)
    return image           

async def process_image(file: UploadFile) -> bytes:
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    image = correct_image_orientation(image)
    image_without_bg = await remove_background(image)
    output = io.BytesIO()
    image_without_bg.save(output, format='WEBP', quality=85)
    return output.getvalue()

def save_image(contents: bytes) -> str:
    unique_filename = f'{uuid4()}.webp'
    file_path = os.path.join(settings.PUBLIC_DIR, unique_filename)
    with open(file_path, 'wb') as buffer:
        buffer.write(contents)
    return os.path.join(settings.PUBLIC_DIR, unique_filename)

async def process_file(file: UploadFile, object_samples: List[str]):
    try:
        image_contents = await process_image(file)
        relative_path = save_image(image_contents)
        object_samples.append(relative_path)
    except Exception as e:
        print('@process_file: ' + e)

async def save_files_and_update_object(object: dict, files: List[UploadFile]) -> List[str]:
    object_samples = object.get('samples', [])
    tasks = [asyncio.ensure_future(process_file(file, object_samples)) for file in files]
    await asyncio.gather(*tasks)
    return object