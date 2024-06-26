import React from "react";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { CategoryContext } from "../../UserContext";
import "./HomeCategoryBar.css";
import { MdApartment } from "react-icons/md";
import { MdVilla } from "react-icons/md";
import { MdCottage } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { MdCabin } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi"; //condo
import { BsCheckAll } from "react-icons/bs";
import HomeFilterModal from "../HomeFilterModal/HomeFilterModal";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

//this is the category bar on the home page
export default function HomeCategoryBar() {
  const { setCategoryContext } = useContext(CategoryContext);
  function setAll() {
    //this is called when you want to update category context to all
    const temp = {
      Apartment: true,
      Villa: true,
      Loft: true,
      Condo: true,
      Cottage: true,
      Cabin: true,
    };
    setCategoryContext({ ...temp });
  }
  function setApartment() {
    //this is called when you want to update category context to apartment
    const temp = {
      Apartment: true,
      Villa: false,
      Loft: false,
      Condo: false,
      Cottage: false,
      Cabin: false,
    };
    setCategoryContext({ ...temp });
  }
  function setVilla() {
    //this is called when you want to update category context to villa
    const temp = {
      Apartment: false,
      Villa: true,
      Loft: false,
      Condo: false,
      Cottage: false,
      Cabin: false,
    };
    setCategoryContext({ ...temp });
  }
  function setLoft() {
    //this is called when you want to update category context to loft
    const temp = {
      Apartment: false,
      Villa: false,
      Loft: true,
      Condo: false,
      Cottage: false,
      Cabin: false,
    };
    setCategoryContext({ ...temp });
  }
  function setCondo() {
    //this is called when you want to update category context to condo
    const temp = {
      Apartment: false,
      Villa: false,
      Loft: false,
      Condo: true,
      Cottage: false,
      Cabin: false,
    };
    setCategoryContext({ ...temp });
  }
  function setCottage() {
    //this is called when you want to update category context to cottage
    const temp = {
      Apartment: false,
      Villa: false,
      Loft: false,
      Condo: false,
      Cottage: true,
      Cabin: false,
    };
    setCategoryContext({ ...temp });
  }
  function setCabin() {
    //this is called when you want to update category context to cabin
    const temp = {
      Apartment: false,
      Villa: false,
      Loft: false,
      Condo: false,
      Cottage: false,
      Cabin: true,
    };
    setCategoryContext({ ...temp });
  }

  return (
    <div className="home-category-bar">
      <Row>
        <Col sm={10}>
          <Nav variant="underline">
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link style={{ color: "black" }} onClick={() => setAll()}>
                <BsCheckAll style={{ fontSize: "34px" }} />
                <p>All types</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link
                style={{ color: "black" }}
                onClick={() => setApartment()}
              >
                <MdApartment style={{ fontSize: "34px" }} />
                <p>Apartment</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link style={{ color: "black" }} onClick={() => setVilla()}>
                <MdVilla style={{ fontSize: "34px" }} />
                <p>Villa</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link style={{ color: "black" }} onClick={() => setCottage()}>
                <MdCottage style={{ fontSize: "34px" }} />
                <p>Cottage</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link style={{ color: "black" }} onClick={() => setCondo()}>
                <GiFamilyHouse style={{ fontSize: "34px" }} />
                <p>Condo</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link style={{ color: "black" }} onClick={() => setLoft()}>
                <GiWoodCabin style={{ fontSize: "34px" }} />
                <p>Loft</p>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ marginRight: "20px" }}>
              <Nav.Link style={{ color: "black" }} onClick={() => setCabin()}>
                <MdCabin style={{ fontSize: "34px" }} />
                <p>Cabin</p>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={2}>
          <HomeFilterModal />
        </Col>
      </Row>
    </div>
  );
}
