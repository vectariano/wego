import React from "react";
import ListingHeader from "../components/ListingHeader";
import ListOfFlights from "../components/ListOfFlights";
import FlightSearchBar from "../components/FlightSearchBar";

function FlightsListing() {
  return (
    <div>
      <ListingHeader />
      <FlightSearchBar />
      <ListOfFlights />
    </div>
  );
}

export default FlightsListing;