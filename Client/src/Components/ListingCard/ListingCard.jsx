import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

//this component is the listing card on the home page
export default function ListingCard({
  id,
  location,
  price,
  name,
  type,
  reviews,
  picture,
}) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  function calculateReview(array) {
    //this function calculates the review that is displayed on the card
    let total = 0;
    array.map((object) => (total += object.Rating));
    return total / array.length;
  }
  return (
    <Card
      style={{
        width: "20rem",
        height: "430px",
        borderColor: "rgba(227, 80, 124)",
      }}
    >
      {/* This is the carousel */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Image src={picture[0]} fluid style={{ maxHeight: "160px" }} />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={picture[1]} fluid style={{ maxHeight: "160px" }} />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={picture[2]} fluid style={{ maxHeight: "160px" }} />
        </Carousel.Item>
      </Carousel>
      <Card.Body>
        <Row>
          <Col sm={10}>
            <Card.Title>{location}</Card.Title>
            <Card.Text>{name}</Card.Text>
            <Card.Text>{type}</Card.Text>
            <Card.Text>${price}</Card.Text>
            {/* this is the button that reroutes the page to the selected listing */}
            <Link to={`/listing/${id}`} state={{ listingId: id }}>
              <Button
                variant="outline-info"
                style={{
                  backgroundColor: "rgba(227, 80, 124)",
                  color: "white",
                }}
              >
                View
              </Button>
            </Link>
          </Col>
          <Col sm={2}>
            <div style={{ display: "inline-block" }}>
              {calculateReview(reviews)}
              <AiFillStar />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
