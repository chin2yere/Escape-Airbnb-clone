import React from "react";
import { useState, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import DatePicker from "react-datepicker";
//import Button from "react-bootstrap/Button";

import "react-datepicker/dist/react-datepicker.css";
export default function HomeCalendar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

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
          <button style={{ width: "200px", borderRadius: "25px" }}>
            Where <br /> Search destinations
          </button>
        </Nav.Item>
        <Nav.Item>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            monthsShown={2}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
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
