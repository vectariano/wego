import React from "react";
import ListingHeader from "../components/ListingHeader.jsx";
import HotelSearchBar from "../components/HotelSearchBar.jsx";
import ListOfHotels from "../components/ListOfHotels.jsx";

function HotelListing() {
  return (
    <div>
      <ListingHeader /> 
      <HotelSearchBar /> 
      <ListOfHotels />
    </div>
  );
}
export default HotelListing;