import React from "react";
import { useNavigate } from "react-router-dom";

function HotelSearch() {
  const navigate = useNavigate();

  const handleSearch = () => {

    navigate("/hotels");
  };

  return (
    <section className="hotel-search">
      <div className="hotel-search-header">
        <h3>Book your stay</h3>
      </div>

      <div className="hotel-search-flex">
        <div className="destination">
          <label className="destination-label">Destination</label>
          <input className="dest-border" />
        </div>

        <div className="check-in-out">
          <label className="check-in-out-label">Check-in – Check-out</label>
          <input className="cio-border" />
        </div>

        <div className="guests-rooms">
          <label className="guests-rooms-label">Guests – Rooms</label>
          <input className="gr-border" />
        </div>
      </div>

      <div className="hotel-bottom-buttons-flex">
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
}

export default HotelSearch;