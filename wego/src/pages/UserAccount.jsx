import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserAccount = () => {
    const [favorites, setFavorites] = useState([]);
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com"
    });

   useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                setUserData(JSON.parse(currentUser));
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }
        
        const savedFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const getHotelData = (id) => {
        const cached = JSON.parse(localStorage.getItem('cachedHotels')) || [];
        return cached.find(hotel => hotel.property_token === id);
    };

    const getFlightData = (id) => {
        const cached = JSON.parse(localStorage.getItem('cachedFlights')) || [];
        return cached.find(flight => flight.departure_token === id);
    };

    const handleLogout = () => {
        localStorage.removeItem('userFavorites');
        window.location.href = '/';
    };

    return (
        <div className="account-page">
            <div className="account-header">
                <h1>{userData.name}'s Account</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Back
                </button>
            </div>

            <div className="account-content">
                <div className="account-section">
                    <h2>Favorited Hotels</h2>
                    <div className="favorites-grid">
                        {favorites.length === 0 ? (
                            <p>No favorited hotels yet</p>
                        ) : (
                            favorites.map(id => {
                                const hotel = getHotelData(id);
                                if (!hotel) return null;
                                return (
                                    <Link 
                                        key={id} 
                                        to={`/hotel/${encodeURIComponent(id)}`}
                                        className="favorite-card"
                                    >
                                        <img 
                                            src={hotel.images?.[0]?.thumbnail || "https://via.placeholder.com/200x150?text=No+Image"} 
                                            alt={hotel.name} 
                                            className="favorite-img"
                                        />
                                        <h3 className="favorite-title">{hotel.name || "Unnamed Hotel"}</h3>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="account-section">
                    <h2>Favorited Flights</h2>
                    <div className="favorites-grid">
                        {favorites.length === 0 ? (
                            <p>No favorited flights yet</p>
                        ) : (
                            favorites.map(id => {
                                const flight = getFlightData(id);
                                if (!flight || !flight.flights?.[0]) return null;
                                
                                const firstLeg = flight.flights[0];
                                return (
                                    <Link 
                                        key={id} 
                                        to={`/flight/${encodeURIComponent(id)}`}
                                        className="favorite-card"
                                    >
                                        {firstLeg.airline_logo && (
                                            <img 
                                                src={firstLeg.airline_logo.trim()} 
                                                alt={firstLeg.airline}
                                                className="favorite-airline-logo"
                                            />
                                        )}
                                        <h3 className="favorite-title">
                                            {firstLeg.departure_airport?.name || "—"} → {firstLeg.arrival_airport?.name || "—"}
                                        </h3>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;