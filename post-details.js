const postId = window.location.search.split("=")[1];
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const postAuthor = document.getElementById("post-author");
const editButton = document.getElementById("edit-button");

fetch(`https://api.app.com/posts/${postId}`)
  .then((response) => response.json())
  .then((post) => {
    postTitle.innerText = post.title;
    postBody.innerText = post.body;
    postAuthor.innerText = `Autor: ${post.author}`;
    editButton.addEventListener("click", () => {
      window.location.href = `/edit-post.html?id=${post.id}`;
    });
  });
