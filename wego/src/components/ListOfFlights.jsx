import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfFlights() {
    const [flights, setFlights] = useState([]);
    const [sortOption, setSortOption] = useState("price-low");
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

    const toggleFavorite = (flightId) => {
        const newFavorites = favorites.includes(flightId)
            ? favorites.filter(id => id !== flightId)
            : [...favorites, flightId];
        
        localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const isFavorite = (flightId) => favorites.includes(flightId);
    
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

    const filteredFlights = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const from = params.get("from")?.toUpperCase().trim();
        const to = params.get("to")?.toUpperCase().trim();

        if (!from || !to) {
            return flights; 
        }

        return flights.filter(flight => {
            const firstLeg = flight.flights?.[0];
            if (!firstLeg) return false;

            const depAirport = firstLeg.departure_airport;
            const arrAirport = firstLeg.arrival_airport;

            if (!depAirport || !arrAirport) return false;

            
            const routeText = `${depAirport.name} (${depAirport.id}) → ${arrAirport.name} (${arrAirport.id})`;

            return routeText.toUpperCase().includes(`(${from})`) &&
                   routeText.toUpperCase().includes(`(${to})`);
        });
    }, [flights, location.search]);

    const sortedFlights = useMemo(() => {
        if (!filteredFlights.length) return [];
        const sorted = [...filteredFlights];

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
    }, [filteredFlights, sortOption]);

    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    return (
        <div className="flex-flights-col">
            {/* {from && to && (
                <h2 className="search-header" style={{
                    textAlign: "center",
                    margin: "1rem 0",
                    fontSize: "1.2rem",
                    fontWeight: "600"
                }}>
                    Flights from <strong>{from}</strong> to <strong>{to}</strong>
                </h2>
            )} */}

            <div className="sorting" style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "0rem 0",
                padding: "0 1rem"
            }}>
                <label className="sort-label">Sort by:</label>
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
                <p style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                    No flights found for {from} → {to}.
                </p>
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
                            {isAuthenticated && (
                                <div 
                                    className="favorite-icon" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        toggleFavorite(flightId);
                                    }}
                                    title={isFavorite(flightId) ? "Remove from favorites" : "Add to favorites"}
                                >
                                    {isFavorite(flightId) ? "❤️" : "♡"}
                                </div>
                            )}
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