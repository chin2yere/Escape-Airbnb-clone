import React from "react";
import { useState, useEffect, useContext } from "react";
//import { useContext } from "react";
import {
  ListingsContext,
  CategoryContext,
  TypeContext,
  BudgetContext,
} from "../../UserContext";
import "./Grid.css";
import ListingCard from "../ListingCard/ListingCard";

export default function Grid() {
  const { listingsContext, setListingsContext } = useContext(ListingsContext);
  //const [parsedListing, setParsedListing] = useState([]);
  const { categoryContext } = useContext(CategoryContext);
  const { budgetContext } = useContext(BudgetContext);
  const { typeContext } = useContext(TypeContext);

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
  function WhatToParse() {
    function checkType(bedroomsNo) {
      if (typeContext == "All") {
        return true;
      } else {
        return (
          (typeContext == "Room" && bedroomsNo == 1) ||
          (typeContext != "Room" && bedroomsNo != 1)
        );
      }
    }
    function checkBudget(price) {
      return price <= budgetContext;
    }
    const searchByCategory = listingsContext.filter((listing) => {
      const category = listing["type"];

      if (categoryContext[category] == true) {
        return (
          checkType(listing["bedrooms"]) &&
          checkBudget(listing["price_per_night"])
        );
      } else {
        return false;
      }
    });
    //console.log(searchByCategory);
    return searchByCategory;
  }
  //listingsContext && WhatToParse();
  //console.log(listingsContext);
  return (
    <div className="grid-container">
      {listingsContext &&
        WhatToParse().map((listing) => (
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
