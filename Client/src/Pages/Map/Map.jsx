import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { key } from "./api-key";
import { ListingsContext } from "../../UserContext";
import Button from "react-bootstrap/esm/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = key; // Mapbox access token

function MapboxMap() {
  const mapContainerRef = useRef(null);
  const { listingsContext } = useContext(ListingsContext);

  const markers = [
    {
      lng: -75.9248,
      lat: 39.807182,
      popupHtml: "<h3>Marker 1</h3><p>Marker 1 description</p>",
    },
    {
      lng: -75.9348,
      lat: 39.817182,
      popupHtml: "<h3>Marker 2</h3><p>Marker 2 description</p>",
    },
    {
      lng: -75.9448,
      lat: 39.827182,
      popupHtml: "<h3>Marker 3</h3><p>Marker 3 description</p>",
    },
    // Add more markers as needed
  ];

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-75.9248, 39.807182], // adjust to be more central to all the markers
      zoom: 5,
    });

    // Add markers to the map
    listingsContext &&
      listingsContext.forEach((listing) => {
        const pin = { ...listing.pin };
        new mapboxgl.Marker()
          .setLngLat([pin.lng, pin.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // Add a popup
              .setHTML(pin.popupHtml)
          )
          .addTo(map);
      });

    // Clean up on unmount
    return () => map.remove();
  }, []); // Empty dependency array ensures this effect only runs once

  return (
    <div>
      <Link to="/">
        <Button
          style={{
            backgroundColor: "rgba(227, 80, 124)",
            marginBottom: "20px",
          }}
        >
          <AiOutlineArrowLeft />
        </Button>
      </Link>
      <h3>Explore our locations</h3>
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{ height: "600px", width: "1000px" }}
      />
    </div>
  );
}

export default MapboxMap;
