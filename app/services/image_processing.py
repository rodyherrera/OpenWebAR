import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import cv2
from PIL import Image
import concurrent.futures

def load_model():
    return hub.load('https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/5')

def preprocess_image(image_path):
    image = Image.open(image_path).resize((224, 224))
    image_np = np.array(image)
    return tf.image.convert_image_dtype(image_np, tf.float32)[tf.newaxis, ...]

def extract_local_features(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    orb = cv2.ORB_create()
    _, descriptors = orb.detectAndCompute(image, None)
    return descriptors

def preprocess_and_extract(image_path):
    return preprocess_image(image_path), extract_local_features(image_path)

def compare_images(query_image_path, database_paths, model):
    query_image, query_descriptors = preprocess_and_extract(query_image_path)
    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = list(executor.map(preprocess_and_extract, database_paths))
    best_match_index = -1
    best_match_score = -float('inf')
    for i, (_, db_descriptors) in enumerate(results):
        if db_descriptors is None:
            continue
        score = calculate_similarity(query_descriptors, db_descriptors)
        if score > best_match_score:
            best_match_score = score
            best_match_index = i
    return {
        "image_path": database_paths[best_match_index],
        "similarity_score": best_match_score
    }

def calculate_similarity(query_descriptors, db_descriptors):
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(query_descriptors, db_descriptors)
    matches = sorted(matches, key=lambda x: x.distance)
    if not matches:
        return 0
    avg_distance = sum(match.distance for match in matches) / len(matches)
    similarity_percentage = (1 - avg_distance / 256) * 100
    return similarity_percentage