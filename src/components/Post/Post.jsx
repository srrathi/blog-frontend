import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { readingTime } from "../../utils";
import "./post.css";

const Post = ({ post }) => {
  return (
    <Col className="my-4" sm="12" md="6" lg="3">
      <Card style={{ height: "25rem" }}>
        <Card.Img
          variant="top"
          src={post.photo ? post.photo : "https://picsum.photos/1000/500"}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <p className="text-muted">
            Published - {new Date(post.createdAt).toDateString()}
          </p>
          <Card.Text className="postDesc">{post.desc}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex bg-white justify-content-between">
          <small className="text-muted">{readingTime(post.desc)} min read</small>
          <Link to={`/post/${post._id}`} className="text-decoration-none">
            Read More
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Post;
