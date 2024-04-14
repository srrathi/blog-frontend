import React from "react";
import { Container } from "react-bootstrap";
import Post from "../Post/Post";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";

const Posts = ({ posts, isLoading, setIsLoading }) => {
  return isLoading ? <SpinnerComponent /> : (
    <Container>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}

      </div>
    </Container>
  );
};

export default Posts;
