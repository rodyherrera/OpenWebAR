import uvicorn, os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.routes import auth, image, object
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

os.makedirs(settings.PUBLIC_DIR, exist_ok=True)
app.mount('/public', StaticFiles(directory=settings.PUBLIC_DIR), name='public')

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api/v1/auth', tags=['auth'])
app.include_router(image.router, prefix='/api/v1/compare', tags=['image'])
app.include_router(object.router, prefix='/api/v1/object', tags=['object'])

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=5000)