import React from "react";
import HomeTopBar from "../../Components/HomeTopBar/HomeTopBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grid from "../../Components/Grid/Grid";
import Container from "react-bootstrap/Container";
import HomeCategoryBar from "../../Components/HomeCategoryBar/HomeCategoryBar";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Container fluid>
        <Row className="top-bar">
          <HomeTopBar />
          <HomeCategoryBar />
        </Row>
        {/* <Row style={{ marginTop: "150px" }}>
          
        </Row> */}
        <Row style={{ marginTop: "150px" }}>
          <Grid />
        </Row>
      </Container>
    </div>
  );
}
