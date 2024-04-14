import React from "react";
import { useState, useEffect, useContext } from "react";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import {
  UserContext,
  StartDateContext,
  EndDateContext,
} from "../../UserContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const payment_data = location.state; // Access the passed props
  const cost = payment_data.cost;
  const id = payment_data.id;
  const bookedDays = payment_data.bookedDays;
  const { userContext, setUserContext } = useContext(UserContext);
  const { startDateContext } = useContext(StartDateContext);
  const { endDateContext } = useContext(EndDateContext);
  const [paid, setPaid] = useState(false);
  const [listing, setListing] = useState({});
  const navigate = useNavigate();
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
  //Add from booked days
  const handleAdd = async (start, end, listing) => {
    //e.preventDefault();

    const currentUserBookedDays = { ...listing.booked_days };
    //console.log(currentUserBookedDays);
    const tempSecond = userContext.id;
    const tempThird = tempSecond.toString();

    currentUserBookedDays[start] = [end, tempThird];

    //console.log(currentUserBookedDays);

    try {
      // Make the create product API request
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
      //console.log(response)
      if (response.ok) {
        // Navigate to the business page after successful login
        const data = await response.json();

        console.log(data);
        setPaid(true);
        //const fine = data[0];
        //console.log(data);
        //setUserContext(data);
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  //add to upcoming trips
  const handleBookTrip = async (e) => {
    //e.preventDefault();
    const startDatePre = new Date(startDateContext);

    const year = startDatePre.getFullYear();
    const month = String(startDatePre.getMonth() + 1).padStart(2, "0"); // Extract and format month
    const day = String(startDatePre.getDate()).padStart(2, "0");

    const tempStart = `${year}-${month}-${day}`;
    //end date
    const endDatePre = new Date(endDateContext);

    const year1 = endDatePre.getFullYear();
    const month1 = String(endDatePre.getMonth() + 1).padStart(2, "0"); // Extract and format month
    const day1 = String(endDatePre.getDate()).padStart(2, "0");

    const tempEnd = `${year1}-${month1}-${day1}`;
    let entryToAdd = {};
    entryToAdd["Listing_id"] = id.toString();
    entryToAdd["Payment"] = parseInt(cost);
    entryToAdd["From"] = tempStart;
    entryToAdd["To"] = tempEnd;

    const currentUserUpcomingTrips = [
      ...userContext.upcoming_trips,
      entryToAdd,
    ];
    console.log(currentUserUpcomingTrips);

    //console.log(currentUserUpcomingTrips);

    try {
      // Make the create product API request

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
        handleAdd(tempStart, tempEnd, listing);
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  const sendEmail = async () => {
    try {
      const url = `http://localhost:3000/email/book`;
      const response = await fetch(url);
    } catch (error) {
      // Handle any network or API request errors
      alert("email failed: " + error);
    }
  };
  if (!paid) {
    return (
      <div
        style={{
          textAlign: "left",
          borderStyle: "double",
          borderRadius: "20px",
          padding: "30px",
          borderColor: "rgba(227, 80, 124)",
        }}
      >
        <h4>The Checkout page</h4>
        <p>
          Welcome to our Escape listing! We're thrilled that you're considering
          staying with us. Whether you're planning a relaxing getaway, a
          business trip, or an adventure-filled vacation, we aim to make your
          stay unforgettable. Our cozy and stylish room is designed with your
          comfort in mind. From plush bedding to thoughtful amenities, we've
          thought of everything to ensure you feel right at home. Plus, you'll
          have access to all the conveniences you need, including high-speed
          Wi-Fi, a fully equipped kitchen, and a clean and spacious bathroom.
          Our Escape is situated in the heart of the city, close to all the best
          attractions, restaurants, and entertainment options. Whether you're
          exploring the vibrant downtown area or taking a leisurely stroll in
          the nearby parks, you'll love the convenience of our central location.
          Booking with us is easy! Simply select your desired dates, check
          availability, and complete your reservation by paying below. Have any
          questions or special requests? Don't hesitate to reach out to us,
          we're here to ensure your stay is perfect from start to finish. We
          can't wait to welcome you to our Escape and help you create memories
          that will last a lifetime. Reserve your room today and get ready for
          an unforgettable experience!
        </p>
        <div>
          <h6>Cost: {cost}</h6>
          <h5>Enter Payment information</h5>
          <br />
          <Form>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                <FloatingLabel
                  controlId="Card number"
                  label="Card Number"
                  className="mb-3"
                >
                  <Form.Control
                    style={{ width: "530px" }}
                    type="number"
                    pattern="[0-9]*"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </div>
              <div className="p-2 ms-auto">
                <FloatingLabel
                  controlId="Expiry"
                  label="Expiry date"
                  className="mb-3"
                >
                  <Form.Control
                    style={{ width: "130px" }}
                    type="text" // Change type to "text"
                    maxLength={5}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </div>
              <div className="p-2">
                <FloatingLabel controlId="cvv" label="CVV" className="mb-3">
                  <Form.Control
                    style={{ width: "60px" }}
                    type="password"
                    maxLength={3}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </div>
            </Stack>
          </Form>
        </div>
        <Button onClick={() => handleBookTrip()}>Proceed to book</Button>
      </div>
    );
  } else {
    return (
      <div>
        <h4>Payment successful</h4>
        <p>You are booked for your trip</p>
        <Button
          onClick={() => {
            sendEmail();
            navigate("/");
          }}
        >
          Click here to continue
        </Button>
      </div>
    );
  }
}
