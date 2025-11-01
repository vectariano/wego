import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListOfFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("/api/flights/");
        if (!response.ok) throw new Error("Failed to fetch flights");
        const data = await response.json();
        setFlights(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBook = (flightId) => {
    navigate(`/flight/${flightId}`);
  };

  if (loading) {
    return <div className="flights-loading">Loading flights...</div>;
  }

  if (error) {
    return <div className="flights-error">Error loading flights: {error}</div>;
  }

  if (flights.length === 0) {
    return <div className="flights-empty">No flights found.</div>;
  }

  return (
    <div className="flex-flights-col">
      {flights.map((flight) => (
        <div key={flight.id} className="flight-card-flex">
          <div className="flight-info-flex">
            <div className="card-head">
              <div className="name-description">
                <h2 className="flight-route">
                  {flight.departure.city} ({flight.departure.airport}) → {flight.arrival.city} ({flight.arrival.airport})
                </h2>
                <div className="card-mid">
                  <p className="flight-airline">{flight.airline.name}</p>
                </div>
              </div>
              <div className="flight-rating">
                <span className="price">{flight.price.total}</span>
              </div>
            </div>

            <div className="card-bottom">
              <div className="flight-details-grid">
                <div className="flight-time">
                  <span className="time">{flight.departure.time}</span>
                  <span className="date">{flight.departure.date}</span>
                </div>
                <div className="flight-duration">
                  <span className="duration">{flight.duration}</span>
                  <span className="stops">{flight.stops === 0 ? "Nonstop" : `${flight.stops} stop(s)`}</span>
                </div>
                <div className="flight-time arrival">
                  <span className="time">{flight.arrival.time}</span>
                  <span className="date">{flight.arrival.date}</span>
                </div>
              </div>

              <div className="book-item">
                <button className="booking-button" onClick={() => handleBook(flight.id)}>
                  Select Flight
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListOfFlights;