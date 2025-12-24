// src/components/Flights-Hotel.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import airport from "../static/img/yousef-alfuhigi-bMIlyKZHKMY-unsplash.jpg";
import hotel from "../static/img/rakabtw_-M3YuHIpgmSY-unsplash.jpg";

function FlightsHotels() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stays");

  // Состояния для полей
  const [fromTo, setFromTo] = useState("");
  const [trip, setTrip] = useState("round-trip");
  const [departReturn, setDepartReturn] = useState("");
  const [passengerClass, setPassengerClass] = useState("2 adults - Economy");

  const handleShow = () => {
    if (activeTab === "flights") {
      const params = new URLSearchParams({
        from_to: fromTo || "New York - London",
        trip,
        depart_return: departReturn || "2025-12-01 - 2025-12-15",
        passenger_class: passengerClass
      });
      navigate(`/flights?${params.toString()}`);
    } else {
      let adults = 2;
      if (passengerClass.includes("1 guest")) adults = 1;
      else if (passengerClass.includes("4 guests")) adults = 4;
      else if (passengerClass.includes("6 guests")) adults = 6;

      const params = new URLSearchParams({
        q: fromTo || "Bali Resorts",
        adults: adults.toString()
      });
      navigate(`/hotels?${params.toString()}`);
    }
  };

  return (
    <>
      {/* Форма поиска — 100% в стиле твоего CSS */}
      <div className="search">
        <div className="search-flex">
          {/* Вкладки Flights / Stays */}
          <div className="head-buttons-flex">
            <button
              className="flights-button"
              onClick={() => setActiveTab("flights")}
              style={{
                color: activeTab === "flights" ? "#69c7b3" : "#666",
                fontWeight: "600"
              }}
            >
              Flights
            </button>
            <button
              className="stays-button"
              onClick={() => setActiveTab("stays")}
              style={{
                color: activeTab === "stays" ? "#69c7b3" : "#666",
                fontWeight: "600"
              }}
            >
              Stays
            </button>
          </div>

          {/* From - To */}
          <div className="from-to">
            <label>From - To</label>
            <input
              type="text"
              placeholder={activeTab === "flights" ? "PEK - AUS" : "Bali, Paris..."}
              value={fromTo}
              onChange={(e) => setFromTo(e.target.value)}
            />
          </div>

          {/* Trip */}
          <div className="trip">
            <label>Trip</label>
            <input
              type="text"
              placeholder="Round-trip"
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
            />
          </div>

          {/* Depart - Return */}
          <div className="depart-return">
            <label>Depart - Return</label>
            <input
              type="text"
              placeholder="2025-12-01 - 2025-12-15"
              value={departReturn}
              onChange={(e) => setDepartReturn(e.target.value)}
            />
          </div>

          {/* Passenger - Class */}
          <div className="passenger-class">
            <label>Passenger - Class</label>
            <input
              type="text"
              placeholder="2 adults - Economy"
              value={passengerClass}
              onChange={(e) => setPassengerClass(e.target.value)}
            />
          </div>
        </div>

        {/* Кнопки внизу */}
        <div className="bottom-buttons-flex">
          <button className="promo-button">+ Add Promo Code</button>
          <button className="show-button" onClick={handleShow}>
            Show
          </button>
        </div>
      </div>

      {/* Карточки */}
      <div className="flights-hotels-flex">
        <div className="airport-img">
          <img src={airport} className="airport-hotel-img" alt="Flights" />
          <h2 className="airport-hotel-text">Flights</h2>
          <h3 className="search-airport-hotel-text">
            Search Flights & Places Hire to our most popular <br />
            destinations
          </h3>
          <button className="show-button" onClick={() => navigate("/flights")}>
            Show Flights
          </button>
        </div>

        <div className="hotels-img">
          <img src={hotel} className="airport-hotel-img" alt="Hotels" />
          <h2 className="airport-hotel-text">Hotels</h2>
          <h3 className="search-airport-hotel-text">
            Search hotels & Places Hire to our most popular <br />
            destinations
          </h3>
          <button className="show-button" onClick={() => navigate("/hotels")}>
            Show Hotels
          </button>
        </div>
      </div>
    </>
  );
}

export default FlightsHotels;