import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts/Posts";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      if (search.split("=")[0] === "?user") {
        const res = await axios.get(`${API_BASE_URL}/posts/allPosts${search}`);
        // console.log(res);
        setPosts(res.data);
      } else {
        const res = await axios.get(`${API_BASE_URL}/posts/allPosts`);
        // console.log(res);
        setPosts(res.data);
      }
    };
    fetchPosts();
  }, [search]);
  return (
    <div style={{minHeight:"80vh"}} className="my-4 pt-4">
      <div className="container">
        <h2 className="mb-4">My Dev Blogs</h2>
      </div>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
