import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import planeIcon from "../static/img/airplaneb.png";
import calendarIcon from "../static/img/calendar.png";
import userIcon from "../static/img/icon.png";
import loopIcon from "../static/img/loop.png";

function FlightSearchBar() {
  const navigate = useNavigate();
  const [fromTo, setFromTo] = useState("");
  const [tripType, setTripType] = useState("round-trip");
  const [dates, setDates] = useState("");
  const [passengers, setPassengers] = useState("1 adult, Economy");

  const handleSearch = () => {
    navigate("/flights");
  };

  return (
    <section className="flight-search-bar">
      <div className="flight-search-container">
        {/* From - To */}
        <div className="flight-search-field">
          <div className="flight-input-with-icon">
            <img src={planeIcon} className="flight-icon" alt="From - To" />
            <input
              type="text"
              placeholder="From - To"
              className="flight-from-to-input"
              value={fromTo}
              onChange={(e) => setFromTo(e.target.value)}
            />
          </div>
        </div>

        <div className="flight-search-field">
          <div className="flight-input-with-icon">
            <img src={planeIcon} className="flight-icon" alt="Trip" />
            <select
              className="flight-trip-select"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option value="round-trip">Round-trip</option>
              <option value="one-way">One-way</option>
              <option value="multi-city">Multi-city</option>
            </select>
          </div>
        </div>

        <div className="flight-search-field">
          <div className="flight-input-with-icon">
            <img src={calendarIcon} className="flight-icon" alt="Dates" />
            <input
              type="text"
              placeholder="Depart - Return"
              className="flight-dates-input"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>
        </div>

        <div className="flight-search-field">
          <div className="flight-input-with-icon">
            <img src={userIcon} className="flight-icon" alt="Passengers" />
            <input
              type="text"
              placeholder="1 adult, Economy"
              className="flight-passengers-input"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </div>
        </div>

        <button className="flight-search-button" onClick={handleSearch}>
          <img src={loopIcon} className="flight-search-icon" alt="Search" />
        </button>
      </div>
    </section>
  );
}

export default FlightSearchBar;