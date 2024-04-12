import React from "react";
import { useNavigate } from "react-router-dom";
//import { useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
//import { ListingsContext } from "../../UserContext";

export default function CancelListingSuccess() {
  //const { setListingsContext } = useContext(ListingsContext);

  const navigate = useNavigate();

  return (
    <div>
      <h6>You have successfully cancelled</h6>
      <Button onClick={() => navigate("/")}>Go home</Button>
    </div>
  );
}
