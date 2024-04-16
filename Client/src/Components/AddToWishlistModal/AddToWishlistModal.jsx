import React from "react";

import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineHeart } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { AiFillHeart } from "react-icons/ai";
import {
  UserContext,
  StartDateContext,
  EndDateContext,
} from "../../UserContext";
import Card from "react-bootstrap/Card";

function MyVerticallyCenteredModal({ id, wishlist, ...rest }) {
  //declare all necessary variables
  const { userContext, setUserContext } = useContext(UserContext);
  const { startDateContext } = useContext(StartDateContext);
  const { endDateContext } = useContext(EndDateContext);
  console.log(startDateContext);
  const [wishlistName, setWishlistName] = useState("");

  //update the server
  const handleUpdate = async (wishlistName, id) => {
    const temp = [...wishlist]; //create a new variable you can tamper with
    //e.preventDefault();
    //This function checks whether or not the user selects an existing wishlist
    //or creates a new one
    function calculateNewWishlist(wishlistName, id) {
      //First initialize an appropriate string from the start date
      const startDatePre = new Date(startDateContext);
      const year = startDatePre.getFullYear();
      const month = String(startDatePre.getMonth() + 1).padStart(2, "0"); // Extract and format month
      const day = String(startDatePre.getDate()).padStart(2, "0");
      const startDate = `${year}-${month}-${day}`;
      //Then initialize an appripriate string for the end date
      const endDatePre = new Date(endDateContext);
      const year1 = endDatePre.getFullYear();
      const month1 = String(endDatePre.getMonth() + 1).padStart(2, "0"); // Extract and format month
      const day1 = String(endDatePre.getDate()).padStart(2, "0");
      const endDate = `${year1}-${month1}-${day1}`;

      //then initialize a boolean called found and check to see if it exists as a wishlist in the database

      let found = false;

      for (let i = 0; i < temp.length; i++) {
        let wishlist1 = { ...temp[i] }; //create a variable you can tamper with
        console.log("wishlist1 ", wishlist1);
        if (wishlist1.Name == wishlistName) {
          found = true;
          let listings = { ...wishlist1.list };
          listings[id] = [startDate, endDate];
          wishlist1["list"] = { ...listings };
          temp[i] = { ...wishlist1 };

          break;
        }

        //if it isn't found, add it as a new entry in the wishlist
      }
      if (found == false) {
        console.log(id);
        let check = {};
        check[id] = [startDate, endDate];
        const newEntry = {
          Name: wishlistName,
          list: check,
        };
        temp.push(newEntry);
      }
      console.log(temp);
    }

    try {
      // Make the update user API request
      calculateNewWishlist(wishlistName, id); //call the function you just defined

      const response = await fetch(
        `http://localhost:3000/user/${userContext.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: userContext.username,
            Password: userContext.password,
            Name: userContext.name,
            Upcoming_trips: userContext.upcoming_trips,
            Past_trips: userContext.past_trips,
            Wishlists: temp,
            Address: userContext.address,
            Language: userContext.language,
            Intro: userContext.intro,
            Chats: userContext.chats,
            Work: userContext.work,
            Picture_url: userContext.picture_url,
          }),
          credentials: "include",
        }
      );
      //console.log(response)

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserContext(data);
        rest.onHide();
      } else {
        // Handle the create failure case
        alert("creation failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  function wishlistList() {
    //map through the wishlists to display the buttons
    return wishlist.map((wishlist) => {
      return (
        <div key={wishlist.Name}>
          <Button
            onClick={() => handleUpdate(wishlist.Name, id)}
            style={{ margin: "10px" }}
          >
            {wishlist.Name}
          </Button>
        </div>
      );
    });
  }
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add to Wishlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Please select an option</h5>
        <div>
          {wishlistList()}
          <p>Or create a new wishlist</p>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Enter name</Form.Label>
              <Form.Control
                required
                type="username"
                value={wishlistName}
                onChange={(e) => setWishlistName(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button
            onClick={() => handleUpdate(wishlistName, id)}
            style={{ margin: "10px" }}
          >
            Create new wishlist
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={rest.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AddToWishlistModal({ Id }) {
  const [modalShow, setModalShow] = React.useState(false);
  const { userContext } = useContext(UserContext);
  const wishlist = [...userContext.wishlists];
  function whatHeart() {
    //this function tells what heart to display depending on whether or not the listing is already on the wishlist
    let isThere = false;
    wishlist.map((wishlist) => {
      const list = { ...wishlist.list };
      if (list[Id] && list[Id].length != 0) {
        isThere = true;
      }
    });
    if (isThere == true) {
      return <AiFillHeart />;
    } else {
      return <AiOutlineHeart />;
    }
  }

  return (
    <>
      <Button
        variant="primary"
        style={{ backgroundColor: "rgba(227, 80, 124)" }}
        onClick={() => setModalShow(true)}
      >
        {whatHeart()}
      </Button>

      <MyVerticallyCenteredModal
        id={Id}
        wishlist={wishlist}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
