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

export default function ListingCard({
  id,
  location,
  price,
  name,
  type,
  reviews,
}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  function calculateReview(array) {
    let total = 0;
    array.map((object) => (total += object.Rating));
    return total / array.length;
  }
  return (
    <Card
      style={{
        width: "20rem",
        height: "420px",
        borderColor: "rgba(227, 80, 124)",
      }}
    >
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Image
            src="https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=2560%2C1440&strip=all"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=2560%2C1440&strip=all"
            fluid
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://venturebeat.com/wp-content/uploads/2014/07/airbnb-logo-red.jpg?fit=2560%2C1440&strip=all"
            fluid
          />
        </Carousel.Item>
      </Carousel>
      <Card.Body>
        <Row>
          <Col sm={10}>
            <Card.Title>{location}</Card.Title>
            <Card.Text>{name}</Card.Text>
            <Card.Text>{type}</Card.Text>
            <Card.Text>${price}</Card.Text>
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
