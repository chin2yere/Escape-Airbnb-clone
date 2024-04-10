import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { UserContext, ChatsContext } from "../../UserContext";

//import "./LoginModal.css";

function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);
  const [username, setUsername] = useState(userContext.username);
  const [password, setPassword] = useState(userContext.password);
  const [name, setName] = useState(userContext.name);
  const [address, setAddress] = useState(userContext.address);
  const [language, setLanguage] = useState(userContext.language);
  const [intro, setIntro] = useState(userContext.intro);
  const [work, setWork] = useState(userContext.work);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    //e.preventDefault();

    try {
      // Make the create product API request

      const response = await fetch(
        `http://localhost:3000/user/${userContext.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
            Name: name,
            Upcoming_trips: userContext.upcoming_trips,
            Past_trips: userContext.past_trips,
            Wishlists: userContext.wishlists,
            Address: address,
            Language: language,
            Intro: intro,
            Chats: userContext.chats,
            Work: work,
            Picture_url: userContext.picture_url,
          }),
          credentials: "include",
        }
      );
      //console.log(response)

      if (response.ok) {
        // Navigate to the business page after successful login
        const data = await response.json();
        //console.log(data);
        //const fine = data[0];
        //console.log(data);
        setUserContext(data);

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
          Update Profile
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
              handleUpdate();
              props.onHide();
            }}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Update
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

export default function ProfileModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{
          backgroundColor: "rgba(227, 80, 124)",
          width: "300px",
        }}
        onClick={() => setModalShow(true)}
      >
        Edit profile
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
