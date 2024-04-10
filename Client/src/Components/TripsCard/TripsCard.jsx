import React from "react";
import { ListingsContext } from "../../UserContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/esm/Image";

export default function TripsCard({ id, payment, from, to }) {
  //const {ListingsContext} = useContext(ListingsContext);
  const [listing, setListing] = useState({});
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const url = `http://localhost:3000/listing/${"id"}/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setListing(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch Listing failed: " + error);
      }
    };
    fetchListing();
  }, []);

  return (
    <div>
      <Link to={`/listing/${id}`} state={{ listingId: id }}>
        <Card
          style={{
            margin: "40px",
            borderStyle: "double",
            borderRadius: "20px",

            borderColor: "rgba(227, 80, 124)",
          }}
        >
          <Row>
            <Col>
              <Image
                src="https://thumbs.dreamstime.com/b/ready-summer-vacation-travel-background-d-rendering-114574299.jpg"
                fluid
              ></Image>
            </Col>
            <Col>
              <h6>{listing.name}</h6>
              <p>{listing.location}</p>
              <p>{listing.type}</p>
              <p>Payment: ${payment}</p>
              <p>From: {from}</p>
              <p>To: {to}</p>
            </Col>
          </Row>
        </Card>
      </Link>
    </div>
  );
}
