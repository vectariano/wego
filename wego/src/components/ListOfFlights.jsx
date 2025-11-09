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
        setFlights(data || []);
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
            <div className="card-head-flights">
              <div className="name-description">
                <h1 className="flight-route">

                  <img src={flight.flights[0].airline_logo} className="airlogo" alt="airlogo" />
                  {flight.flights[0].departure_airport.name} → {flight.flights[0].arrival_airport.name} 
                </h1>
                <div className="card-mid">
                  <p className="flight-airline">Airline:  {flight.flights[0].airline}</p>
                </div>
              </div>
              <div className="flight-rating">
                <h2 className="price">{flight.price}</h2>
              </div>
            </div>

            <div className="card-bottom-flights">
              <div className="flight-details-flex">
                <div className="flight-time">
                  <p className="time">{flight.flights[0].departure_airport.time} ({flight.flights[0].departure_airport.id})</p>
                </div>
                <div className="flight-duration">
                  <p className="duration">{Math.floor(flight.flights[0].duration / 60)}h {Math.floor(flight.flights[0].duration % 60)}m</p>
                  {/* <span className="stops">{flight.stops === 0 ? "Nonstop" : `${flight.stops} stop(s)`}</span> */}
                </div>
                <div className="flight-time arrival">
                  <p className="time">{flight.flights[0].arrival_airport.time} ({flight.flights[0].arrival_airport.id})</p>
                </div>

                <div className="flight-type">
                  <p className="type">{flight.type}</p>
                </div>

                
              </div>

              <div className="book-flight-item">
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