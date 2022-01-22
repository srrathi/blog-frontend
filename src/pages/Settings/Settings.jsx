import axios from "axios";
import React, { useContext, useState } from "react";
import { Card, Container } from "react-bootstrap";
import {
  UpdateStart,
  UpdateSuccessfull,
} from "../../context/Action";
import { Context } from "../../context/Context";
import { toastError, toastSuccess } from "../../utils";
import { API_BASE_URL } from "../../utils/constants";
import "./settings.css";

const Settings = () => {
  const { user, token, dispatch } = useContext(Context);
  const [userData, setUserData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    contact: user.contact,
  });

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.username.trim() !== "" &&
      userData.name.trim() !== "" &&
      userData.email.trim() !== ""
    ) {
      try {
        dispatch(UpdateStart());
        const res = await axios.put(
          `${API_BASE_URL}/users/update/${user._id}`,
          userData,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (res.data) {
          dispatch(UpdateSuccessfull(res.data));
          toastSuccess(
            "User Updated successfully, Please Log In again to see changes !"
          );
          window.location.replace("/");
        }
      } catch (error) {
        console.log(error);
        toastError(error.message || "Server error, Please try again later !");
      }
    } else {
      toastError("Mandatory fields are empty !");
    }
  };

  const handleAccountDelete = async () => {
    if (window.confirm("Are you sure you want to Delete your account ?")) {
      try {
        const res = await axios.delete(
          `${API_BASE_URL}/users/delete/${user._id}`,
          {
            headers: { "x-access-token": token },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
        toastError(error.message || "Server error, Please try again later !");
      }
    }
  };
  return (
    <div>
      <Container className="my-5">
        <Card className="py-4 accountSettingsCard">
          <h2 className="text-center">Account Settings</h2>
          <i
            onClick={handleAccountDelete}
            style={{ fontSize: "20px", cursor: "pointer" }}
            className="singlePostIcon text-danger far d-flex flex-row-reverse m-2 fa-trash-alt"
          ></i>
          <form onSubmit={handleSubmit} className="p-3 mb-3">
            <label className="w-100 mt-4" style={{ fontSize: "20px" }}>
              Username
            </label>
            <input
              placeholder={user.username}
              className="w-100 border-0 settingsInput "
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInput}
            />
            <label className="w-100 mt-4" style={{ fontSize: "20px" }}>
              Name
            </label>
            <input
              placeholder={user.name}
              className="w-100 border-0 settingsInput "
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInput}
            />
            <label className="w-100 mt-4" style={{ fontSize: "20px" }}>
              Email
            </label>
            <input
              placeholder={user.email}
              className="w-100 border-0 settingsInput "
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInput}
            />
            <label className="w-100 mt-4" style={{ fontSize: "20px" }}>
              Contact
            </label>
            <input
              placeholder={user.contact || "Enter your contact number"}
              className="w-100 border-0 settingsInput "
              type="text"
              name="contact"
              value={userData.contact}
              onChange={handleInput}
            />
            <button
              type="submit"
              className="settingsUpdateBtn mx-auto d-flex mt-5 align-items-center justify-content-center"
            >
              Update Settings
            </button>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default Settings;
