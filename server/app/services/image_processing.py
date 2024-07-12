from concurrent.futures import ThreadPoolExecutor
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image
from rembg import remove
import concurrent.futures
import tensorflow as tf
import numpy as np
import asyncio, io, os

num_threads = os.cpu_count()
tf.config.threading.set_intra_op_parallelism_threads(num_threads)
tf.config.threading.set_inter_op_parallelism_threads(num_threads)
executor = ThreadPoolExecutor()

inception_v3 = tf.keras.applications.InceptionV3(include_top=False, pooling='avg', input_shape=(299, 299, 3))

def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB').resize((299, 299))
    image_np = np.array(image)
    return tf.keras.applications.inception_v3.preprocess_input(image_np)[tf.newaxis, ...]

def extract_features(image_path):
    image_tensor = preprocess_image(image_path)
    features = inception_v3(image_tensor)
    return features.numpy().flatten()

async def remove_background(image: Image.Image) -> Image.Image:
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    loop = asyncio.get_event_loop()
    output = await loop.run_in_executor(None, remove, img_byte_arr)
    return Image.open(io.BytesIO(output))

async def save_image_with_background_removed(content: bytes, file_path: str) -> None:
    loop = asyncio.get_event_loop()
    with Image.open(io.BytesIO(content)) as img:
        img_without_bg = await remove_background(img)
        img_without_bg.save(file_path, 'WEBP')

async def compare_images(query_images_path, database_paths):
    loop = asyncio.get_event_loop()
    query_features = await loop.run_in_executor(None, extract_features, query_images_path)
    database_features = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [loop.run_in_executor(executor, extract_features, path) for path in database_paths]
        for future in asyncio.as_completed(futures):
            database_features.append(await future)

    best_match_index = -1
    best_match_score = -float('inf')
    for i, db_features in enumerate(database_features):
        score = cosine_similarity([query_features], [db_features])[0][0]
        if score > best_match_score:
            best_match_score = score
            best_match_index = i

    similarity_percentage = round(best_match_score * 100, 4)
    return {
        'image_path': database_paths[best_match_index],
        'similarity_score': similarity_percentage
    }