import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ListingDetailsImage from "../../Components/ListingDetailsImage/ListingDetailsImage";
import ListingDetailsCheckout from "../../Components/ListingDetailsCheckout/ListingDetailsCheckout";
import ListingDetailsInfo from "../../Components/ListingDetailsInfo/ListingDetailsInfo";
import ListingDetailsRatings from "../../Components/ListingDetailsRatings/ListingDetailsRatings";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
export default function ListingDetails() {
  const [listing, setListing] = useState({});
  const location = useLocation();
  const Id_data = location.state; // Access the passed props
  const Id = Id_data.listingId;
  //console.log(Id);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const url = `http://localhost:3000/listing/${"id"}/${Id}`;
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
  console.log(listing);
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <h3>{listing.name}</h3>
        </div>
        <div className="p-2 ms-auto">Share</div>
        <div className="p-2">Save</div>
      </Stack>
      <ListingDetailsImage />
      <Container>
        <Row>
          <Col style={{ width: "60%" }}>
            <ListingDetailsInfo
              name={listing.name}
              bedrooms={listing.bedrooms}
              reviews={listing.reviews}
              host_id={listing.host}
              about={listing.about}
              amenities={listing.amenities}
              location={listing.location}
              type={listing.type}
            />
          </Col>
          <Col style={{ width: "40%" }}>
            <ListingDetailsCheckout
              price={listing.price_per_night}
              bookedDays={listing.booked_days}
            />
          </Col>
        </Row>
      </Container>
      <hr />
      <ListingDetailsRatings />
    </div>
  );
}