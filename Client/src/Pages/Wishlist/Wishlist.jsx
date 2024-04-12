import React from "react";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import WishlistCard from "../../Components/WishlistCard/WishlistCard";
import Button from "react-bootstrap/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Wishlist() {
  const { userContext } = useContext(UserContext);
  const wishlist = [...userContext.wishlists];
  console.log(userContext);
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
      <h3>Your saved searches</h3>
      {wishlist.map((wishlist, index) => {
        return (
          <WishlistCard wishlist={wishlist} key={wishlist.Name} index={index} />
        );
      })}
    </div>
  );
}
