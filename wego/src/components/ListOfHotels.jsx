import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfHotels() {
    const [hotels, setHotels] = useState([]);
    const [sortOption, setSortOption] = useState("rating");
    const location = useLocation();

    const fetchHotels = async (adults) => {
        try {
            const response = await fetch(`/api/hotels/?adults=${adults}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setHotels(data);
                localStorage.setItem("cachedHotels", JSON.stringify(data));
            }
        } catch (error) {
            console.error("Failed to fetch hotels:", error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const adults = urlParams.get("adults") || "2";
        fetchHotels(adults);
    }, [location.search]);

    const sortedHotels = useMemo(() => {
        if (!hotels.length) return [];
        const sorted = [...hotels];
        const getPrice = (hotel) => hotel.total_rate?.extracted_lowest || 0;

        switch (sortOption) {
            case "rating":
                return sorted.sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
            case "price-low":
                return sorted.sort((a, b) => getPrice(a) - getPrice(b));
            case "price-high":
                return sorted.sort((a, b) => getPrice(b) - getPrice(a));
            case "name":
                return sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
            default:
                return sorted;
        }
    }, [hotels, sortOption]);

    return (
        <div className="flex-hotels-col">
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem 0",
                padding: "0 1rem"
            }}>
                <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Sort by:</label>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    style={{
                        padding: "0.4rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "0.95rem",
                        minWidth: "180px"
                    }}
                >
                    <option value="rating">Highest rating</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="name">Name (A–Z)</option>
                </select>
            </div>

            {sortedHotels.length === 0 ? (
                <p style={{ textAlign: "center", padding: "2rem" }}>No hotels available.</p>
            ) : (
                sortedHotels.map((hotel) => {
                    const hotelId = hotel.property_token;
                    if (!hotelId) return null;
                    return (
                        <div key={hotelId} className="hotel-card-flex">
                            <img
                                src={hotel.images?.[0]?.thumbnail}
                                className="hotel-image"
                                alt={hotel.name || "Hotel"}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/287x192?text=No+Image";
                                }}
                            />
                            <div className="hotel-info-flex">
                                <div className="card-head">
                                    <div className="name-description">
                                        <h1 className="hotel-name">{hotel.name || "Unnamed Hotel"}</h1>
                                        <div className="card-mid">
                                            <h2 className="hotel-description">
                                                {hotel.description?.slice(0, 100)}...
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="hotel-rating">
                                        <h2 className="rating">{hotel.overall_rating || "—"} ★</h2>
                                        <h2 className="reviews">{hotel.reviews || 0} reviews</h2>
                                    </div>
                                </div>
                                <div className="card-bottom">
                                    <div className="amenities-grid">
                                        <ul className="amenities-list">
                                            {(hotel.amenities || []).slice(0, 4).map((amenity, idx) => (
                                                <li key={idx} className="hotel-amenities">{amenity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="book-item">
                                        <h1 className="hotel-price">
                                            ${hotel.total_rate?.lowest || "—"}
                                        </h1>
                                        <Link to={`/hotel/${encodeURIComponent(hotelId)}`} className="bbooking-button">
                                            <span>Book now</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ListOfHotels;