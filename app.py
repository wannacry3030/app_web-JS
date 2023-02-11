from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["web-app"]
posts_collection = db["postagens"]

@app.route("/postagens", methods=["POST"])
def criar_post():
    titulo = request.form["titulo"]
    conteudo = request.form["conteudo"]

    post = {"titulo": titulo, "conteudo": conteudo}
    posts_collection.insert_one(post)

    return jsonify({"message": "Post criado com sucesso!"})
