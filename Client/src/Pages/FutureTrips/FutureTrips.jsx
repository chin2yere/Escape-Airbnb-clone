import React from "react";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TripsCard from "../../Components/TripsCard/TripsCard";
import Button from "react-bootstrap/esm/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function FutureTrips() {
  const { userContext } = useContext(UserContext);
  //const {listingContext} = useContext(ListingsContext)
  const upcoming = [...userContext.upcoming_trips];
  function getDays(date) {
    const today = new Date();

    const checkIn = new Date(date);
    const seconds = checkIn - today;
    //console.log(checkIn);
    const days = Math.ceil(seconds / (1000 * 60 * 60 * 24));
    return days;
  }
  if (upcoming) {
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
        <h4 style={{ color: "rgba(227, 80, 124)" }}>Where you're going</h4>
        <br />
        <br />
        {upcoming.map((entry, index) => {
          if (Object.keys(entry).length != 0) {
            return (
              <div key={entry.Listing_id}>
                <h3> In {getDays(entry.From)} days</h3>
                <Link
                  to="/roomates"
                  state={{
                    listingId: entry.Listing_id,
                    startDate: entry.From,
                    endDate: entry.To,
                  }}
                >
                  <Button>View roomates</Button>
                </Link>

                <TripsCard
                  id={entry.Listing_id}
                  payment={entry.Payment}
                  from={entry.From}
                  to={entry.To}
                  type={"future"}
                  index={index}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }
}
