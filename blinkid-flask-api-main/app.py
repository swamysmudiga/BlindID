import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition

app = Flask(__name__)
CORS(app)


def download_and_save_image(url, filename):
    response = requests.get(url)
    with open(filename, 'wb') as f:
        f.write(response.content)


@app.route('/')
def index():
    return "Face Recognition API"


@app.route('/validate', methods=['POST', 'GET'])
def validate_image():
    if request.method == 'GET':
        return jsonify({"status": "error", "message": "POST method is required."}), 400
    else:
        data = request.json

        # Extracting image URLs and the validation URL
        image_urls = data.get('image_urls', [])
        validation_url = data.get('validation_url', None)

        # If validation URL is not provided, return an error
        if not validation_url:
            return jsonify({"status": "error", "message": "Validation URL is required."}), 400

        # Download and save the validation image
        validation_image_path = "validation_image.jpg"
        download_and_save_image(validation_url, validation_image_path)

        # Load the validation image
        validation_image = face_recognition.load_image_file(validation_image_path)
        try:
            validation_face_encoding = face_recognition.face_encodings(validation_image)[0]
        except IndexError:
            return jsonify({"status": "error", "message": "No face found in the validation image."}), 400
        # Results dictionary to store the results for each image URL
        results = {}
        final_result = []

        # Loop through each image URL, download, and process
        for index, image_url in enumerate(image_urls):
            image_path = f"image_{index}.jpg"
            download_and_save_image(image_url, image_path)

            # Load the image
            image = face_recognition.load_image_file(image_path)
            try:
                image_face_encoding = face_recognition.face_encodings(image)[0]
            except IndexError:
                return jsonify({"status": "error", "message": f"No face found in the image at index {index}."}), 400
            # Compare face encodings
            result = face_recognition.compare_faces([validation_face_encoding], image_face_encoding)

            # Prepare the final result

            # Determine if it's a match or not
            final_result.append({
                "image_url": image_url,
                "result": int(result[0])
            })

            # Clean up: Delete the downloaded image
            os.remove(image_path)

        # Clean up: Delete the validation image
        os.remove(validation_image_path)

        return jsonify(final_result)


if __name__ == '__main__':
    app.run()
