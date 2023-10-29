from flask import Flask, request, session, jsonify
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
from hume.models.config import FaceConfig
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/', methods=["GET", "POST"])
async def index():
    # import requests

    # url = "https://api.hume.ai/v0/batch/jobs"

    # files = { "file": ("flask_api\\WIN_20231028_11_07_20_Pro.mp4", open("flask_api\\WIN_20231028_11_07_20_Pro.mp4", "rb"), "video/mp4") }
    # payload = { "json": "{}" }
    # headers = {
    #     "accept": "application/json",
    #     "X-Hume-Api-Key": "jsmfWNtGidQg4kV9Y6AyP7kw0V5AzGp8vLxApbGbzDFawM7r"
    # }

    # response = requests.post(url, data=payload, files=files, headers=headers)

    # print(response.text)
    # # result = ""
    # # client = HumeStreamClient("jsmfWNtGidQg4kV9Y6AyP7kw0V5AzGp8vLxApbGbzDFawM7r")
    # # config = FaceConfig(identify_faces=True)
    # # async with client.connect([config]) as socket:
    # #     #result = await socket.send_file("flask_api\\WIN_20231028_11_07_20_Pro.mp4")
    # #     #result = await socket.send_file("flask_api\\WIN_20231028_13_32_11_Pro.jpg")
    # #     result = await socket.send_file("blob:http://localhost:3000/fa82b32d-6a8b-4ef6-8be7-56639235342d")
    # #     print(result)
    # return response.text
    content = request.get_json()
    try:
        print(content)
        return {"content" : content}
    except Exception as e:
        print(e)
        return {"connection": e}

@app.route("/face", methods=["GET", "POST"])
def face():

    blob = 

    url = "https://api.hume.ai/v0/batch/jobs"

    files = { "file": ("flask_api\\WIN_20231028_11_07_20_Pro.mp4", open("flask_api\\WIN_20231028_11_07_20_Pro.mp4", "rb"), "video/mp4") }
    payload = { "json": "{}" }
    headers = {
        "accept": "application/json",
        "X-Hume-Api-Key": "jsmfWNtGidQg4kV9Y6AyP7kw0V5AzGp8vLxApbGbzDFawM7r"
    }

    response = requests.post(url, data=payload, files=files, headers=headers)

    print(response)

    url = "https://api.hume.ai/v0/batch/jobs/34705d25-1a4a-407c-9d4b-54aa50e827bc/predictions"

    
    headers = {
        "accept": "application/json; charset=utf-8",
        "X-Hume-Api-Key": "jsmfWNtGidQg4kV9Y6AyP7kw0V5AzGp8vLxApbGbzDFawM7r"
    }

    response = requests.get(url, headers=headers)

    print(response.text)

    response_dict = json.loads(response.text)
    #print (type(response))
    
    try:
        return response_dict
    except Exception as e:
        print(e)
        return {"connection": e}

if __name__ == "__main__":
    app.run(debug=True)