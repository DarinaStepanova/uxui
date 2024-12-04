from flask import Flask, request, jsonify
import requests
import json
import os
import base64
from flask_cors import CORS # импорт CORS
import time

app = Flask(__name__)
CORS(app) # Включение CORS

API_KEY = '1CF54123D4AA7B222CC23E0256EB9D70'
API_SECRET = 'C74978E6CF365952B5D7605E02FB2B5B'
API_URL = "https://api-key.fusionbrain.ai/"

class Text2ImageAPI:
    def __init__(self, url, api_key, api_secret):
        self.url = url
        self.headers = {
            'X-Key': f'Key {api_key}',
            'X-Secret': f'Secret {api_secret}',
        }

    def get_model(self):
        try:
            response = requests.get(f"{self.url}key/api/v1/models", headers=self.headers)
            response.raise_for_status()
            data = response.json()
            return data[0]['id']
        except requests.exceptions.RequestException as e:
            print(f"Ошибка при получении модели: {e}, Status code: {e.response.status_code}") #Выводим код статуса
            print(f"Response text: {e.response.text}") #Выводим текст ошибки
            return None
        except (requests.exceptions.RequestException, IndexError, KeyError) as e:
            print(f"Ошибка при получении модели: {e}")
            return None


    def generate(self, prompt, model_id):
        params = {
            "type": "GENERATE",
            "numImages": 1,
            "width": 712,
            "height": 512,
            "generateParams": {"query": prompt},
        }

        files = {
            'model_id': (None, model_id),
            'params': (None, json.dumps(params), 'application/json'),
        }

        try:
            response = requests.post(f"{self.url}key/api/v1/text2image/run", headers=self.headers, files=files)
            response.raise_for_status()
            data = response.json()
            return data['uuid']
        except requests.exceptions.RequestException as e:
            print(f"Ошибка генерации: {e}")
            return None


    def check_generation(self, request_id, max_attempts=30, delay=5):
        attempts = 0
        start_time = time.time()
        while attempts < max_attempts:
            response = requests.get(f"{self.url}key/api/v1/text2image/status/{request_id}", headers=self.headers)
            response.raise_for_status()
            data = response.json()
            print(f"Attempt {attempts + 1}/{max_attempts}: Check generation response: {data}")

            if data['status'] == 'DONE':
                if 'images' in data and len(data['images']) > 0:
                    image_data = data['images'][0]
                    # Проверка на наличие base64 данных
                    if image_data.startswith('/9j/'): #Проверяем на наличие Base64 данных в начале строки
                        print("Image data is already base64 encoded")
                        return image_data
                    else:
                       print("Image data is not base64 encoded - unexpected format")
                       return None
                else:
                    print("Images array is empty or missing in response")
                    return None
            elif data['status'] == 'FAILED':
                print(f"Image generation FAILED: {data.get('error', 'No error details provided')}")
                return None
            else:
                time.sleep(delay)
                attempts += 1

        end_time = time.time()
        print(f"Image generation timed out after {end_time - start_time:.2f} seconds and {max_attempts} attempts")
        return None

@app.route('/generate', methods=['POST'])
def generate_image():
    try:
        prompt = request.json.get('prompt')
        if not prompt:
            return jsonify({"error": "Ошибка: введите описание"}), 400

        api = Text2ImageAPI(API_URL, API_KEY, API_SECRET)
        print(f"API_KEY: {API_KEY}")
        print(f"API_SECRET: {API_SECRET}")
        model_id = api.get_model()
        if model_id is None:
            return jsonify({"error": "Error getting model ID"}), 500

        uuid = api.generate(prompt, model_id)
        if uuid is None:
            return jsonify({"error": "Error generating image"}), 500

        image_data = api.check_generation(uuid)

        if image_data:
            return jsonify({"image_base64": image_data})
        else:
            return jsonify({"error": "Image generation failed"}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {e}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')