// src/pages/FlightInfo.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ListingHeader from "../components/ListingHeader";
import FlightDetailCard from "../components/FlightDetailCard";

function FlightInfo() {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);

  return (
    <div>
      <ListingHeader />
      <FlightDetailCard flightId={decodedId} />
    </div>
  );
}

export default FlightInfo;