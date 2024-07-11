from uuid import uuid4
from app.core.config import settings
from typing import List
from fastapi import UploadFile
import os

async def save_files_and_update_object(object: dict, files: List[UploadFile]) -> List[str]:
    for file in files:
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f'{uuid4()}{file_extension}'
        file_path = os.path.join(settings.PUBLIC_DIR, unique_filename)
        with open(file_path, 'wb') as buffer:
            buffer.write(await file.read())
        relative_path = os.path.join('/', settings.PUBLIC_DIR, unique_filename)
        object['samples'].append(relative_path)
    return object