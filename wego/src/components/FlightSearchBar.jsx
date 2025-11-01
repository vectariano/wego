import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loopIcon from "../static/img/loop.png";

function FlightSearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const [fromTo, setFromTo] = useState(urlParams.get("fromTo") || "");
  const [dates, setDates] = useState(urlParams.get("dates") || "");
  const [passengers, setPassengers] = useState(urlParams.get("passengers") || "1 adult");

  const handleSearch = () => {
    const params = new URLSearchParams({ fromTo, dates, passengers });
    navigate(`/flights/results?${params.toString()}`);
  };

  return (
    <section className="flight-search-bar">
      <div className="search-container">
        <div className="search-field">
          <input
            type="text"
            placeholder="From - To"
            value={fromTo}
            onChange={(e) => setFromTo(e.target.value)}
            className="flight-destination-input"
          />
        </div>
        <div className="search-field">
          <input
            type="text"
            placeholder="Depart - Return"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="flight-dates-input"
          />
        </div>
        <div className="search-field">
          <input
            type="text"
            placeholder="Passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="flight-passengers-input"
          />
        </div>
        <button className="flight-search-button" onClick={handleSearch}>
          <img src={loopIcon} alt="Search" className="search-icon" />
        </button>
      </div>
    </section>
  );
}

export default FlightSearchBar;