from flask import Flask, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/posts_db"
mongo = PyMongo(app)

@app.route("/create-post", methods=["POST"])
def create_post():
    title = request.form.get("title")
    content = request.form.get("content")

    post_id = mongo.db.posts.insert({
        "title": title,
        "content": content
    })

    return {"id": str(post_id), "title": title, "content": content}

if __name__ == "__main__":
    app.run(debug=True)
