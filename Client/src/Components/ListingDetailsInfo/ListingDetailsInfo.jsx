import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { GiFlamedLeaf } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsDoorOpen } from "react-icons/bs";
import { GoSponsorTiers } from "react-icons/go";
import { BsCalendar2Check } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";

//this component renders the info on the left side of the listing details page
export default function ListingDetailsInfo({
  name,
  bedrooms,
  reviews,
  host_id,
  about,
  amenities,
  location,
  type,
}) {
  const [host, setHost] = useState({});
  //the useeffect fetches the host from the database
  useEffect(() => {
    const fetchHost = async () => {
      try {
        const url = `http://localhost:3000/user/${"id"}/${host_id}`;
        const response = await fetch(url);
        const data = await response.json();
        setHost(data);
        console.log(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch Listing failed: " + error);
      }
    };
    host_id && fetchHost();
  }, [name]);

  //this function calculates the rating to be displayed
  function getRating() {
    let rating = 0;
    const size = reviews.length;

    reviews.map((review) => {
      rating += review.Rating;
    });
    return (rating / size).toFixed(2);
  }

  return (
    <div style={{ textAlign: "left", marginTop: "35px" }}>
      <h4>
        {type} in {location}
      </h4>
      <p>
        1 {type} | {bedrooms} bedroom | {bedrooms} bed | {bedrooms} bath
      </p>
      <br />
      <div
        style={{
          width: "700px",
          padding: "10px",
          borderStyle: "solid",
          borderRadius: "8px",
          borderWidth: "1px",
        }}
      >
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <GiFlamedLeaf style={{ fontSize: "24px" }} />

            <h6>Guest Favorites</h6>
          </div>
          <div className="p-2">
            One of The most loved homes on airbnb
            <br />
            according to guests
          </div>
          <div className="p-2 ms-auto">
            {" "}
            <h4>{reviews && getRating()}</h4>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <div className="vr" />
          <div className="p-2">
            <h4>{reviews && reviews.length}</h4>Reviews
          </div>
        </Stack>
      </div>
      <Stack style={{ marginTop: "10px" }} direction="horizontal" gap={3}>
        <div className="p-2">
          <CgProfile style={{ fontSize: "60px" }} />
        </div>

        <div className="p-2">
          <h6>Hosted by {host.name}</h6>
          <p>{host.intro}</p>
          <Link to="/chat" state={{ ownerName: host.name, ownerId: host }}>
            <Button>Chat with host</Button>
          </Link>
        </div>
      </Stack>
      <hr />
      <Stack style={{ marginTop: "10px" }} direction="horizontal" gap={3}>
        <div className="p-2">
          <BsDoorOpen style={{ fontSize: "20px" }} />
        </div>

        <div className="p-2">
          <h6>Self check-in</h6>
          <p>Check yourself in with the keypad.</p>
        </div>
      </Stack>
      <Stack style={{ marginTop: "10px" }} direction="horizontal" gap={3}>
        <div className="p-2">
          <GoSponsorTiers style={{ fontSize: "20px" }} />
        </div>

        <div className="p-2">
          <h6>{host.name} is a Superhost</h6>
          <p>Superhosts are experienced, highly rated Hosts.</p>
        </div>
      </Stack>
      <Stack style={{ marginTop: "10px" }} direction="horizontal" gap={3}>
        <div className="p-2">
          <BsCalendar2Check style={{ fontSize: "20px" }} />
        </div>

        <div className="p-2">
          <h6>Free cancellation Within 30 days</h6>
        </div>
      </Stack>
      <hr />
      <p>{about}</p>
      <p>
        Things to know <br /> House rules : Check-in after 3:00 PM, Checkout
        before 11:00 AM.
      </p>{" "}
      <hr />
      <h5>What this place offers</h5>
      <ListGroup as="ol" numbered>
        {amenities &&
          amenities.map((amenity) => {
            return (
              <ListGroup.Item key={amenity} as="li">
                {amenity}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
}
