import React from "react";
import Nav from "react-bootstrap/Nav";
import "./HomeCategoryBar.css";
import { MdApartment } from "react-icons/md";
import { MdVilla } from "react-icons/md";
import { MdCottage } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { MdCabin } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi"; //condo

export default function HomeCategoryBar() {
  return (
    <div className="home-category-bar">
      <Nav variant="underline">
        <Nav.Item style={{ marginRight: "20px" }}>
          <Nav.Link>
            <MdApartment style={{ fontSize: "34px" }} />
            <h5>hiii</h5>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginRight: "20px" }}>
          <Nav.Link>
            <MdVilla style={{ fontSize: "34px" }} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginRight: "20px" }}>
          <Nav.Link>
            <MdCottage style={{ fontSize: "34px" }} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginRight: "20px" }}>
          <Nav.Link>
            <GiFamilyHouse style={{ fontSize: "34px" }} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginRight: "20px" }}>
          <Nav.Link>
            <GiWoodCabin style={{ fontSize: "34px" }} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginRight: "20px" }}>
          <Nav.Link>
            <MdCabin style={{ fontSize: "34px" }} />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
