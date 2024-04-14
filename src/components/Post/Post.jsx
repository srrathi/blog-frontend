import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { readingTime } from "../../utils";
import "./post.css";
import { Buffer } from 'buffer';

const Post = ({ post }) => {
  return (
    <div className="my-4">
      <Card>
        <div style={{ width: "100%", height: "12rem", objectFit: "contain" }}>
          <Card.Img
            variant="top"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={post.photo ? post.photo : "https://picsum.photos/1000/500"}
          />
        </div>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <p className="text-muted">
            Published - {new Date(post.createdAt).toDateString()}
          </p>
          <Card.Text className="postDesc">{post.desc}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex bg-white justify-content-between">
          <small className="text-muted">{readingTime(post.desc)} min read</small>
          <Link to={`/post/${Buffer.from(post?._id, 'utf8').toString('base64')}`} className="text-decoration-none">
            Read More
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Post;
