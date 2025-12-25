import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bed from "../static/img/bed.png";
import calendar from "../static/img/calendar.png";
import icon from "../static/img/icon.png";
import arrow from "../static/img/arrow.png";
import loop from "../static/img/loop.png";

function HotelSearchBar() {
  const navigate = useNavigate();
  
  const [destination, setDestination] = useState("Bali Resorts");
  const [checkIn, setCheckIn] = useState("2025-12-24");
  const [checkOut, setCheckOut] = useState("2025-12-26");
  const [guestsOption, setGuestsOption] = useState("1 room, 2 guests");
  
  const getNextDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    let rooms = 1;
    let adults = 2;
    
    switch(guestsOption) {
      case "1 room, 1 guest":
        rooms = 1;
        adults = 1;
        break;
      case "1 room, 2 guests":
        rooms = 1;
        adults = 2;
        break;
      case "2 rooms, 4 guests":
        rooms = 2;
        adults = 4;
        break;
      case "3 rooms, 6 guests":
        rooms = 3;
        adults = 6;
        break;
      default:
        rooms = 1;
        adults = 2;
    }
    
    navigate(`/hotels?destination=${encodeURIComponent(destination)}&check_in=${checkIn}&check_out=${checkOut}&rooms=${rooms}&adults=${adults}`);
  };

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    if (newCheckIn >= checkOut) {
      const nextDay = getNextDay(newCheckIn);
      setCheckOut(nextDay);
    }
  };

  return (
    <section className="hotel-search-bar">
      <form onSubmit={handleSearch} className="search-container">
        <div className="search-field">
          <div className="input-with-icon">
            <img src={bed} className="input-bed" alt="Destination" />
            <input
              type="text"
              placeholder="Enter Destination"
              className="destination-input"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        <div className="search-field">
          <div className="input-with-icon">
            <input
              type="date"
              value={checkIn}
              onChange={handleCheckInChange}
              className="check-in-input"
              min={new Date().toISOString().split('T')[0]}
            />
            <img src={calendar} className="calendar-icon" alt="Calendar" />
          </div>
        </div>

        <div className="search-field">
          <div className="input-with-icon">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="check-out-input"
              min={getNextDay(checkIn)}
            />
            <img src={calendar} className="calendar-icon" alt="Calendar" />
          </div>
        </div>

        <div className="search-field guests-dropdown">
          <div className="input-with-icon">
            <img src={icon} className="input-icon" alt="Guests" />
            <select
              value={guestsOption}
              onChange={(e) => setGuestsOption(e.target.value)}
              className="guests-select"
            >
              <option value="1 room, 1 guest">1 room, 1 guest</option>
              <option value="1 room, 2 guests">1 room, 2 guests</option>
              <option value="2 rooms, 4 guests">2 rooms, 4 guests</option>
              <option value="3 rooms, 6 guests">3 rooms, 6 guests</option>
            </select>
            <img src={arrow} className="dropdown-arrow" alt="Expand" />
          </div>
        </div>

        <button type="submit" className="hotel-search-button">
          <img src={loop} className="hotel-search-icon" alt="Search" />
        </button>
      </form>
    </section>
  );
}

export default HotelSearchBar;