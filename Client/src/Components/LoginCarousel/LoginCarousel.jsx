import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import HomepageImage1 from "../Pictures/homepage1.jpg";
import HomepageImage2 from "../Pictures/homepage3.webp";
import HomepageImage3 from "../Pictures/homepage4.jpg";
import Image from "react-bootstrap/Image";

function LoginCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image src={HomepageImage1} fluid />
        <Carousel.Caption>
          <em>
            <h3
              style={{
                backgroundColor: "rgba(147, 130, 135, 0.705)",
                fontSize: "40px",
                borderRadius: "16px",
              }}
            >
              Escape
            </h3>
          </em>
          <p
            style={{
              backgroundColor: "rgba(147, 130, 135, 0.705)",
              fontSize: "30px",
              borderRadius: "16px",
            }}
          >
            Find your next adventure.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={HomepageImage2} fluid />
        <Carousel.Caption>
          <h3
            style={{
              backgroundColor: "rgba(147, 130, 135, 0.705)",
              fontSize: "40px",
              borderRadius: "16px",
            }}
          >
            Discover new things
          </h3>
          <p
            style={{
              backgroundColor: "rgba(147, 130, 135, 0.705)",
              fontSize: "30px",
              borderRadius: "16px",
            }}
          >
            everything at your fingertips
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={HomepageImage3} fluid />
        <Carousel.Caption>
          <h3
            style={{
              backgroundColor: "rgba(147, 130, 135, 0.705)",
              fontSize: "40px",
              borderRadius: "16px",
            }}
          >
            Comfort is everywhere
          </h3>
          <p
            style={{
              backgroundColor: "rgba(147, 130, 135, 0.705)",
              borderRadius: "16px",

              fontSize: "30px",
            }}
          >
            Know where to look.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default LoginCarousel;
