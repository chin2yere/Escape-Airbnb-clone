import React from "react";
import { useEffect, useContext } from "react";
//import { useContext } from "react";
import { ListingsContext } from "../../UserContext";
import "./Grid.css";
import ListingCard from "../ListingCard/ListingCard";

export default function Grid() {
  const { listingsContext, setListingsContext } = useContext(ListingsContext);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const url = `http://localhost:3000/listings`;
        const response = await fetch(url);
        const data = await response.json();
        setListingsContext(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch Listing failed: " + error);
      }
    };
    fetchListings();
  }, []);
  console.log(listingsContext);
  return (
    <div className="grid-container">
      {listingsContext &&
        listingsContext.map((listing) => (
          <ListingCard
            key={listing.id}
            location={listing.location}
            name={listing.name}
            price={listing.price_per_night}
            type={listing.type}
            reviews={listing.reviews}
          />
        ))}
    </div>
  );
}
