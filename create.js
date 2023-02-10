import React, { useState } from "react";
import { postService } from "../services/post.service";
import { useHistory } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postService.create({ title, body });
    history.push("/feed");
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h1>Create Post</h1>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePostPage;
