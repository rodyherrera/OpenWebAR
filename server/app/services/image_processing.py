import numpy as np
from PIL import Image
import tensorflow as tf
from rembg import remove
from sklearn.metrics.pairwise import cosine_similarity
import concurrent.futures, io

inception_v3 = tf.keras.applications.InceptionV3(include_top=False, pooling='avg', input_shape=(299, 299, 3))

def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB').resize((299, 299))
    image_np = np.array(image)
    return tf.keras.applications.inception_v3.preprocess_input(image_np)[tf.newaxis, ...]

def extract_features(image_path):
    image_tensor = preprocess_image(image_path)
    features = inception_v3(image_tensor)
    return features.numpy().flatten()

def compare_images(query_image_path, database_paths):
    query_features = extract_features(query_image_path)
    with concurrent.futures.ThreadPoolExecutor() as executor:
        database_features = list(executor.map(extract_features, database_paths))
    best_match_index = -1
    best_match_score = -float('inf')
    for i, db_features in enumerate(database_features):
        score = cosine_similarity([ query_features ], [ db_features ])[0][0]
        if score > best_match_score:
            best_match_score = score
            best_match_index = i
    similarity_percentage = round(best_match_score * 100, 4)
    return {
        'image_path': database_paths[best_match_index],
        'similarity_score': similarity_percentage
    }

async def remove_background(image: Image.Image) -> Image.Image:
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    output = remove(img_byte_arr)
    return Image.open(io.BytesIO(output))