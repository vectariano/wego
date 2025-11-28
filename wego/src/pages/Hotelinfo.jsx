import React from "react";
import { useParams } from "react-router-dom";
import ListingHeader from "../components/ListingHeader";
import HotelDetailCard from "../components/HotelDetailCard";

function Hotelinfo() {
    const { id } = useParams();
    const decodedId = decodeURIComponent(id);

    return (
        <div>
            <ListingHeader />
            <HotelDetailCard hotelId={decodedId} />
        </div>
    );
}

export default Hotelinfo;