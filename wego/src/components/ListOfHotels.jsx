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
                            <div className="name-description">
                                <h1 className="hotel-name">{hotel.name}</h1>
                                <div className="card-mid">
                                    <h2 className="hotel-description">{hotel.description}</h2>
                                </div>
                            </div>
                            <div className="hotel-rating">
                                <h2 className="rating">{hotel.overall_rating}</h2>
                                <h2 className="reviews">{hotel.reviews} reviews </h2>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div className="amenities-grid">
                                <ul className="amenities-list">
                                    {hotel.amenities.map((amenity, i) => (
                                        <li key={i} className="hotel-amenities">{amenity}</li>
                                    ))}
                                </ul>
                                
                            </div>
                            <div className="book-item">
                                <h1 className="hotel-price">{hotel.total_rate.lowest}</h1>
                                <button className="booking-button">Book now</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListOfHotels;