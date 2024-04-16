import React from "react";
import Stack from "react-bootstrap/esm/Stack";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

//this is the ratings category underneath the listing details page
export default function ListingDetailsRatings({ reviews }) {
  let totalRating = 0;
  const [users, setUsers] = useState([]);
  // this useeffect fetches the people who rated
  useEffect(() => {
    const fetchUsers = async (id) => {
      try {
        const url = `http://localhost:3000/users`;
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch user failed: " + error);
      }
    };
    fetchUsers();
  }, []);

  console.log(users);
  function getRating() {
    //this function gets the rating that this user gave
    let rating = 0; //initialize a rating variable
    const size = reviews.length;

    const reviewElements = reviews.map((review) => {
      rating += review.Rating;
      let user = {};
      users.map((item) => {
        //search through the users
        if (item.id == review.User_id) {
          //check if the user gave the current rating
          user = item;
        }
      });

      //now we have the user and we can display the button
      console.log(user);
      return (
        <Stack
          key={user.id}
          style={{ marginTop: "10px" }}
          direction="horizontal"
          gap={3}
        >
          <div className="p-2">
            <CgProfile style={{ fontSize: "40px" }} />
          </div>

          <div className="p-2" style={{ textAlign: "left" }}>
            <h5>
              {user.name}&nbsp;&nbsp; {review.Rating} <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </h5>
            <p>{user.intro}</p>
          </div>
          <Link to="/chat" state={{ ownerName: user.name, ownerId: user }}>
            <Button>Chat with {user.name}</Button>
          </Link>
        </Stack>
      );
    });
    totalRating = (rating / size).toFixed(2);
    return reviewElements;
  }

  return (
    <div key={new Date()}>
      <h2>Reviews</h2>
      {reviews && getRating()}
      <h5>Total rating: {totalRating}</h5>
    </div>
  );
}
