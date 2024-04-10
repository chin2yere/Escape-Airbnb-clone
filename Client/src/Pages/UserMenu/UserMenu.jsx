import React from "react";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../UserContext";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { GiRamProfile } from "react-icons/gi";
import { BsChatSquareTextFill } from "react-icons/bs";
import { BsChatHeartFill } from "react-icons/bs";
import { PiChatsBold } from "react-icons/pi";
import { MdOutlineCardTravel } from "react-icons/md";
import { SiYourtraveldottv } from "react-icons/si";
import { GiTravelDress } from "react-icons/gi";
import { TbJewishStar } from "react-icons/tb";
import { SiWish } from "react-icons/si";
import { WiShowers } from "react-icons/wi";

export default function UserMenu() {
  const { userContext, setUserContext } = useContext(UserContext);
  const navigate = useNavigate();
  function returnState() {
    const chats = [...userContext.chats];
    if (chats.length === 0) {
      return "";
    } else {
      return chats[0];
    }
  }
  if (userContext) {
    return (
      <div>
        <Row>
          <Col>
            <Link to="/profile">
              <Card
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "20px",
                  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                  borderStyle: "solid",
                  borderColor: "black",
                  justifyContent: "center",
                }}
              >
                User Profile
                <CgProfile
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <GiRamProfile
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
                <ImProfile
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/chat" state={{ ownerName: returnState() }}>
              <Card
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "20px",
                  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                Chat
                <BsChatHeartFill
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <BsChatSquareTextFill
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
                <PiChatsBold
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/past/trips">
              <Card
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "20px",
                  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                Past trips
                <MdOutlineCardTravel
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <SiYourtraveldottv
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
                <GiTravelDress
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/future/trips">
              <Card
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "20px",
                  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                Upcoming trips
                <MdOutlineCardTravel
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <SiYourtraveldottv
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
                <GiTravelDress
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/wishlists">
              <Card
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "20px",
                  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                Wishlists
                <TbJewishStar
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                />
                <SiWish
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
                <WiShowers
                  style={{
                    fontSize: "40px",
                    marginLeft: "40px",
                    marginBottom: "10px",
                  }}
                />
              </Card>
            </Link>
          </Col>
          <Col>
            <Card
              style={{
                width: "200px",
                height: "200px",
                margin: "20px",
                boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                borderStyle: "solid",
                borderColor: "black",
              }}
            >
              <Button
                onClick={() => {
                  setUserContext(null);
                  navigate("/");
                }}
                style={{ marginTop: "40px" }}
              >
                Logout
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
