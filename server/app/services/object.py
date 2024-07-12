from uuid import uuid4
from app.core.config import settings
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.image_processing import remove_background
from typing import List
from PIL import Image, ExifTags
from fastapi import UploadFile
import os, io

async def fetch_objects_samples_urls(db: AsyncIOMotorDatabase) -> List[str]:
    cursor = db.object.find({ }, { 'samples': 1, '_id': 0 })
    samples_urls = []
    async for obj in cursor:
        samples_urls.extend(obj.get('samples', []))
    return samples_urls


async def save_files_and_update_object(object: dict, files: List[UploadFile]) -> List[str]:
    for file in files:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        try:
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            exif = image._getexif()
            if exif is not None:
                orientation_value = exif.get(orientation)
                if orientation_value is None: 
                    break
                elif orientation_value == 3:
                    image = image.rotate(180, expand=True)
                elif orientation_value == 6:
                    image = image.rotate(270, expand=True)
                elif orientation_value == 8:
                    image = image.rotate(90, expand=True)
        except Exception as e:
            print(f"No se pudo corregir la orientación: {e}")
        image_without_bg = await remove_background(image)
        output = io.BytesIO()
        image_without_bg.save(output, format='WEBP', quality=85)
        contents = output.getvalue()
        unique_filename = f'{uuid4()}.webp'
        file_path = os.path.join(settings.PUBLIC_DIR, unique_filename)
        with open(file_path, 'wb') as buffer:
            buffer.write(contents)
        relative_path = os.path.join(settings.PUBLIC_DIR, unique_filename)
        object['samples'].append(relative_path)
    return object