import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bed from "../static/img/bed.png";
import calendar from "../static/img/calendar.png";
import icon from "../static/img/icon.png";
import arrow from "../static/img/arrow.png";
import loop from "../static/img/loop.png";

function HotelSearchBar() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState("1 room, 2 guests");

  const handleSearch = (e) => {
    e.preventDefault();
    let adults = 2;
    if (guests === "1 room, 1 guest") adults = 1;
    else if (guests === "2 rooms, 4 guests") adults = 4;
    else if (guests === "3 rooms, 6 guests") adults = 6;
    navigate(`/hotels?adults=${adults}`);
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
              defaultValue="Bali Resorts"
              readOnly
            />
          </div>
        </div>

        <div className="search-field">
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Check In"
              className="check-in-input"
              readOnly
            />
            <img src={calendar} className="calendar-icon" alt="Calendar" />
          </div>
        </div>

        <div className="search-field">
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Check Out"
              className="check-out-input"
              readOnly
            />
            <img src={calendar} className="calendar-icon" alt="Calendar" />
          </div>
        </div>

        <div className="search-field guests-dropdown">
          <div className="input-with-icon">
            <img src={icon} className="input-icon" alt="Guests" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="guests-select"
            >
              <option>1 room, 2 guests</option>
              <option>2 rooms, 4 guests</option>
              <option>1 room, 1 guest</option>
              <option>3 rooms, 6 guests</option>
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