import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../utils/index";
import "./write.css";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Write = () => {
  const { user, token } = useContext(Context);
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() !== "" && desc.trim() !== "") {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/posts/create`,
          { title, photo, desc, username: user.username, id: user._id },
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (res.data) {
          toastSuccess("Blog successfully created !");
          window.location.replace(`/post/${res.data._id}`);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
        toastError(error.message || "Server error, Please try again after sometime !");
      }
    } else {
      toastError("Mandatory fields are Empty !");
    }
  };
  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <div className="d-flex container mt-5 align-items-center justify-content-between">
          <h2>Write your Blog</h2>
          <button className="writeFormBtn" type="submit">
            Publish
          </button>
        </div>
        <Container className="my-3">
          <input
            className="w-100 p-2 border-0 my-2 writeFormInput"
            style={{ backgroundColor: "#f7f7f7" }}
            type="text"
            placeholder="Your Title Here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-100 p-2 border-0 my-2 writeFormInput"
            style={{ backgroundColor: "#f7f7f7" }}
            type="text"
            placeholder="Your Image Link"
            onChange={(e) => setPhoto(e.target.value)}
          />
          <textarea
            className="w-100 p-2 border-0 my-2 writeFormInput"
            style={{ backgroundColor: "#f7f7f7" }}
            placeholder="Add Description Here..."
            onChange={(e) => setDesc(e.target.value)}
            rows="17"
          ></textarea>
        </Container>
      </form>
    </div>
  );
};

export default Write;
