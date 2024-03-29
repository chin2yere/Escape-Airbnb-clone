import React from "react";
import { useState } from "react";
import "./Login.css";
import LoginModal from "../../Components/LoginModal/LoginModal";
import LoginCarousel from "../../Components/LoginCarousel/LoginCarousel";
import Card from "react-bootstrap/Card";
export default function Login() {
  return (
    <>
      <Card>
        <LoginCarousel />
        <br />
        <br />
        <LoginModal />
      </Card>
    </>
  );
}
