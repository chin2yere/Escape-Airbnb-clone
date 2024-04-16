import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/esm/Image";

//this component displays the pictures from the view all button
export default function ListingDetailsModal({ pictures }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  if (pictures) {
    return (
      <div style={{ margin: "10px" }}>
        <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
          Show pictures
        </Button>

        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Gallery</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pictures.map((picture) => {
              return (
                <Row key={picture} style={{ padding: "80px" }}>
                  <Image src={picture} fluid></Image>
                </Row>
              );
            })}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
