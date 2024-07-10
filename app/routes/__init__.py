from fastapi import APIRouter

router = APIRouter()

from .auth import router as auth_router
from .image import router as image_router
from .object import router as object_router

router.include_router(auth_router, prefix="/auth", tags=['auth'])
router.include_router(image_router, prefix="/compare", tags=['image'])
router.include_router(object_router, prefix='/object', tags=['object'])