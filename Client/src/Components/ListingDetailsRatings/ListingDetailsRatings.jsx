import React from "react";
import Stack from "react-bootstrap/esm/Stack";
import { CgProfile } from "react-icons/cg";

export default function ListingDetailsRatings() {
  return (
    <div>
      <h1>5</h1>
      <Stack style={{ marginTop: "10px" }} direction="horizontal" gap={3}>
        <div className="p-2">
          <CgProfile style={{ fontSize: "20px" }} />
        </div>

        <div className="p-2">
          <h6>Free cancellation before November 6</h6>
        </div>
      </Stack>
    </div>
  );
}
