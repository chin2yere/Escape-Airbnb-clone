import React from "react";
import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();
  if (!paid) {
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
        <h4>The Checkout page</h4>
        <p>
          Welcome to our Escape listing! We're thrilled that you're considering
          staying with us. Whether you're planning a relaxing getaway, a
          business trip, or an adventure-filled vacation, we aim to make your
          stay unforgettable. Our cozy and stylish room is designed with your
          comfort in mind. From plush bedding to thoughtful amenities, we've
          thought of everything to ensure you feel right at home. Plus, you'll
          have access to all the conveniences you need, including high-speed
          Wi-Fi, a fully equipped kitchen, and a clean and spacious bathroom.
          Our Escape is situated in the heart of the city, close to all the best
          attractions, restaurants, and entertainment options. Whether you're
          exploring the vibrant downtown area or taking a leisurely stroll in
          the nearby parks, you'll love the convenience of our central location.
          Booking with us is easy! Simply select your desired dates, check
          availability, and complete your reservation by paying below. Have any
          questions or special requests? Don't hesitate to reach out to us,
          we're here to ensure your stay is perfect from start to finish. We
          can't wait to welcome you to our Escape and help you create memories
          that will last a lifetime. Reserve your room today and get ready for
          an unforgettable experience!
        </p>
        <div>
          <h5>Enter Payment information</h5>
          <br />
          <Form>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                <FloatingLabel
                  controlId="Card number"
                  label="Card Number"
                  className="mb-3"
                >
                  <Form.Control
                    style={{ width: "530px" }}
                    type="number"
                    pattern="[0-9]*"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </div>
              <div className="p-2 ms-auto">
                <FloatingLabel
                  controlId="Expiry"
                  label="Expiry date"
                  className="mb-3"
                >
                  <Form.Control
                    style={{ width: "130px" }}
                    type="text" // Change type to "text"
                    maxLength={5}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </div>
              <div className="p-2">
                <FloatingLabel controlId="cvv" label="CVV" className="mb-3">
                  <Form.Control
                    style={{ width: "60px" }}
                    type="password"
                    maxLength={3}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </div>
            </Stack>
          </Form>
        </div>
        <Button onClick={() => setPaid(true)}>Proceed to book</Button>
      </div>
    );
  } else {
    return (
      <div>
        <h4>Payment successful</h4>
        <p>You are booked for your trip</p>
        <Button onClick={() => navigate("/")}>Click here to continue</Button>
      </div>
    );
  }
}
