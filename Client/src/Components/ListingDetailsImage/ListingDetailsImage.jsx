import { useState } from "react";
import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import ListingDetailsModal from "../ListingDetailsModal/ListingDetailsModal";

//this component renders the pictures on the grid on the listing details page
export default function ListingDetailsImage({ pictures }) {
  if (pictures) {
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
          <Image src={pictures[0]} fluid style={{ height: "410px" }} />
        </Col>
        {/* second col */}
        <Col>
          <Row>
            <Col>
              <Image
                src={pictures[1]}
                fluid
                style={{ height: "200px", width: "300px" }}
              />
            </Col>
            <Col>
              <Image
                src={pictures[2]}
                fluid
                style={{ height: "200px", width: "300px" }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "12px" }}>
            <Col>
              <Image
                src={pictures[3]}
                fluid
                style={{ height: "200px", width: "300px" }}
              />
            </Col>
            <Col>
              <Image
                src={pictures[4]}
                fluid
                style={{ height: "200px", width: "300px" }}
              />

              <ListingDetailsModal pictures={pictures} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
