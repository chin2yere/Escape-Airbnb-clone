import React from "react";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";

export default function ListingDetailsCheckout() {
  return (
    <Card style={{ width: "26rem", boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)" }}>
      <h4 style={{ textAlign: "left" }}>$245 per night</h4>
      <br />

      <Container
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "8px",
        }}
        fluid
      >
        <Row style={{ height: "50px" }}>
          <Col
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            hola
          </Col>
          <Col
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
            hola
          </Col>
        </Row>
        <Row
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            height: "50px",
          }}
        >
          hiiii
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
        <div className="p-2">First item</div>
        <div className="p-2 ms-auto">Second item</div>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">First item</div>
        <div className="p-2 ms-auto">Second item</div>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">First item</div>
        <div className="p-2 ms-auto">Second item</div>
      </Stack>
      <hr />
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">First item</div>
        <div className="p-2 ms-auto">Second item</div>
      </Stack>
    </Card>
  );
}
