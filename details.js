import React, { useState, useEffect } from "react";
import { postService } from "../services/post.service";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getById(id);
      setPost(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetailPage;
