import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfHotels() {
    const [hotels, setHotels] = useState([]);
    const [sortOption, setSortOption] = useState("rating");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        setIsAuthenticated(!!currentUser);
    }, []);


    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const toggleFavorite = (hotelId) => {
        const newFavorites = favorites.includes(hotelId)
            ? favorites.filter(id => id !== hotelId)
            : [...favorites, hotelId];
        
        localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const isFavorite = (hotelId) => favorites.includes(hotelId);

    const fetchHotels = async (destination, checkIn, checkOut, adults, rooms) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `/api/hotels/?destination=${encodeURIComponent(destination)}&check_in=${checkIn}&check_out=${checkOut}&adults=${adults}&rooms=${rooms}`
            );
            const data = await response.json();
            if (Array.isArray(data)) {
                setHotels(data);
                localStorage.setItem("cachedHotels", JSON.stringify(data));
            } else if (data.error) {
                setError(data.error);
                setHotels([]);
            }
        } catch (error) {
            console.error("Failed to fetch hotels:", error);
            setError("Failed to load hotels. Please try again.");
            setHotels([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const destination = urlParams.get("destination") || "Bali Resorts";
        const checkIn = urlParams.get("check_in") || "2025-12-29";
        const checkOut = urlParams.get("check_out") || "2025-12-30";
        const adults = urlParams.get("adults") || "2";
        const rooms = urlParams.get("rooms") || "1";
        
        console.log("Fetching hotels with params:", { destination, checkIn, checkOut, adults, rooms });
        fetchHotels(destination, checkIn, checkOut, adults, rooms);
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

    if (loading) {
        return <div style={{ textAlign: "center", padding: "2rem" }}>Loading hotels...</div>;
    }

    if (error) {
        return <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>{error}</div>;
    }

    return (
        <div className="flex-hotels-col">
            <div className="sorting" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "1rem 0",
                padding: "0 1rem"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <label className="sort-label">Sort by:</label>
                    <select className="select-form"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="rating">Highest rating</option>
                        <option value="price-low">Price: low to high</option>
                        <option value="price-high">Price: high to low</option>
                        <option value="name">Name (A–Z)</option>
                    </select>
                </div>
            </div>

            {sortedHotels.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    <p>No hotels available for your search criteria.</p>
                    <p>Try changing your destination or dates.</p>
                </div>
            ) : (
                sortedHotels.map((hotel) => {
                    const hotelId = hotel.property_token;
                    if (!hotelId) return null;
                    return (
                        <div key={hotelId} className="hotel-card-flex">
                            {isAuthenticated && (
                                <div 
                                    className="favorite-icon" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        toggleFavorite(hotelId);
                                    }}
                                    title={isFavorite(hotelId) ? "Remove from favorites" : "Add to favorites"}
                                >
                                    {isFavorite(hotelId) ? "❤️" : "♡"}
                                </div>
                            )}
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
                                        <h2 className="rating">{hotel.overall_rating || "—"}</h2>
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
                                            {hotel.total_rate?.lowest || "—"}
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