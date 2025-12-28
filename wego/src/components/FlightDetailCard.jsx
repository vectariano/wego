// src/components/FlightDetailCard.jsx
import React, { useEffect, useState } from "react";
import locationImg from "../static/img/Location.png";

export default function FlightDetailCard({ flightId }) {
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!flightId) {
      setLoading(false);
      return;
    }

    try {
      const cached = localStorage.getItem("cachedFlights");
      const flights = cached ? JSON.parse(cached) : [];
      const found = flights.find(f => f.departure_token === flightId);
      setFlight(found || null);
    } catch (error) {
      console.error("Error loading flight:", error);
      setFlight(null);
    } finally {
      setLoading(false);
    }
  }, [flightId]);

  const handleBookNow = () => {
    if (!flight || !flight.flights || flight.flights.length === 0) return;

    const firstLeg = flight.flights[0];
    const lastLeg = flight.flights[flight.flights.length - 1];

    const depId = firstLeg.departure_airport?.id;   
    const arrId = lastLeg.arrival_airport?.id;     
    const depDate = firstLeg.departure_airport?.time?.split(" ")[0]; 
    const flightNumber = firstLeg.flight_number || "";
    const airline = firstLeg.airline || "";

    const query = `Flights to ${arrId} from ${depId} on ${depDate} ${flightNumber}`;

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    window.open(googleUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) return <div className="flight-detail-card-loading">Loading...</div>;
  if (!flight) return <div className="flight-detail-card-error">Flight not found</div>;

  const price = `$${flight.price?.toLocaleString() || "—"}`;
  const type = flight.type || "Round trip";
  const legs = flight.flights || [];
  const totalDurationMin = flight.total_duration || 0;
  const totalHours = Math.floor(totalDurationMin / 60);
  const totalMinutes = totalDurationMin % 60;

  const firstLeg = legs[0];
  const lastLeg = legs[legs.length - 1];
  const dep = firstLeg?.departure_airport;
  const arr = lastLeg?.arrival_airport;

  const hasLayovers = legs.length > 1;
  const isDirect = !hasLayovers;
  const hasOvernight = legs.some(l => l.overnight);

  const carbonEmissions = flight.carbon_emissions?.this_flight || 0;

  return (
    <div className="flight-detail-card">
      <header className="flight-header">
        <div className="flight-info">
          <h1 className="flight-name">
            {dep?.name} → {arr?.name}
          </h1>
          <div className="flight-meta">
            <div className="flight-rating">
              <span className="rating-value">{firstLeg?.airline || "—"}</span>
              <span className="rating-text">
                {firstLeg?.flight_number || "—"}<br />
                {firstLeg?.travel_class || "Economy"}
              </span>
            </div>
            <div className="flight-address">
              <img src={locationImg} alt="Location" className="location-icon" />
              {dep?.id} → {arr?.id}
            </div>
          </div>
        </div>

        <div className="flight-actions">
          <div className="price-tag">{price}</div>
          <button className="btn-book" onClick={handleBookNow}>Book now</button>
        </div>
      </header>

      <div className="flight-legs-section">
        {legs.map((leg, i) => {
          const dep = leg.departure_airport;
          const arr = leg.arrival_airport;
          const durationMin = leg.duration || 0;
          const hours = Math.floor(durationMin / 60);
          const minutes = durationMin % 60;

          return (
            <div key={i} className="leg-item">
              <div className="leg-airline">
                {leg.airline_logo && (
                  <img
                    src={leg.airline_logo.trim()}
                    alt={leg.airline}
                    className="airlogo"
                    onError={(e) => e.target.src = "https://via.placeholder.com/30x30?text=✈️"}
                  />
                )}
                <span>{leg.airline}</span>
              </div>
              <div className="leg-route">
                <div className="leg-stop">
                  <img src={locationImg} alt="Departure" className="location-icon" />
                  <span>{dep?.name || "—"}</span>
                </div>
                <div className="leg-arrow">→</div>
                <div className="leg-stop">
                  <img src={locationImg} alt="Arrival" className="location-icon" />
                  <span>{arr?.name || "—"}</span>
                </div>
              </div>
              <div className="leg-duration">
                {hours}h {minutes}m
                {leg.overnight && <span className="overnight-badge">Overnight</span>}
              </div>
            </div>
          );
        })}
      </div>

      <section className="overview-section">
        <h2>Overview</h2>
        <p className="overview-text">
          This is a {type} flight with {legs.length} leg{legs.length !== 1 ? 's' : ''}. 
          Total duration: {totalHours}h {totalMinutes}m.
        </p>
      </section>

      <div className="features-grid">
        <div className="feature-item primary">
          <div className="feature-value">{price}</div>
          <div className="feature-label">Total Price<br />{type}</div>
        </div>
        <div className="feature-item">
          <div className="feature-value">{isDirect ? "Yes" : "No"}</div>
          <div className="feature-label">Direct Flights</div>
        </div>
        <div className="feature-item">
          <div className="feature-value">{hasOvernight ? "Yes" : "No"}</div>
          <div className="feature-label">Overnight</div>
        </div>
        <div className="feature-item">
          <div className="feature-value">{carbonEmissions.toLocaleString()} kg</div>
          <div className="feature-label">Carbon Emissions</div>
        </div>
      </div>
    </div>
  );
}