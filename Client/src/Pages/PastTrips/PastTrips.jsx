import React from "react";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TripsCard from "../../Components/TripsCard/TripsCard";
import Button from "react-bootstrap/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";

//this is the past trips page
export default function PastTrips() {
  const { userContext } = useContext(UserContext);

  const past = [...userContext.past_trips]; //create a variable to store the users past trips

  if (past) {
    return (
      <div>
        <Link to="/usermenu">
          <Button
            style={{
              backgroundColor: "rgba(227, 80, 124)",
              marginBottom: "20px",
            }}
          >
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <h4 style={{ color: "rgba(227, 80, 124)" }}>Where you've been</h4>
        <br />
        <br />
        {past.map((entry) => {
          return (
            <TripsCard
              id={entry.Listing_id}
              payment={entry.Payment}
              from={entry.From}
              to={entry.To}
              key={entry.Listing_id}
              type={"past"}
            />
          );
        })}
      </div>
    );
  }
}
