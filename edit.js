import React, { useState, useEffect } from "react";
import { postService } from "../services/post.service";
import { useParams, useHistory } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getById(id);
      setPost(data);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postService.update({ id, title, body });
    history.push(`/posts/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-post-form">
      <h1>Edit Post</h1>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPostPage;
