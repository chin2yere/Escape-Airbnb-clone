import React from "react";
import { useState, useEffect, useContext } from "react";
//import { useContext } from "react";
import {
  ListingsContext,
  CategoryContext,
  TypeContext,
  BudgetContext,
  StartDateContext,
  EndDateContext,
} from "../../UserContext";
import "./Grid.css";
import ListingCard from "../ListingCard/ListingCard";

export default function Grid() {
  const { listingsContext, setListingsContext } = useContext(ListingsContext);
  const { startDateContext } = useContext(StartDateContext);
  const { endDateContext } = useContext(EndDateContext);
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
  function isAvailable(listing) {
    const bookedDays = { ...listing.booked_days };
    //console.log(bookedDays);
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
    var available = true;
    startDateContext != null &&
      endDateContext != null &&
      Object.entries(bookedDays).map(([key, value]) => {
        const start = new Date(key);
        const end = new Date(value);
        const startContext = new Date(startDateContext);
        const endContext = new Date(endDateContext);

        //console.log(start < startContext);

        if (
          lapLeft(start, end, startContext, endContext) ||
          lapRight(start, end, startContext, endContext) ||
          lapIn(start, end, startContext, endContext) ||
          lapOut(start, end, startContext, endContext)
        ) {
          available = false;
        }
      });
    return available;
  }
  //listingsContext && WhatToParse();
  //console.log(listingsContext);
  return (
    <div className="grid-container">
      {listingsContext &&
        WhatToParse().map(
          (listing) =>
            isAvailable(listing) && (
              <ListingCard
                key={listing.id}
                id={listing.id}
                location={listing.location}
                name={listing.name}
                price={listing.price_per_night}
                type={listing.type}
                reviews={listing.reviews}
                picture={listing.photo_gallery}
              />
            )
        )}
    </div>
  );
}
