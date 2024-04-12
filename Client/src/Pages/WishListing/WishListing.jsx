import React from "react";

import { Link, useLocation } from "react-router-dom";
import TripsCard from "../../Components/TripsCard/TripsCard";
import Button from "react-bootstrap/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Wishlisting() {
  const location = useLocation();
  const wish_data = location.state; // Access the passed props
  const wishlist = { ...wish_data.wishlist };
  const list = { ...wishlist.list };
  const index = wish_data.index;
  //console.log(index);
  if (wishlist) {
    return (
      <div>
        <Link to="/wishlists">
          <Button
            style={{
              backgroundColor: "rgba(227, 80, 124)",
              marginBottom: "20px",
            }}
          >
            <AiOutlineArrowLeft />
          </Button>
        </Link>
        <h4 style={{ color: "rgba(227, 80, 124)" }}>{wishlist.Name}</h4>
        <br />
        <br />

        {Object.entries(list).map(([key, value]) => {
          if (value.length != 0) {
            return (
              <TripsCard
                id={key}
                payment={"to be calculated"}
                from={value[0]}
                to={value[1]}
                key={key}
                type={"wishlist"}
                index={index}
              />
            );
          }
        })}
      </div>
    );
  }
}
