import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { StartDateContext, EndDateContext } from "../../UserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

//this component is the reserve card on the listing page
export default function ListingDetailsCheckout({ price, bookedDays, id }) {
  const { startDateContext, setStartDateContext } =
    useContext(StartDateContext);
  const { endDateContext, setEndDateContext } = useContext(EndDateContext);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  //this function calculates the number of days that you have booked for
  function calculateDays() {
    const start = new Date(startDateContext);
    const end = new Date(endDateContext);
    const seconds = end - start;
    const days = seconds / (1000 * 60 * 60 * 24);
    return days;
  }

  //this function calculates the total price

  const subtotal = numberOfGuests * price * calculateDays();
  const isValidDate = (date) => {
    var validity = true;

    Object.entries(bookedDays).map(([key, value]) => {
      const start = new Date(key);
      const end = new Date(value[0]);
      const today = new Date();
      if (date >= start && date <= end) {
        validity = false;
      }
    });
    return validity;
  };
  return (
    <Card
      style={{
        width: "31rem",
        boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
        marginTop: "20px",
      }}
    >
      <h4 style={{ textAlign: "left" }}>${price} per night</h4>
      <br />

      <Container
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "8px",
        }}
        fluid
      >
        <Row style={{ height: "60px" }}>
          <Col
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <DatePicker
              selected={startDateContext}
              onChange={(date) => {
                setStartDateContext(date);
                setEndDateContext(null);
              }}
              selectsStart
              startDate={startDateContext}
              endDate={endDateContext}
              minDate={new Date()}
              monthsShown={2}
              filterDate={isValidDate}
              style={{ width: "150px" }}
              className="form-control"
            />
          </Col>
          <Col
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            <DatePicker
              selected={endDateContext}
              onChange={(date) => setEndDateContext(date)}
              selectsEnd
              startDate={startDateContext}
              endDate={endDateContext}
              minDate={startDateContext}
              monthsShown={2}
              filterDate={isValidDate}
              className="form-control"
            />
          </Col>
        </Row>
        <Row
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            height: "50px",
          }}
        >
          <Form.Select
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          >
            <option value={1}> 1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
            <option value={6}>6 Guests</option>
            <option value={7}>7 Guests</option>
            <option value={8}>8 Guests</option>
            <option value={9}>9 Guests</option>
            <option value={10}>10 Guests</option>
          </Form.Select>
        </Row>
      </Container>
      <Link
        to="/payment"
        state={{ cost: (subtotal + 75.0 + 190.0).toFixed(2), id, bookedDays }}
      >
        <Row style={{ padding: "20px" }}>
          <Button
            variant="outline-info"
            style={{
              height: "60px",
              backgroundColor: "rgba(227, 80, 124)",
              color: "white",
            }}
          >
            Reserve
          </Button>
        </Row>
      </Link>
      <p>You won't be charged yet</p>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <u>
            {price} * {calculateDays()} days
          </u>
        </div>
        <div className="p-2 ms-auto">
          {(price * calculateDays()).toFixed(2)}
        </div>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <u>Cleaning Fee</u>
        </div>
        <div className="p-2 ms-auto">$75</div>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <u>Airbnb service fee</u>
        </div>
        <div className="p-2 ms-auto">$190</div>
      </Stack>
      <hr />
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <u>Total before taxes</u>
        </div>
        <div className="p-2 ms-auto">
          {(subtotal + 75.0 + 190.0).toFixed(2)}
        </div>
      </Stack>
    </Card>
  );
}
