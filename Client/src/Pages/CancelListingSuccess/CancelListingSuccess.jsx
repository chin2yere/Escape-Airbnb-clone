import React from "react";
import { useNavigate } from "react-router-dom";
//import { useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
//import { ListingsContext } from "../../UserContext";

export default function CancelListingSuccess() {
  //const { setListingsContext } = useContext(ListingsContext);

  const navigate = useNavigate();
  const sendEmail = async () => {
    try {
      const url = `http://localhost:3000/email/cancel`;
      const response = await fetch(url);
    } catch (error) {
      // Handle any network or API request errors
      alert("email failed: " + error);
    }
  };

  return (
    <div>
      <h6>You have successfully cancelled</h6>
      <Button
        onClick={() => {
          sendEmail();
          navigate("/");
        }}
      >
        Go home
      </Button>
    </div>
  );
}
