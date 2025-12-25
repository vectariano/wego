import React, { useState } from "react";

function HotelSearch() {
  const [destination, setDestination] = useState("Bali Resorts");
  const [checkIn, setCheckIn] = useState("2025-12-24");
  const [checkOut, setCheckOut] = useState("2025-12-26");
  const [guestsOption, setGuestsOption] = useState("1 room, 2 guests");

  const handleSearch = () => {
    // Парсим выбранную опцию
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
    }
    
    // Перенаправляем с параметрами
    window.location.href = `/hotels?destination=${encodeURIComponent(destination)}&check_in=${checkIn}&check_out=${checkOut}&rooms=${rooms}&adults=${adults}`;
  };

  const getNextDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    if (newCheckIn >= checkOut) {
      setCheckOut(getNextDay(newCheckIn));
    }
  };

  return (
    <section className="hotel-search">
      <div className="hotel-search-header">
        <h3>Book your stay</h3>
      </div>

      <div className="hotel-search-flex">
        <div className="destination">
          <label className="destination-label">Destination</label>
          <input 
            className="dest-border" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>

        <div className="check-in-out">
          <label className="check-in-out-label">Check-in – Check-out</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input 
              type="date"
              className="cio-border" 
              value={checkIn}
              onChange={handleCheckInChange}
              min={new Date().toISOString().split('T')[0]}
              style={{ flex: 1 }}
            />
            <span style={{ alignSelf: "center" }}>–</span>
            <input 
              type="date"
              className="cio-border" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={getNextDay(checkIn)}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="guests-rooms">
          <label className="guests-rooms-label">Guests – Rooms</label>
          <select 
            className="gr-border" 
            value={guestsOption}
            onChange={(e) => setGuestsOption(e.target.value)}
          >
            <option value="1 room, 1 guest">1 room, 1 guest</option>
            <option value="1 room, 2 guests">1 room, 2 guests</option>
            <option value="2 rooms, 4 guests">2 rooms, 4 guests</option>
            <option value="3 rooms, 6 guests">3 rooms, 6 guests</option>
          </select>
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