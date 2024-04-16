import React from "react";
import { useState } from "react";
import "./Login.css";
import LoginModal from "../../Components/LoginModal/LoginModal";
import LoginCarousel from "../../Components/LoginCarousel/LoginCarousel";
import Card from "react-bootstrap/Card";
import CreateUserModal from "../../Components/CreateUserModal/CreateUserModal";
export default function Login() {
  //this is the login page
  return (
    <>
      <Card>
        <LoginCarousel />
        <br />
        <br />
        <LoginModal />
        <CreateUserModal />
      </Card>
    </>
  );
}
