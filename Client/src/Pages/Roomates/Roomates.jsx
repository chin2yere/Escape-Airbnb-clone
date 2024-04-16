import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListingsContext } from "../../UserContext";
import RoomateCard from "../../Components/RoomateCard/RoomateCard";
import Button from "react-bootstrap/esm/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";

//this is the home page for the roomate
export default function Roomates() {
  const { listingsContext } = useContext(ListingsContext);
  const [listingLocation, setListingLocation] = useState([]);
  const location = useLocation();
  const Id_data = location.state; // Access the passed props
  const Id = Id_data.listingId;
  const startDate = Id_data.startDate;
  const endDate = Id_data.endDate;
  //console.log(startDate);
  useEffect(() => {
    //fetch listing data
    const fetchListing = async () => {
      try {
        const url = `http://localhost:3000/listing/${"id"}/${Id}`;
        const response = await fetch(url);
        const data = await response.json();
        setListingLocation(data.pin); //get the location of the house
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch Listing failed: " + error);
      }
    };

    fetchListing();

    //fetchAllListings();
  }, []);
  if (listingLocation) {
    let ComeDate = "";
    let LeaveDate = "";
    let roomateId = "";
    const sameHouse = listingsContext.filter((listing) => {
      //run through all listings and find the ones in the same location/house
      const obj1 = { ...listing.pin };
      const keys1 = Object.keys(listing.pin);
      const keys2 = Object.keys(listingLocation);

      if (keys1.length !== keys2.length) {
        return false;
      }

      // Check if all keys and values are equal
      for (let key of keys1) {
        if (obj1[key] !== listingLocation[key]) {
          return false;
        }
      }
      return true;
    });

    //this function checks if there is any overlap between 2 date ranges
    function isLapping(listing) {
      const bookedDays = { ...listing.booked_days };

      function lapLeft(start, end, startDateContext, endDateContext) {
        if (
          startDateContext <= start &&
          endDateContext >= start &&
          endDateContext <= end
        ) {
          return true;
        } else {
          return false;
        }
      }
      function lapRight(start, end, startDateContext, endDateContext) {
        if (
          startDateContext >= start &&
          startDateContext <= end &&
          endDateContext >= end
        ) {
          return true;
        } else {
          return false;
        }
      }
      function lapIn(start, end, startDateContext, endDateContext) {
        if (startDateContext >= start && endDateContext <= end) {
          return true;
        } else {
          return false;
        }
      }
      function lapOut(start, end, startDateContext, endDateContext) {
        if (startDateContext <= start && endDateContext >= end) {
          return true;
        } else {
          return false;
        }
      }
      var doesItLap = false;
      startDate != null &&
        endDate != null &&
        Object.entries(bookedDays).map(([key, value]) => {
          const start = new Date(key);
          const end = new Date(value[0]);
          const startContext = new Date(startDate);
          const endContext = new Date(endDate);

          //check to see if there's any overlap

          if (
            lapLeft(start, end, startContext, endContext) ||
            lapRight(start, end, startContext, endContext) ||
            lapIn(start, end, startContext, endContext) ||
            lapOut(start, end, startContext, endContext)
          ) {
            ComeDate = key;
            LeaveDate = value[0];
            roomateId = value[1];
            doesItLap = true;
          }
          if (listing.id == Id) {
            doesItLap = false;
          }
        });
      return doesItLap;
    }

    return (
      <div>
        <Link to="/future/trips">
          <Button
            style={{
              backgroundColor: "rgba(227, 80, 124)",
              marginBottom: "20px",
            }}
          >
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <h5>View roomates list below</h5>
        {sameHouse.map((listing) => {
          return isLapping(listing) ? (
            <RoomateCard
              key={listing.id}
              ComeDate={ComeDate}
              LeaveDate={LeaveDate}
              roomateId={roomateId}
            />
          ) : null;
        })}
      </div>
    );
  }
}
