import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Modal } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/images/logob.png";
import {
  LoginFailure,
  LoginStart,
  LoginSuccessfull,
  LogOut,
} from "../../context/Action";
import { Context } from "../../context/Context";
import {
  emailValidator,
  toastError,
  toastInfo,
  toastSuccess,
} from "../../utils";
import { API_BASE_URL } from "../../utils/constants";
import "./topbar.css";

const Topbar = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { dispatch, isFetching, user } = useContext(Context);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    username: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();
    if (
      userData.email.trim() !== "" &&
      emailValidator(userData.email) &&
      userData.name.trim() !== "" &&
      userData.username.trim() !== "" &&
      userData.password.trim() !== "" &&
      userData.confirmPassword.trim() !== "" &&
      userData.password === userData.confirmPassword
    ) {
      try {
        const userObj = {
          username: userData.username,
          password: userData.password,
          email: userData.email,
          name: userData.name,
          contact: userData.contact,
          role: "candidate",
        };
        const res = await axios.post(`${API_BASE_URL}/auth/register`, userObj);
        if (res.data) {
          history.push("/?login=true");
          toastSuccess("User Successfully registered !");
        }
      } catch (error) {
        console.log(error);
        toastError(
          error.message ||
            "User already registered with same username or email. Please try with Different Credentials !"
        );
      }
    } else {
      toastError(
        "Mandatory fields are empty or Password and Confirm Password doesn't match. Please Try Again !"
      );
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (email.trim() !== "" && emailValidator(email) && password.trim() !== "") {
      dispatch(LoginStart());
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password,
        });
        // console.log(res);
        if (res.data) {
          toastSuccess("Login Successfull !");
          dispatch(LoginSuccessfull(res.data));
          toastInfo(`Howdy ${res.data.user.name}, Welcome back !`);
          handleClose();
        }
      } catch (error) {
        console.log(error);
        dispatch(LoginFailure());
        toastError(
          error.message ||
            "Internal Server error occurred. Try after some time !"
        );
      }
    } else {
      toastError("Mandatory fields are empty or Email not valid !");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (type) => {
    if (user) {
      window.location.replace("/");
    } else {
      setModalType(type);
      setShow(true);
    }
  };

  const changeModalType = (queryName) => {
    const params = new URLSearchParams();
    if (queryName) {
      params.append(queryName, true);
    } else {
      params.delete(queryName);
    }
    history.push({ search: params.toString() });
  };

  const registerLinkClick = () => {
    const searchOption = search.split("?")[1];
    changeModalType("register");
    if (searchOption === "register=true") {
      window.location.reload();
    }
  };

  const loginLinkClick = () => {
    const searchOption = search.split("?")[1];
    changeModalType("login");
    if (searchOption === "login=true") {
      window.location.reload();
    }
  };

  useEffect(() => {
    const searchOption = search.split("?")[1];
    if (searchOption === "login=true") {
      handleShow("login");
    } else if (searchOption === "register=true") {
      handleShow("register");
    }
    /* eslint-disable  */
  }, [search]);

  const handleLogout = () => {
    dispatch(LogOut());
    localStorage.setItem("userToken", "");
    window.location.replace("/?login=true");
  };

  // console.log(user, token);
  return (
    <Navbar
      className="shadow"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      style={{ position: "sticky", top: 0, zIndex: 999 }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <Link
            to="/"
            className="d-flex text-dark text-decoration-none align-items-center"
          >
            <img
              style={{ height: "50px", width: "50px" }}
              src={logo}
              alt="dummy logo"
            />
            <p className="m-2 font-weight-bold">My Dev Blogs</p>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          style={{ justifyContent: "flex-end" }}
          id="responsive-navbar-nav"
        >
          <Nav>
            {user?.role === "admin" ? (
              <Link
                to="/user"
                className="topbarBtns text-decoration-none align-items-center d-flex justify-content-center text-white my-1"
              >
                USER ACTIONS
              </Link>
            ) : null}
            {user ? null : (
              <>
                <button
                  onClick={loginLinkClick}
                  className="topbarBtns my-1 topbarLoginBtn"
                >
                  LOG IN
                </button>
                <button onClick={registerLinkClick} className="topbarBtns my-1">
                  REGISTER
                </button>
              </>
            )}
            {user ? (
              <NavDropdown
                title={
                  <span className="topbarDropdownTitle">
                    <i className="fas fa-user-circle"></i> {user?.name}
                  </span>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link
                    to="/settings"
                    className="text-dark text-decoration-none w-100"
                  >
                    <i className="fas fa-cog"></i> Account Settings
                  </Link>
                </NavDropdown.Item>
                {user?.role === "admin" ? (
                  <>
                    <NavDropdown.Item>
                      <Link
                        to="/write"
                        className="text-dark text-decoration-none w-100"
                      >
                        <i className="fas fa-edit"></i> Write Blog
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        to={`/?username=${user.username}`}
                        className="text-dark text-decoration-none w-100"
                      >
                        <i className="fas fa-pen-square"></i> Edit Blog
                      </Link>
                    </NavDropdown.Item>
                  </>
                ) : null}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {modalType === "login" ? (
            <Modal.Title className="text-center w-100">Login</Modal.Title>
          ) : (
            <Modal.Title className="text-center w-100">Register</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {modalType === "login" ? (
            <form onSubmit={handleUserLogin}>
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="loginFormBtn"
                disabled={isFetching}
                type="submit"
                value="Login"
              />
            </form>
          ) : (
            <form onSubmit={handleUserRegister}>
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={(e) => handleUserInput(e)}
              />
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleUserInput(e)}
              />
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => handleUserInput(e)}
              />
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="text"
                name="contact"
                placeholder="Phone Number"
                onChange={(e) => handleUserInput(e)}
              />
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleUserInput(e)}
              />
              <input
                className="w-100 my-2 p-2 border-0 formInput"
                style={{ backgroundColor: "#f7f7f7" }}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => handleUserInput(e)}
              />
              <p className="text-center p-1">
                Already have an account?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="text-primary"
                  onClick={() => changeModalType("login")}
                >
                  Login
                </span>
              </p>
              <input
                className="loginFormBtn"
                type="submit"
                value="Register as Candidate"
              />
              <p>
                By registering, you agree to the{" "}
                <span className="text-primary">Terms & Conditions</span> ,{" "}
                <span className="text-primary">Privacy Policy</span> and{" "}
                <span className="text-primary">Email Policy</span>
              </p>
            </form>
          )}
        </Modal.Body>
        {modalType === "login" ? (
          <p className="text-center p-1">
            Don't have an account yet?{" "}
            <span
              style={{ cursor: "pointer" }}
              className="text-primary"
              onClick={() => changeModalType("register")}
            >
              Register
            </span>
          </p>
        ) : null}
      </Modal>
    </Navbar>
  );
};

export default Topbar;
