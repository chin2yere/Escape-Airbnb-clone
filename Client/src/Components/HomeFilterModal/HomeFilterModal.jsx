import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TbFilters } from "react-icons/tb";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { useState, useContext } from "react";
import { CategoryContext, BudgetContext, TypeContext } from "../../UserContext";
import Form from "react-bootstrap/Form";
import { GiFlamedLeaf } from "react-icons/gi";
import { MdApartment } from "react-icons/md";
import { MdVilla } from "react-icons/md";
import { MdCottage } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { MdCabin } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";

function MyVerticallyCenteredModal(props) {
  const [value, setValue] = useState(50); // Initial value of the range input
  const maxValue = 1000;
  const { categoryContext, setCategoryContext } = useContext(CategoryContext);
  const { budgetContext, setBudgetContext } = useContext(BudgetContext);
  const { typeContext, setTypeContext } = useContext(TypeContext);
  console.log(budgetContext);
  console.log(typeContext);
  //let active = false;

  // Function to handle changes to the range input
  const handleRangeChange = (event) => {
    setValue(event.target.value); // Update the state with the new value
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <h4>Type of place</h4>
          <p>Search rooms, entire homes, or any type of place</p>
          <div style={{ padding: "20px" }}>
            <Nav variant="pills" defaultActiveKey="link-1" justify>
              <Nav.Item>
                <Nav.Link eventKey="link-1">All Types</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Room</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">Entire home</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Row>
        <hr />
        <Row>
          <h4>Price range</h4>
          <p>Nightly prices before fees and taxes</p>
          <div>
            <Form.Label>Range</Form.Label>
            <Form.Range
              value={value}
              onChange={handleRangeChange}
              max={maxValue}
            />
            {/* Display the current value of the range */}
            <Form.Label>Max Value</Form.Label>
            <Form.Control
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </Row>
        <hr />
        <Row>
          <h4>Rooms and beds</h4>
          <p>Bedrooms</p>
          <div
            style={{
              padding: "20px",
            }}
          >
            <Nav variant="pills" defaultActiveKey="link-1" justify>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Any</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-4">3</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-5">4</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-6">5</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-7">6</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-8">7</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-9">8+</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <p>Beds</p>
          <div
            style={{
              padding: "20px",
            }}
          >
            <Nav variant="pills" defaultActiveKey="link-1" justify>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Any</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-4">3</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-5">4</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-6">5</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-7">6</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-8">7</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-9">8+</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <p>Bathsrooms</p>
          <div
            style={{
              padding: "20px",
            }}
          >
            <Nav variant="pills" defaultActiveKey="link-1" justify>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Any</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-4">3</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-5">4</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-6">5</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-7">6</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-8">7</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-9">8+</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Row>
        <hr />
        <Row>
          <h4>Top-tier stays</h4>
          <div style={{ padding: "20px" }}>
            <Button
              variant="outline-secondary"
              className="buttonn"
              style={{ width: "300px", height: "150px" }}
            >
              <GiFlamedLeaf style={{ fontSize: "24px" }} />
              <br />
              <strong>Guest Favorites</strong> <br /> The most loved homes on
              airbnb according to guests
            </Button>
          </div>
        </Row>
        <hr />
        <Row>
          <h4>Property type</h4>
          <div style={{ padding: "20px" }}>
            <Button
              variant="outline-secondary"
              style={{ width: "150px", height: "100px" }}
            >
              <MdApartment style={{ fontSize: "34px" }} />
              <br />
              Apartment
            </Button>
            <Button
              variant="outline-secondary"
              style={{ width: "150px", height: "100px" }}
            >
              <MdVilla style={{ fontSize: "34px" }} />
              <br />
              Villa
            </Button>
            <Button
              variant="outline-secondary"
              style={{ width: "150px", height: "100px" }}
            >
              <GiWoodCabin style={{ fontSize: "34px" }} />
              <br />
              Loft
            </Button>
            <Button
              variant="outline-secondary"
              style={{ width: "150px", height: "100px" }}
            >
              <MdCottage style={{ fontSize: "34px" }} />
              <br />
              Cottage
            </Button>
            <Button
              variant="outline-secondary"
              style={{ width: "150px", height: "100px" }}
            >
              <GiFamilyHouse style={{ fontSize: "34px" }} />
              <br />
              Condo
            </Button>
            <Button
              variant="outline-secondary"
              style={{ width: "150px", height: "100px" }}
            >
              <MdCabin style={{ fontSize: "34px" }} />
              <br />
              Cabin
            </Button>
          </div>
        </Row>
        <hr />
        <Row>
          <h4>Amenities</h4>
          <p>Essentials</p>
          <div>
            <Row>
              <Col>
                <Form.Check label="Wifi" name="group1" />
                <Form.Check label="Washer" name="group1" />
                <Form.Check label="Air conditioning" name="group1" />
                <Form.Check label="Kitchen" name="group1" />
              </Col>
              <Col>
                <Form.Check label="Dryer" name="group1" />
                <Form.Check label="Heating" name="group1" />
                <Form.Check label="TV" name="group1" />
                <Form.Check label="Private bathroom" name="group1" />
              </Col>
            </Row>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Show Results</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default function HomeFilterModal() {
  const [modalShow, setModalShow] = React.useState(false);
  //console.log(typeof setcategory);
  return (
    <div>
      <Button variant="outline-secondary" onClick={() => setModalShow(true)}>
        <TbFilters />
        &nbsp;&nbsp; Filter
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
