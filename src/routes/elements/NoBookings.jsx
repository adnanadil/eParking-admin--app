import React from "react";
import { useRouteError } from "react-router-dom";

export default function NoBookings() {

  return (
    <div id="error-page">
      <h1 style={{textAlign: "center", marginTop: "50px"}}>No Bookings Found!</h1>
    </div>
  );
}