import uvicorn
from fastapi import FastAPI
from app.core.config import settings
from app.routes import auth, image
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api/v1/auth', tags=['auth'])
app.include_router(image.router, prefix='/api/v1/compare', tags=['image'])

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)