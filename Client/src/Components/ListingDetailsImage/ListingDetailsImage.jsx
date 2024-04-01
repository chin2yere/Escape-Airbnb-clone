import { useState } from "react";
import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";

export default function ListingDetailsImage() {
  return (
    <Row
      style={{
        borderRadius: "8px",
        borderColor: "black",
        borderStyle: "double",
        padding: "12px",
      }}
    >
      <Col>
        <Image
          src="https://www.sportsnet.ca/wp-content/uploads/2023/11/CP169191067-1040x572.jpg"
          fluid
        />
      </Col>
      {/* second col */}
      <Col>
        <Row>
          <Col>
            <Image
              src="https://www.sportsnet.ca/wp-content/uploads/2023/11/CP169191067-1040x572.jpg"
              fluid
            />
          </Col>
          <Col>
            <Image
              src="https://www.sportsnet.ca/wp-content/uploads/2023/11/CP169191067-1040x572.jpg"
              fluid
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "12px" }}>
          <Col>
            <Image
              src="https://www.sportsnet.ca/wp-content/uploads/2023/11/CP169191067-1040x572.jpg"
              fluid
            />
          </Col>
          <Col>
            <Image
              src="https://www.sportsnet.ca/wp-content/uploads/2023/11/CP169191067-1040x572.jpg"
              fluid
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
