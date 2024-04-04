import React from "react";
import Card from "react-bootstrap/Card";
import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { StartDateContext, EndDateContext } from "../../UserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

export default function ListingDetailsCheckout({ price }) {
  const { startDateContext, setStartDateContext } =
    useContext(StartDateContext);
  const { endDateContext, setEndDateContext } = useContext(EndDateContext);
  //console.log(startDateContext.split("T")[0]);
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
              monthsShown={2}
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
          <Form.Select>
            <option> 1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5 Guests</option>
            <option>6 Guests</option>
            <option>7 Guests</option>
            <option>8 Guests</option>
            <option>9 Guests</option>
            <option>10 Guests</option>
          </Form.Select>
        </Row>
      </Container>
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
      <p>You won't be charged yet</p>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <u>{price} * enter nights</u>
        </div>
        <div className="p-2 ms-auto">Enter Amount</div>
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
        <div className="p-2 ms-auto">enter</div>
      </Stack>
    </Card>
  );
}
