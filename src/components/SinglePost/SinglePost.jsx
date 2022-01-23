import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./singlePost.css";
import logo from "../../assets/images/logob.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { readingTime, toastError, toastSuccess } from "../../utils";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const { token, user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [postLiked, setPostLiked] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${API_BASE_URL}/posts/fetch/${postId}`);
      // console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPhoto(res.data.photo);
    };
    getPost();
  }, [postId]);

  useEffect(() => {
    if (post && post.likes && user) {
      setPostLiked(post.likes.includes(user?._id));
    }
  }, [post, user]);

  // console.log(post);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/posts/delete/${postId}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (res) {
        toastSuccess("Post deleted successfully !");
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
      toastError(
        error.message || "Server error, Please try again after sometime !"
      );
    }
  };

  const handleUpdate = async () => {
    if (title.trim() !== "" && desc.trim() !== "") {
      try {
        const res = await axios.put(
          `${API_BASE_URL}/posts/update/${postId}`,
          { title, desc, photo, username: user.username },
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (res.data) {
          // console.log(res.data);
          toastSuccess("Blog updated Successfully !");
          setUpdateMode(false);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        toastError(
          error.message || "Server error, Please try again after sometime !"
        );
      }
    } else {
      toastError("Both Title and Description cannot be empty !");
    }
  };

  const addPostComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      try {
        const res = await axios.put(
          `${API_BASE_URL}/posts/comment/${postId}`,
          {
            title: post.title,
            comment: commentInput,
          },
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (res.data) {
          toastSuccess("Comment added successfully !");
        }
      } catch (error) {
        console.log(error);
        toastError(error.message);
      }
    } else {
      toastError("Comment cannot be empty !");
    }
  };

  const handlePostLike = async () => {
    if (user) {
      try {
        const res = await axios.patch(
          `${API_BASE_URL}/posts/like/${postId}`,
          {},
          { headers: { "x-access-token": token } }
        );
        if (res.data) {
          setPostLiked(!postLiked);
          if (postLiked) {
            const newLikesArray = post.likes;
            const index = newLikesArray.indexOf(user._id);
            if (index > -1) {
              newLikesArray.splice(index, 1);
            }
            setPost({ ...post, likes: [...newLikesArray] });
          } else {
            setPost({ ...post, likes: [...post.likes, user._id] });
          }
        }
        if (postLiked) {
          const newLikesArray = post.likes;
          const index = newLikesArray.indexOf(user._id);
          if (index > -1) {
            newLikesArray.splice(index, 1);
          }
          setPost({ ...post, likes: [...newLikesArray] });
        }
      } catch (error) {
        console.log(error);
        toastError(error.message);
      }
    } else {
      alert("Please Login for Liking and Commenting on a Blog !");
      window.location.replace("?login=true");
    }
  };

  return (
    <div className="my-5">
      <Container className="px-4">
        {updateMode ? (
          <>
            <input
              type="text"
              autoFocus
              value={title}
              placeholder="Enter title here..."
              onChange={(e) => setTitle(e.target.value)}
              className="my-3 singlePostTitleInput w-100 p-2 border-0"
            />
            <input
              type="text"
              autoFocus
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder={"Enter Image Link here..."}
              className="my-3 singlePostTitleInput w-100 p-2 border-0"
            />
          </>
        ) : (
          <>
            <h1 className="blogTitle">{post.title}</h1>
            <img
              src={post.photo ? post.photo : "https://picsum.photos/1000/500"}
              alt="header"
              className="singlePostImg"
            />
          </>
        )}

        {!updateMode ? (
          <>
            {user && user?.role === "admin" ? (
              <div className="singlePostEdit my-2 d-flex justify-content-end">
                <i
                  onClick={() => setUpdateMode(true)}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  className="m-1 singlePostIcon text-success far  fa-edit"
                ></i>
                <i
                  onClick={handleDelete}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  className="m-1 singlePostIcon text-danger far  fa-trash-alt"
                ></i>
              </div>
            ) : null}
            <div className="infoHeading  d-flex justify-content-between">
              <div className="info d-flex align-items-center w-75">
                <img src={logo} alt="author" className="authorImage" />
                <h2 className="mx-2 mt-1 ">
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/?user=${post.username}`}
                  >
                    {post.username}
                  </Link>
                </h2>
                <p className="text-muted mt-3">
                  {new Date(post.createdAt).toDateString()}
                </p>
                <p className="text-secondary mt-3 mx-2">
                  <li>{readingTime(post?.desc || "")} min read</li>
                </p>
              </div>
              <button className="singlePostShareBtn mt-3">
                <i className="fas fa-share"></i> Share
              </button>
            </div>
          </>
        ) : null}

        {updateMode ? (
          <>
            <textarea
              className="singlePostTitleInput w-100 my-3 p-2 border-0"
              placeholder="Enter Blog Description here..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="10"
              cols="20"
            ></textarea>
            <button
              onClick={handleUpdate}
              className="singlePostUpdateButton my-4 d-block p-1"
            >
              <i className="fas fa-edit"></i>&nbsp;&nbsp;Update
            </button>
          </>
        ) : (
          <p className="text-justify singlePostDesc">{post.desc}</p>
        )}

        <div className="d-inline-block singlePostTags">
          <span
            style={{ backgroundColor: "#e0e0e0", width: "100px" }}
            className="m-2 p-2 d-inline-block"
          >
            Framework
          </span>
          <span
            style={{ backgroundColor: "#e0e0e0", width: "100px" }}
            className="m-2 p-2 d-inline-block"
          >
            Web Dev
          </span>
          <span
            style={{ backgroundColor: "#e0e0e0", width: "100px" }}
            className="m-2 p-2 d-inline-block"
          >
            Technology
          </span>
          <span
            style={{ backgroundColor: "#e0e0e0", width: "100px" }}
            className="m-2 p-2 d-inline-block"
          >
            Life
          </span>
          <span
            style={{ backgroundColor: "#e0e0e0", width: "100px" }}
            className="m-2 p-2 d-inline-block"
          >
            Learning
          </span>
        </div>
        <div className="interactIcons d-flex py-2">
          <div className="like m-3 text-muted">
            {post.likes && postLiked ? (
              <i
                role={"button"}
                onClick={handlePostLike}
                className="fas text-danger likeBtn fa-thumbs-up"
              ></i>
            ) : (
              <i
                role={"button"}
                onClick={handlePostLike}
                className="far likeBtn fa-thumbs-up"
              ></i>
            )}{" "}
            {post.likes ? post.likes.length : 0} like
          </div>
          <div className="comment m-3 text-muted">
            <i className="far fa-comments"></i>{" "}
            {post.comments ? post.comments.length : 0} comment
          </div>
        </div>
        <div className="comment-container">
          <h4>Comments</h4>
          <hr />
          {post.comments &&
            post.comments.map((pc) => {
              return (
                <div key={pc._id} className="comment-box d-flex">
                  <img
                    src="https://picsum.photos/1000/500"
                    alt="header"
                    className="authorImage d-inline-block"
                  />
                  <div className="comment-box-comment d-inline-block">
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        {pc.username.toUpperCase()}
                      </span>{" "}
                      <span style={{ fontSize: "12px" }} className="text-muted">
                        {new Date(pc.time).toDateString()}
                      </span>
                    </p>
                    <p className="comment">{pc.comment}</p>
                  </div>
                </div>
              );
            })}
          <form onSubmit={addPostComment}>
            <textarea
              className="w-100 p-2 commentInput"
              placeholder="Type your comment here..."
              rows="4"
              onChange={(e) => setCommentInput(e.target.value)}
            ></textarea>
            <button
              disabled={user ? false : true}
              type="submit"
              className="addCommentBtn p-2 my-2"
            >
              <i className="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;Add Comment
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SinglePost;
