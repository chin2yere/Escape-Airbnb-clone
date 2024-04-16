import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { TfiWorld } from "react-icons/tfi";
import { TfiMenu } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import HomeCalendar from "../HomeCalendar/HomeCalendar";
import { UserContext, ChatsContext } from "../../UserContext";
import { useState, useContext } from "react";

//this is the top bar on the home page
export default function HomeTopBar() {
  const navigate = useNavigate();
  const { setUserContext } = useContext(UserContext);
  const { setChatsContext } = useContext(ChatsContext);
  return (
    <>
      <div>
        <Navbar
          fixed="top"
          style={{
            display: "flex",
            flexWrap: "nowrap",

            Width: "100%",
          }}
        >
          <Container style={{ padding: "20px" }} fluid>
            <Row style={{ width: "100%" }}>
              <Col style={{ marginLeft: "10px", marginRight: "30px" }}>
                <Image
                  style={{ width: "100px" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                  fluid
                />
              </Col>
              <Col
                xs={6}
                style={{
                  fontFamily: "inherit",
                  fontSize: "20px",
                  flexWrap: "nowrap",
                }}
              >
                Stays &nbsp;&nbsp; Experiences &nbsp;&nbsp; Online Experiences
              </Col>
              <Col style={{ textAlign: "right", fontSize: "20px" }}>
                Airbnb your home
              </Col>
              <Col
                style={{
                  width: "600px",

                  alignItems: "right",
                  flexWrap: "nowrap",
                }}
              >
                <TfiWorld />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  onClick={() => {
                    navigate("/usermenu");
                  }}
                  variant="outline-secondary"
                >
                  <TfiMenu />
                  &nbsp;&nbsp;
                  <CgProfile />
                </Button>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </div>
      <div style={{ marginTop: "80px" }}>
        <HomeCalendar />
      </div>
    </>
  );
}
