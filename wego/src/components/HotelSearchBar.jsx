import React from "react";
import { useNavigate } from "react-router-dom";
import bed from "../static/img/bed.png";
import calendar from "../static/img/calendar.png";
import icon from "../static/img/icon.png";
import arrow from "../static/img/arrow.png";
import loop from "../static/img/loop.png";

function HotelSearchBar() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels");
  };

  return (
    <section className="hotel-search-bar">
      <div className="search-container">
        <div className="search-field">
          <div className="input-with-icon">
            <img src={bed} className="input-bed" alt="Destination" />
            <input
              type="text"
              placeholder="Enter Destination"
              className="destination-input"
            />
          </div>
        </div>

        <div className="search-field">
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Check In"
              className="check-in-input"
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
            />
            <img src={calendar} className="calendar-icon" alt="Calendar" />
          </div>
        </div>

        <div className="search-field guests-dropdown">
          <div className="input-with-icon">
            <img src={icon} className="input-icon" alt="Guests" />
            <select defaultValue="1 room, 2 guests" className="guests-select">
              <option>1 room, 2 guests</option>
              <option>2 rooms, 4 guests</option>
              <option>1 room, 1 guest</option>
              <option>3 rooms, 6 guests</option>
            </select>
            <img src={arrow} className="dropdown-arrow" alt="Expand" />
          </div>
        </div>

        <button className="hotel-search-button" onClick={handleSearch}>
          <img src={loop} className="hotel-search-icon" alt="Search" />
        </button>
      </div>
    </section>
  );
}

export default HotelSearchBar;