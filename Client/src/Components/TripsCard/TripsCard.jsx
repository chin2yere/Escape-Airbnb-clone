import React from "react";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";

//this function is used to display wishlists, upcoming and past trips
export default function TripsCard({ id, payment, from, to, type, index }) {
  const { userContext, setUserContext } = useContext(UserContext);
  const [listing, setListing] = useState({});
  const navigate = useNavigate();
  //the useeffect fetches the listing
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
  //Button to display
  function displayButton() {
    //the type of button to be displayed is determined by the usecase of the trips card
    if (type == "wishlist") {
      return (
        <Button
          onClick={() => {
            handleUpdateWishlist();
          }}
        >
          Remove
        </Button>
      );
    } else if (type == "future") {
      return <Button onClick={() => handleCancelTrip()}>Cancel</Button>;
    } else {
      return <div></div>;
    }
  }
  //This function removes from wishlists
  const handleUpdateWishlist = async (e) => {
    //e.preventDefault();
    //the following set of code created an updated wishlist with the listing removed
    const currentUserWishlist = [...userContext.wishlists];
    const Temp = currentUserWishlist[index];
    const Temp2 = { ...Temp.list };
    Temp2[id] = [];
    Temp["list"] = { ...Temp2 };
    currentUserWishlist[index] = Temp;
    //console.log(currentUserWishlist);
    try {
      // Make the update wishlist API request

      const response = await fetch(
        `http://localhost:3000/user/${userContext.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: userContext.username,
            Password: userContext.password,
            Name: userContext.name,
            Upcoming_trips: userContext.upcoming_trips,
            Past_trips: userContext.past_trips,
            Wishlists: currentUserWishlist,
            Address: userContext.address,
            Language: userContext.language,
            Intro: userContext.intro,
            Chats: userContext.chats,
            Work: userContext.work,
            Picture_url: userContext.picture_url,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        console.log(data);
        setUserContext(data);
        navigate("/wishlists");
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  //this function remove from booked days in the listing table
  const handleRemove = async (start, listing) => {
    //e.preventDefault();
    //create an updated bookedDays
    const currentUserBookedDays = { ...listing.booked_days };
    delete currentUserBookedDays[start];

    try {
      const response = await fetch(
        `http://localhost:3000/listing/${listing.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: listing.name,
            Location: listing.location,
            Pin: listing.pin,
            Price_per_night: listing.price_per_night,
            Type: listing.type,
            Reviews: listing.reviews,
            Host: listing.host,
            About: listing.about,
            Bedrooms: listing.bedrooms,
            Amenities: listing.amenities,
            Booked_days: currentUserBookedDays,
            Photo_gallery: listing.photo_gallery,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        navigate("/cancel/success");
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  //this function is to remove from upcoming trips
  const handleCancelTrip = async (e) => {
    //e.preventDefault();
    const currentUserUpcomingTrips = [...userContext.upcoming_trips];
    const whatToDelete = { ...currentUserUpcomingTrips[index] };
    currentUserUpcomingTrips[index] = {};

    const startDate = whatToDelete.From;

    try {
      // Make the update user API request

      const response = await fetch(
        `http://localhost:3000/user/${userContext.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: userContext.username,
            Password: userContext.password,
            Name: userContext.name,
            Upcoming_trips: currentUserUpcomingTrips,
            Past_trips: userContext.past_trips,
            Wishlists: userContext.wishlists,
            Address: userContext.address,
            Language: userContext.language,
            Intro: userContext.intro,
            Chats: userContext.chats,
            Work: userContext.work,
            Picture_url: userContext.picture_url,
          }),
          credentials: "include",
        }
      );
      //console.log(response)

      if (response.ok) {
        // Navigate to the business page after successful login
        const data = await response.json();
        //console.log(data);
        //const fine = data[0];
        console.log(data);
        setUserContext(data);
        handleRemove(startDate, listing); //then remove from listing booked days
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  return (
    <div>
      <Card
        style={{
          margin: "40px",
          borderStyle: "double",
          borderRadius: "20px",

          borderColor: "rgba(227, 80, 124)",
        }}
      >
        <Row>
          <Col style={{ width: "40%" }}>
            <Link to={`/listing/${id}`} state={{ listingId: id }}>
              <Image
                src="https://thumbs.dreamstime.com/b/ready-summer-vacation-travel-background-d-rendering-114574299.jpg"
                fluid
              ></Image>
            </Link>
          </Col>

          <Col style={{ width: "50%" }}>
            <h6>{listing.name}</h6>
            <p>{listing.location}</p>
            <p>{listing.type}</p>
            <p>Payment: ${payment}</p>
            <p>From: {from}</p>
            <p>To: {to}</p>
            {displayButton()}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
