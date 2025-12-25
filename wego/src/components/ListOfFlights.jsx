// src/components/ListOfFlights.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfFlights() {
    const [flights, setFlights] = useState([]);
    const [sortOption, setSortOption] = useState("price-low");
    const location = useLocation();

    const fetchFlights = async () => {
        try {
            const response = await fetch("/api/flights/");
            const data = await response.json();

            const allFlights = [...(data.best_flights || []), ...(data.other_flights || [])];

            const flightsWithId = allFlights.map(flight => ({
                ...flight,
                id: flight.departure_token 
            }));

            setFlights(flightsWithId);
            localStorage.setItem("cachedFlights", JSON.stringify(flightsWithId));
        } catch (error) {
            console.error("Failed to fetch flights:", error);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, [location.search]); 

    const sortedFlights = useMemo(() => {
        if (!flights.length) return [];
        const sorted = [...flights];

        const getPrice = (flight) => flight.price || 0;
        const getDuration = (flight) => flight.total_duration || 0;

        switch (sortOption) {
            case "price-low":
                return sorted.sort((a, b) => getPrice(a) - getPrice(b));
            case "price-high":
                return sorted.sort((a, b) => getPrice(b) - getPrice(a));
            case "duration-low":
                return sorted.sort((a, b) => getDuration(a) - getDuration(b));
            case "duration-high":
                return sorted.sort((a, b) => getDuration(b) - getDuration(a));
            default:
                return sorted;
        }
    }, [flights, sortOption]);

    return (
        <div className="flex-flights-col">
            <div className="sorting" style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "0rem 0",
                padding: "0 1rem"
            }}>
                <label className="sort-label" >Sort by:</label>
                <select className="select-form"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="duration-low">Duration: short to long</option>
                    <option value="duration-high">Duration: long to short</option>
                </select>
            </div>

            {sortedFlights.length === 0 ? (
                <p style={{ textAlign: "center", padding: "2rem" }}>No flights available.</p>
            ) : (
                sortedFlights.map((flight) => {
                    const flightId = flight.id;
                    if (!flightId) return null;

                    const firstLeg = flight.flights?.[0];
                    if (!firstLeg) return null;

                    const dep = firstLeg.departure_airport;
                    const arr = firstLeg.arrival_airport;
                    const price = flight.price ? `$${flight.price.toLocaleString()}` : "—";
                    const durationMin = flight.total_duration || 0;
                    const hours = Math.floor(durationMin / 60);
                    const minutes = durationMin % 60;
                    const durationStr = `${hours}h ${minutes}m`;

                    return (
                        <div key={flightId} className="flight-card-flex">
                            <div className="flight-info-flex">
                                <div className="card-head-flights">
                                    <div className="name-description">
                                        <h1 className="flight-route">
                                            {firstLeg.airline_logo && (
                                                <img
                                                    src={firstLeg.airline_logo.trim()}
                                                    className="airlogo"
                                                    alt={firstLeg.airline}
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/30x30?text=✈️";
                                                    }}
                                                />
                                            )}
                                            {dep?.name || "—"} ({dep?.id}) → {arr?.name || "—"} ({arr?.id})
                                        </h1>
                                        <div className="card-mid">
                                            <p className="flight-airline">
                                                {firstLeg.airline} • {firstLeg.flight_number || "—"} • {firstLeg.travel_class || "Economy"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flight-rating">
                                        <h2 className="price">{price}</h2>
                                    </div>
                                </div>

                                <div className="card-bottom-flights">
                                    <div className="flight-details-flex">
                                        <div className="flight-time">
                                            <p className="time">{dep?.time?.split(" ")[1] || "—"} ({dep?.id})</p>
                                        </div>
                                        <div className="flight-duration">
                                            <p className="duration">{durationStr}</p>
                                            {firstLeg.overnight && <span className="overnight-badge">Overnight</span>}
                                        </div>
                                        <div className="flight-time arrival">
                                            <p className="time">{arr?.time?.split(" ")[1] || "—"} ({arr?.id})</p>
                                        </div>
                                        <div className="flight-type">
                                            <p className="type">{flight.type || "Round trip"}</p>
                                        </div>
                                    </div>

                                    <div className="book-flight-item">
                                        <Link to={`/flight/${encodeURIComponent(flightId)}`} className="booking-button">
                                            <span>Select Flight</span>
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

export default ListOfFlights;