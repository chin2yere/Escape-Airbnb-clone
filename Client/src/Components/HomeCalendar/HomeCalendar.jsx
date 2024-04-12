import React from "react";
import { useState, useContext } from "react";
import { StartDateContext, EndDateContext } from "../../UserContext";
import Nav from "react-bootstrap/Nav";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
//import Button from "react-bootstrap/Button";

import "react-datepicker/dist/react-datepicker.css";
export default function HomeCalendar() {
  const { startDateContext, setStartDateContext } =
    useContext(StartDateContext);
  const { endDateContext, setEndDateContext } = useContext(EndDateContext);

  return (
    <div>
      <Nav
        style={{
          backgroundColor: "white",
          borderRadius: "25px",
          borderStyle: "solid",
          borderWidth: "1px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Nav.Item>
          <Link to="/map">
            <button style={{ width: "200px", borderRadius: "25px" }}>
              Where <br /> Search destinations
            </button>
          </Link>
        </Nav.Item>
        <Nav.Item>
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
          />
          <DatePicker
            selected={endDateContext}
            onChange={(date) => setEndDateContext(date)}
            selectsEnd
            startDate={startDateContext}
            endDate={endDateContext}
            minDate={startDateContext}
            monthsShown={2}
          />
        </Nav.Item>
        <Nav.Item>
          <button
            style={{
              width: "200px",
              borderRadius: "25px",
            }}
          >
            Who <br /> Add guests
          </button>
        </Nav.Item>
      </Nav>
    </div>
  );
}
