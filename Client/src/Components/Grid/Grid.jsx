import React from "react";
import { useState, useEffect, useContext } from "react";
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

//this component is the grid on the home page
export default function Grid() {
  const { listingsContext, setListingsContext } = useContext(ListingsContext);
  const { startDateContext } = useContext(StartDateContext);
  const { endDateContext } = useContext(EndDateContext);
  const { categoryContext } = useContext(CategoryContext);
  const { budgetContext } = useContext(BudgetContext);
  const { typeContext } = useContext(TypeContext);

  useEffect(() => {
    //this useeffect fetches all available listings from the database
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
    //this function filters all the listings based on users input
    function checkType(bedroomsNo) {
      //this function filters based on property type any, all or entire house
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
      //this function filters based on budget
      return price <= budgetContext;
    }
    const searchByCategory = listingsContext.filter((listing) => {
      const category = listing["type"];

      if (categoryContext[category] == true) {
        //check for category first
        return (
          checkType(listing["bedrooms"]) &&
          checkBudget(listing["price_per_night"])
        );
      } else {
        return false;
      }
    });

    return searchByCategory;
  }
  function isAvailable(listing) {
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
    var available = true;
    startDateContext != null &&
      endDateContext != null &&
      Object.entries(bookedDays).map(([key, value]) => {
        const start = new Date(key);
        const end = new Date(value[0]);
        const startContext = new Date(startDateContext);
        const endContext = new Date(endDateContext);

        if (
          lapLeft(start, end, startContext, endContext) ||
          lapRight(start, end, startContext, endContext) ||
          lapIn(start, end, startContext, endContext) ||
          lapOut(start, end, startContext, endContext)
        ) {
          available = false;
        }
      }); // search through each of the booked days and see if there's any overlap
    return available;
  }

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
