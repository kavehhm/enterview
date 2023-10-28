from flask import Flask, request, session, jsonify
from hume import HumeStreamClient
from hume.models.config import LanguageConfig
from hume.models.config import FaceConfig
import requests

app = Flask(__name__)

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
    content = request.get_json()

    url = "https://api.hume.ai/v0/batch/jobs"

    files = { "file": ("flask_api\\WIN_20231028_11_07_20_Pro.mp4", open("flask_api\\WIN_20231028_11_07_20_Pro.mp4", "rb"), "video/mp4") }
    payload = { "json": "{}" }
    headers = {
        "accept": "application/json",
        "X-Hume-Api-Key": "jsmfWNtGidQg4kV9Y6AyP7kw0V5AzGp8vLxApbGbzDFawM7r"
    }

    response = requests.post(url, data=payload, files=files, headers=headers)

    import requests

    url = "https://api.hume.ai/v0/batch/jobs/id/predictions"

    headers = {"accept": "application/json; charset=utf-8"}

    response = requests.get(url, headers=headers)

    print(response.text)

    print(response.text)
    try:
        print(content)
        return {"content" : content}
    except Exception as e:
        print(e)
        return {"connection": e}

if __name__ == "__main__":
    app.run(debug=True)