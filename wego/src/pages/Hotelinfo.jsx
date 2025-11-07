import React from "react";
import { useParams } from "react-router-dom"; 
import ListingHeader from "../components/ListingHeader";
import HotelDetailCard from "../components/HotelDetailCard";

function Hotelinfo() {
  const { id } = useParams(); 

  return (
    <div>
      <ListingHeader />
      <HotelDetailCard hotelId={id} /> 
    </div>
  );
}

export default Hotelinfo;