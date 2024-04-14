import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ListingsContext } from "../../UserContext";

export default function Roomates() {
  const { listingsContext } = useContext(ListingsContext);
  console.log(listingsContext);
  //const [sameHouse, setSameHouse] = useState([]);
  const [listingLocation, setListingLocation] = useState([]);
  const location = useLocation();
  const Id_data = location.state; // Access the passed props
  const Id = Id_data.listingId;
  const startDate = Id_data.startDate;
  const endDate = Id_data.endDate;
  //console.log(startDate);
  useEffect(() => {
    //let listingLocation = {};
    const fetchListing = async () => {
      try {
        const url = `http://localhost:3000/listing/${"id"}/${Id}`;
        const response = await fetch(url);
        const data = await response.json();
        setListingLocation(data.pin);
        //listingLocation = { ...data.pin };
        //console.log(data.pin);
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch Listing failed: " + error);
      }
    };

    fetchListing();

    //fetchAllListings();
  }, []);
  if (listingLocation) {
    const sameHouse = listingsContext.filter((listing) => {
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
    console.log(sameHouse);
  }

  return (
    <div>
      <h1>Hiiiiiii</h1>
    </div>
  );
}
