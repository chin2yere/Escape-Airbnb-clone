import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { key } from "./api-key";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Container } from "react-bootstrap";

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key, // Replace with your Google Maps API key
  });

  const markers = [
    { id: 1, position: { lat: 39.807182, lng: -75.9248 } },
    { id: 2, position: { lat: 39.807, lng: -75.935 } },
    { id: 3, position: { lat: 39.808, lng: -75.936 } },
  ];

  const mapContainerStyle = {
    height: "550px",
    width: "1000px",
  };

  const center = {
    lat: 39.80733536798874,
    lng: -75.9284954609197,
  };

  if (loadError) {
    console.error("Error loading maps", loadError);
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  return (
    <Container className="my-5">
      <h3>Explore our location</h3>
      <div style={mapContainerStyle}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {markers.map((marker) => {
            return <Marker key={marker.id} position={marker.position} />;
          })}
        </GoogleMap>
      </div>
    </Container>
  );
}
