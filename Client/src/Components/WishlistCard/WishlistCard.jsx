import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//this function dispays the wishlist card
export default function WishlistCard({ wishlist, index }) {
  return (
    <Link to="/wish/list" state={{ wishlist, index }}>
      <Card
        style={{
          width: "18rem",
          height: "100px",
          margin: "40px",
          borderStyle: "double",
          borderRadius: "20px",
          backgroundColor: "rgba(227, 80, 124, 0.597)",

          borderColor: "rgba(227, 80, 124)",
        }}
        className="mb-2"
      >
        <h6>{wishlist.Name}</h6>
      </Card>
    </Link>
  );
}
