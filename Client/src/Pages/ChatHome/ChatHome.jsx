import React from "react";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./ChatHome.css";
import { UserContext } from "../../UserContext";
import { BsChatDots } from "react-icons/bs";
import Chat from "../Chat/Chat";
export default function ChatHome() {
  const location = useLocation();
  const name_data = location.state; // Access the passed props
  const name = name_data.ownerName;
  const [activeTab, setActiveTab] = useState(name);
  const { userContext, setUserContext } = useContext(UserContext);
  console.log(userContext);
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
    if (chats && includes(chats) == false) {
      let newChat = chats;
      newChat.push(name);

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
}