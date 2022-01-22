import React from "react";
import { Container, Row } from "react-bootstrap";
import Post from "../Post/Post";

const Posts = ({ posts }) => {
  return (
    <Container>
      <Row>
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
        
      </Row>
    </Container>
  );
};

export default Posts;
