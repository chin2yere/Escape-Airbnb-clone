import React from "react";
import { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./ChatHome.css";
import { UserContext } from "../../UserContext";
import { BsChatDots } from "react-icons/bs";
import Chat from "../Chat/Chat";
import Button from "react-bootstrap/esm/Button";
export default function ChatHome() {
  const location = useLocation();
  const name_data = location.state; // Access the passed props
  const name = name_data.ownerName;
  const ownerId = name_data.ownerId;
  //console.log(ownerId);
  const [activeTab, setActiveTab] = useState(name);
  const { userContext, setUserContext } = useContext(UserContext);
  //console.log(userContext);
  let chats = [...userContext.chats];

  //console.log(chats);

  function includes(chats) {
    let isIt = false;
    chats.map((entry) => {
      if (entry == name) {
        isIt = true;
      }
    });
    return isIt;
  }
  useEffect(() => {
    if (name != "" && chats && includes(chats) == false) {
      let newChat = chats;
      newChat.push(name);

      //
      let ownerChat = [...ownerId.chats];
      ownerChat.push(userContext.name);
      const handleUpdateOwner = async (ownerChat) => {
        //e.preventDefault();

        try {
          // Make the create product API request

          const response = await fetch(
            `http://localhost:3000/user/${ownerId.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Username: ownerId.username,
                Password: ownerId.password,
                Name: ownerId.name,
                Upcoming_trips: ownerId.upcoming_trips,
                Past_trips: ownerId.past_trips,
                Wishlists: ownerId.wishlists,
                Address: ownerId.address,
                Language: ownerId.language,
                Intro: ownerId.intro,
                Chats: ownerChat,
                Work: ownerId.work,
                Picture_url: ownerId.picture_url,
              }),
              credentials: "include",
            }
          );
          //console.log(response)

          if (response.ok) {
            // Navigate to the business page after successful login
            const data = await response.json();
            console.log(data);
            //const fine = data[0];
            //console.log(data);
          } else {
            // Handle the create failure case
            alert("creation failed");
          }
        } catch (error) {
          // Handle any network or API request errors
          alert("creation failed: " + error);
        }
      };
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
                Username: userContext.username,
                Password: userContext.password,
                Name: userContext.name,
                Upcoming_trips: userContext.upcoming_trips,
                Past_trips: userContext.past_trips,
                Wishlists: userContext.wishlists,
                Address: userContext.address,
                Language: userContext.language,
                Intro: userContext.intro,
                Chats: newChat,
                Work: userContext.work,
                Picture_url: userContext.picture_url,
              }),
              credentials: "include",
            }
          );
          //console.log(response)

          if (response.ok) {
            // Navigate to the business page after successful login
            const data = await response.json();
            console.log(data);
            //const fine = data[0];
            console.log(data);
            setUserContext(data);
            chats = data.chats;
            ownerChat && handleUpdateOwner(ownerChat);
          } else {
            // Handle the create failure case
            alert("creation failed");
          }
        } catch (error) {
          // Handle any network or API request errors
          alert("creation failed: " + error);
        }
      };
      chats && handleUpdate();
    }
  }, []);
  if (name != "") {
    return (
      <Container>
        <Row>
          <Col className="sidebarChat" style={{ width: "30%" }}>
            <h4>
              <em>Messages</em>
            </h4>
            <hr />
            <br />
            <br />
            <Nav fill variant="tabs" className="flex-column">
              {chats &&
                chats.map((chat) => {
                  return (
                    <Nav.Item key={chat}>
                      <Nav.Link
                        onClick={() => setActiveTab(chat)}
                        style={{ color: "white" }}
                      >
                        <BsChatDots /> &nbsp;&nbsp;
                        {chat}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
          </Col>
          <Col style={{ width: "70%" }}>
            <Chat activeTab={activeTab} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <div>
        <h5>Your chat is empty</h5>
        <Link to="/usermenu">
          <Button>Click here to go back</Button>
        </Link>
      </div>
    );
  }
}
