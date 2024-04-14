import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { UserContext, ChatsContext } from "../../UserContext";

import "./LoginModal.css";

function MyVerticallyCenteredModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userContext, setUserContext } = useContext(UserContext);
  const { setChatsContext } = useContext(ChatsContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    //e.preventDefault();
    console.log("here");

    try {
      console.log("inner");
      // Make the login API request
      //const url = `${apiUrlContext}/job/${"id"}/${jobId}`;
      const url = `http://localhost:3000/login/${username}/${password}`;

      const response = await fetch(url);
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        //const loggedInUser = data.user;

        // Update the user context
        setUserContext(data);
        setChatsContext(data.chats);

        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // Handle the login failure case
        alert("Login failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Login failed: " + error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={() => handleLogin()}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function LoginModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{
          backgroundColor: "rgba(227, 80, 124)",
          width: "200px",
        }}
        onClick={() => setModalShow(true)}
      >
        Login
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
