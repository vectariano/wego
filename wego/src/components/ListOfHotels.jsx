import React, { useEffect, useState } from "react";

function ListOfHotels() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(
                    "/api/hotels/"
                );

                const data = await response.json();
                setHotels(data || []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchHotels();
    }, []);
    return (
        <div className="flex-hotels-col">
            {hotels.map((hotel, i) => (
                <div key={i} className="hotel-card-flex">
                    <img src={hotel.images?.[0]?.thumbnail} className="hotel-image" alt={hotel.name}/>
                    <div className="hotel-info-flex">
                        <div className="card-head">
                            <h1 className="hotel-name">{hotel.name}</h1>
                            <h1 className="hotel-price">{hotel.total_rate.lowest}</h1>
                        </div>
                        <h2>Rating: {hotel.overall_rating}</h2>
                        <h2>Reviews ({hotel.reviews})</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListOfHotels;