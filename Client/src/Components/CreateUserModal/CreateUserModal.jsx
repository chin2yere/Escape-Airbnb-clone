import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { UserContext, ChatsContext } from "../../UserContext";

//this component is the modal button on the signup page that helps create a new user
function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);
  const { setChatsContext } = useContext(ChatsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [intro, setIntro] = useState("");
  const [work, setWork] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    //e.preventDefault();

    try {
      // Make the create user API request

      const response = await fetch(`http://localhost:3000/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
          Name: name,
          Upcoming_trips: [],
          Past_trips: [],
          Wishlists: [],
          Address: address,
          Language: language,
          Intro: intro,
          Chats: [],
          Work: work,
          Picture_url: "https://example.com/profile_pic.jpg",
        }),
        credentials: "include",
      });
      //console.log(response)

      if (response.ok) {
        // Navigate to the business page after successful login
        const data = await response.json();
        //console.log(data);
        //const fine = data[0];
        console.log(data);
        setUserContext(data);
        setChatsContext(data.chats);

        // Navigate to the home page after successful login
        navigate("/");

        //chats = data.chats;
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Create Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Language</Form.Label>
            <Form.Control
              required
              type="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Intro</Form.Label>
            <Form.Control
              required
              as="textarea"
              type="intro"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Work</Form.Label>
            <Form.Control
              required
              type="work"
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={() => {
              handleCreate();
              //props.onHide();
            }}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Create
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

export default function CreateUserModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{
          backgroundColor: "rgba(227, 80, 124)",
          width: "200px",
          marginTop: "20px",
        }}
        onClick={() => setModalShow(true)}
      >
        Sign up
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
