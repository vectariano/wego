import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import planeIcon from "../static/img/airplaneb.png";
import userIcon from "../static/img/icon.png";
import loopIcon from "../static/img/loop.png";
import arrow from "../static/img/arrow.png";

function FlightSearchBar() {
  const navigate = useNavigate();
  const [fromTo, setFromTo] = useState("PEK - AUS"); // Обновлено для примера из API
  const [tripType, setTripType] = useState("Round trip");
  const [departDate, setDepartDate] = useState("2026-01-03"); // Обновлено для примера из API
  const [returnDate, setReturnDate] = useState("2026-01-05"); // Обновлено для примера из API
  const [passengers, setPassengers] = useState("1 adult - Economy");

  const getNextDay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleSearch = () => {
    let from = "", to = "";
    if (fromTo.includes(" - ")) {
      [from, to] = fromTo.split(" - ").map(s => s.trim());
    } else {
      from = fromTo.trim();
      to = ""; 
    }

    const params = new URLSearchParams({
      from,
      to,
      trip: tripType,
      depart: departDate || "",
      ...(tripType === "Round trip" && returnDate && { return: returnDate }),
      passenger_class: passengers,
    });

    navigate(`/flights?${params.toString()}`);
  };

  const handleDepartChange = (e) => {
    const newDepart = e.target.value;
    setDepartDate(newDepart);
    if (tripType === "Round trip" && (!returnDate || newDepart >= returnDate)) {
      setReturnDate(getNextDay(newDepart));
    }
  };

  const handleReturnChange = (e) => {
    setReturnDate(e.target.value);
  };

  const handleTripTypeChange = (e) => {
    const newTripType = e.target.value;
    setTripType(newTripType);
    // Если переключаемся на One way, сбрасываем дату возврата
    if (newTripType === "One way") {
      setReturnDate("");
    } else if (!returnDate || departDate >= returnDate) {
      // При переключении на Round trip устанавливаем дату возврата
      setReturnDate(getNextDay(departDate));
    }
  };

  return (
    <section className="flight-search-bar">
      <div className="flight-search-container">
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
              onChange={handleTripTypeChange}
            >
              <option value="Round trip">Round-trip</option>
              <option value="One way">One-way</option>
            </select>
            <img src={arrow} className="dropdown-arrow" alt="Expand" />
          </div>
        </div>

        <div className="flight-search-field">
          {tripType === "Round trip" ? (
            <div className="flight-dates-group">
              <div className="flight-input-with-icon">
                <input
                  type="date"
                  value={departDate}
                  onChange={handleDepartChange}
                  className="flight-dates-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="flight-input-with-icon">
                <input
                  type="date"
                  value={returnDate}
                  onChange={handleReturnChange}
                  className="flight-dates-input"
                  min={getNextDay(departDate)}
                />
              </div>
            </div>
          ) : (
            <div className="flight-input-with-icon">
              <input
                type="date"
                value={departDate}
                onChange={handleDepartChange}
                className="flight-dates-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}
        </div>

        <div className="flight-search-field">
          <div className="flight-input-with-icon">
            <img src={userIcon} className="flight-icon" alt="Passengers" />
            <select
              className="flight-passengers-input"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            >
              <option value="1 adult - Economy">1 adult - Economy</option>
              <option value="2 adults - Economy">2 adults - Economy</option>
              <option value="3 adults - Economy">3 adults - Economy</option>
              <option value="4 adults - Economy">4 adults - Economy</option>
              <option value="1 adult - Business">1 adult - Business</option>
              <option value="2 adults - Business">2 adults - Business</option>
            </select>
            <img src={arrow} className="dropdown-arrow" alt="Expand" /> 
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