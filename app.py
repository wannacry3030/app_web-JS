from flask import Flask, request, jsonify, make_response, redirect
from pymongo import MongoClient
import bcrypt
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


client = MongoClient("mongodb://localhost:27017/")
db = client["web-app"]
posts_collection = db["postagens"]
users_collection = db["usuarios"]

#PARTE1, CRIAÇÃO DE POSTS (FUNCIONANDO)
@app.route("/postagens", methods=["POST"])
def criar_post():
    titulo = request.form["titulo"]
    conteudo = request.form["conteudo"]

    post = {"titulo": titulo, "conteudo": conteudo}
    posts_collection.insert_one(post)

    return jsonify({"message": "Post criado com sucesso!"})

#parte 2, criação de conta (FUNCIONANDO)

@app.route("/usuarios", methods=["POST"])
def criar_usuario():
    dados = request.get_json()
    email = dados["email"]
    senha = dados["password"].encode("utf-8")
    hash_senha = bcrypt.hashpw(senha, bcrypt.gensalt())
    
    usuario = {"email": email, "senha": hash_senha}
    users_collection.insert_one(usuario)

    return jsonify({"message": "Usuário criado com sucesso!"})

#PARTE 3, LOGIN (nok)

@app.route("/login", methods=["POST"])
def fazer_login():
    dados = request.get_json()
    email = dados["email"]
    senha = dados["password"].encode("utf-8")
    
    usuario = users_collection.find_one({"email": email})

    if usuario:
        if bcrypt.checkpw(senha, usuario["senha"]):
            return jsonify({"message": "Login realizado com sucesso!"})
        else:
            return jsonify({"message": "Senha incorreta. Tente novamente."})
    else:
        return jsonify({"message": "Usuário não encontrado."})

