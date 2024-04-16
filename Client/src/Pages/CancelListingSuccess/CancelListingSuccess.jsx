import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

//this function is the success page after you cancel a reservation
export default function CancelListingSuccess() {
  const navigate = useNavigate();
  const sendEmail = async () => {
    //send cancellation email
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
