from flask import Flask, request, jsonify
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["web-app"]
posts_collection = db["postagens"]
users_collection = db["usuarios"]

@app.route("/postagens", methods=["POST"])
def criar_post():
    titulo = request.form["titulo"]
    conteudo = request.form["conteudo"]

    post = {"titulo": titulo, "conteudo": conteudo}
    posts_collection.insert_one(post)

    return jsonify({"message": "Post criado com sucesso!"})

#parte 2, login e criação de conta

@app.route("/usuarios", methods=["POST"])
def criar_usuario():
    print(request.form)
    email = request.form["email"]
    senha = request.form["senha"].encode("utf-8")
    hash_senha = bcrypt.hashpw(senha, bcrypt.gensalt())
    
    usuario = {"email": email, "senha": hash_senha}
    users_collection.insert_one(usuario)

    return jsonify({"message": "Usuário criado com sucesso!"})

@app.route("/login", methods=["POST"])
def fazer_login():
    email = request.form["email"]
    senha = request.form["senha"].encode("utf-8")
    
    usuario = users_collection.find_one({"email": email})

    if usuario:
        if bcrypt.checkpw(senha, usuario["senha"]):
            return jsonify({"message": "Login efetuado com sucesso!"})
        else:
            return jsonify({"message": "Senha incorreta. Tente novamente."})
    else:
        return jsonify({"message": "Usuário não encontrado."})