import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/logob.png";

const Footer = () => {
  return (
    <div
      className="w-100"
      style={{ position: "absolute", backgroundColor: "#2F464B" }}
    >
      <div className="my-4 " style={{ position: "relative", bottom: 0 }}>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div>
                <img
                  className="d-inline-block"
                  src={logo}
                  alt="company logo"
                  style={{ height: "50px", width: "50px" }}
                />
                <h2
                  style={{ color: "rgb(230, 230, 230)" }}
                  className="d-inline-block w-50 m-2 pt-2"
                >
                  My&nbsp;Dev&nbsp;Blogs
                </h2>
              </div>
              <div className="mt-4">
                <p className="text-white d-inline-block w-50">Terms</p>
                <p className="text-white d-inline-block w-50">Privacy Policy</p>
              </div>
            </Col>
            <Col lg="6" md="6" sm="12">
              <div>
                <div className="d-flex">
                  <a
                    style={{
                      color: "inherit",
                      backgroundColor: "#474747",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    className="text-decoration-none d-flex m-2 rounded-circle text-align-center text-white p-3 justify-content-center"
                    href="https://www.instagram.com/imrathiii/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className=" fab fa-instagram"></i>
                  </a>

                  <a
                    style={{
                      color: "inherit",
                      backgroundColor: "#474747",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    className="text-decoration-none d-flex m-2 rounded-circle text-align-center text-white p-3 justify-content-center"
                    href="https://twitter.com/SitaramRathi5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className=" fab fa-twitter"></i>
                  </a>
                  <a
                    style={{
                      color: "inherit",
                      backgroundColor: "#474747",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    className="text-decoration-none d-flex m-2 rounded-circle text-align-center text-white p-3 justify-content-center"
                    href="https://www.linkedin.com/in/sitaram-rathi-519152197/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className=" fab fa-linkedin-in"></i>
                  </a>
                  <a
                    style={{
                      color: "inherit",
                      backgroundColor: "#474747",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    className="text-decoration-none d-flex m-2 rounded-circle text-align-center text-white p-3 justify-content-center"
                    href="https://github.com/srrathi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
                <div className="mt-4">
                  <p className="text-white">© Copyright My Dev Blogs 2022</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
