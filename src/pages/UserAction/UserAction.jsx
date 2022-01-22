import React, { useContext } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import write from "../../assets/images/write.png";
import edit from "../../assets/images/edit.png";
import { Link } from "react-router-dom";
import "./userAction.css";
import { Context } from "../../context/Context";

const UserAction = () => {
  const { user } = useContext(Context);
  return (
    <div className="my-5 py-5">
      <Container className="my-2">
        <h1 className=" text-center">What do you wish to do ?</h1>
        <Row className="justify-content-center">
          <Col lg="4" md="6" sm="12">
            <Card
              className="writeOptionCard mx-auto my-4"
              style={{ width: "18rem" }}
            >
              <Card.Img style={{ height: "200px" }} src={edit} />
              <Card.Body>
                <p style={{ fontSize: "18px" }} className="text-center">
                  Edit The Blog
                </p>
                <Card.Text className="my-5 text-center">
                  <Link
                    to={`/?user=${user.username}`}
                    className="text-center text-decoration-none"
                  >
                    Click To Continue
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="12">
            <Card
              className="writeOptionCard mx-auto my-4"
              style={{ width: "18rem" }}
            >
              <Card.Img
                style={{ height: "190px", width: "190px" }}
                className="d-flex my-1 mx-auto"
                src={write}
              />
              <Card.Body>
                <p style={{ fontSize: "18px" }} className="text-center">
                  Write A New Blog
                </p>
                <Card.Text className="my-5 text-center">
                  <Link to={"/write"} className="text-center text-decoration-none">
                    Click To Continue
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserAction;
