import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//this is the card that displays the available roomate
export default function RoomateCard({ ComeDate, LeaveDate, roomateId }) {
  const [roomate, setRoomate] = useState({});
  useEffect(() => {
    const fetchRoomate = async () => {
      //this function fetches the roomate
      try {
        const url = `http://localhost:3000/user/${"id"}/${roomateId}`;
        const response = await fetch(url);
        const data = await response.json();
        setRoomate(data);
        console.log(data);
      } catch (error) {
        // Handle any network or API request errors
        alert("Fetch Listing failed: " + error);
      }
    };
    roomateId && fetchRoomate();
  }, []);
  return (
    <Card
      style={{
        width: "28rem",
        padding: "20px",
        margin: "30px",
        borderStyle: "double",
        borderRadius: "20px",
        backgroundColor: "rgba(227, 80, 124, 0.597)",

        borderColor: "rgba(227, 80, 124)",
      }}
    >
      <h4>Name : {roomate.name}</h4>
      <h5>Arrival : {ComeDate}</h5>
      <h5>Depature : {LeaveDate}</h5> <br />
      <Link to="/chat" state={{ ownerName: roomate.name, ownerId: roomate }}>
        <Button>Chat with {roomate.name}</Button>
      </Link>
    </Card>
  );
}
