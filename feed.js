import React, { useState, useEffect } from "react";
import { postService } from "../services/post.service";
import Post from "./Post";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getAll();
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="feed-container">
      <h1>Feed</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default FeedPage;
