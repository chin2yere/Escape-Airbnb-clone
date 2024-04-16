import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Button from "react-bootstrap/Button";
import ProfileModal from "../../Components/ProfileModal/ProfileModal";
export default function Profile() {
  const { userContext, setUserContext } = useContext(UserContext);

  //this is the user profile page
  return (
    <div
      style={{
        textAlign: "left",
        borderStyle: "double",
        borderRadius: "20px",
        padding: "30px",
        borderColor: "rgba(227, 80, 124)",
      }}
    >
      <Link to="/usermenu">
        <Button
          style={{
            backgroundColor: "rgba(227, 80, 124)",
            marginBottom: "20px",
          }}
        >
          Back
        </Button>
      </Link>

      <h4>User Profile</h4>
      <h6>Welcome {userContext.username}</h6>
      <p>
        Escape is truly fortunate to have you as a customer. Your dedication to
        fostering memorable experiences and maintaining the highest standards of
        hospitality sets you apart. Your commitment to clear communication,
        reliability, and adherence to guidelines ensures a seamless booking
        process. Your appreciation for diverse cultures enriches every Escape
        experience. Your conscientious approach to property care reflects
        positively on Escape's reputation. Your constructive feedback and
        insightful suggestions continuously elevate the Escape experience. You
        are a valued member of the Escape community, enhancing the collective
        experience for all involved.
      </p>
      <p>Username: {userContext.username}</p>

      <p>Name: {userContext.name}</p>
      <p>Address: {userContext.address}</p>
      <p>Language: {userContext.language}</p>
      <p>Intro : {userContext.intro}</p>
      <p>Work: {userContext.work}</p>
      <ProfileModal />
    </div>
  );
}
