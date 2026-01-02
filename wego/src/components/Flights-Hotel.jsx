import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import airport from "../static/img/yousef-alfuhigi-bMIlyKZHKMY-unsplash.jpg";
import hotel from "../static/img/rakabtw_-M3YuHIpgmSY-unsplash.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FlightsHotels() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stays");
  const [fromTo, setFromTo] = useState("");
  const [trip, setTrip] = useState("round-trip");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [passengerClass, setPassengerClass] = useState("2 adults - Economy");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 2)));
  const [rooms, setRooms] = useState(1);

  const handleShowFlights = () => {
    if (activeTab === "flights") {
      // Извлекаем количество пассажиров из passengerClass
      const passengers = parseInt(passengerClass);
      
      const params = new URLSearchParams({
        from: fromTo.split("-")[0]?.trim() || "PEK",
        to: fromTo.split("-")[1]?.trim() || "LAX",
        trip,
        depart_date: formatDate(departDate),
        return_date: trip === "round-trip" ? formatDate(returnDate) : formatDate(departDate),
        adults: passengers || 1,
        class: passengerClass.includes("Business") ? "business" : "economy"
      });
      
      navigate(`/flights?${params.toString()}`);
    }
  };

  const handleShowHotels = () => {
    if (activeTab === "stays") {
      // Извлекаем количество взрослых из passengerClass
      let adults = 2;
      if (passengerClass.includes("1 adult")) adults = 1;
      else if (passengerClass.includes("3 adults")) adults = 3;
      else if (passengerClass.includes("4 adults")) adults = 4;

      const params = new URLSearchParams({
        destination: fromTo || "Bali Resorts",
        check_in: formatDate(checkInDate),
        check_out: formatDate(checkOutDate),
        adults: adults.toString(),
        rooms: rooms.toString()
      });
      
      navigate(`/hotels?${params.toString()}`);
    }
  };

  const handleShowMainButton = () => {
    if (activeTab === "flights") {
      handleShowFlights();
    } else {
      handleShowHotels();
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Функция для разбора строки пассажиров и класса
  const parsePassengerClass = (value) => {
    const match = value.match(/(\d+)\s+adult.*-\s*(.*)/i);
    if (match) {
      return {
        adults: parseInt(match[1]),
        class: match[2].toLowerCase()
      };
    }
    return { adults: 2, class: "economy" };
  };

  return (
    <>
      <div className="search">
        <div className="search-flex">

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

          <div className="search-fields-row">
            {activeTab === "flights" ? (
              <>
                <div className="from-to">
                  <label>From - To</label>
                  <input
                    type="text"
                    placeholder="PEK - LAX"
                    value={fromTo}
                    onChange={(e) => setFromTo(e.target.value)}
                  />
                </div>

                <div className="trip">
                  <label>Trip</label>
                  <select
                    value={trip}
                    onChange={(e) => setTrip(e.target.value)}
                  >
                    <option value="one-way">One-way</option>
                    <option value="round-trip">Round-trip</option>
                  </select>
                </div>

                <div className="depart-return">
                  <label>Depart Date</label>
                  <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    className="date-picker-input"
                  />
                  {trip === "round-trip" && (
                    <>
                      <label style={{ marginTop: '10px' }}>Return Date</label>
                      <DatePicker
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={departDate}
                        className="date-picker-input"
                      />
                    </>
                  )}
                </div>

                <div className="passenger-class">
                  <label>Passengers & Class</label>
                  <select
                    value={passengerClass}
                    onChange={(e) => setPassengerClass(e.target.value)}
                  >
                    <option value="1 adult - Economy">1 adult - Economy</option>
                    <option value="2 adults - Economy">2 adults - Economy</option>
                    <option value="3 adults - Economy">3 adults - Economy</option>
                    <option value="4 adults - Economy">4 adults - Economy</option>
                    <option value="1 adult - Business">1 adult - Business</option>
                    <option value="2 adults - Business">2 adults - Business</option>
                    <option value="3 adults - Business">3 adults - Business</option>
                    <option value="4 adults - Business">4 adults - Business</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="from-to">
                  <label>Destination</label>
                  <input
                    type="text"
                    placeholder="Bali Resorts, New York, Paris..."
                    value={fromTo}
                    onChange={(e) => setFromTo(e.target.value)}
                  />
                </div>

                <div className="depart-return">
                  <label>Check-in Date</label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    className="date-picker-input"
                  />
                  <label style={{ marginTop: '10px' }}>Check-out Date</label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={checkInDate}
                    className="date-picker-input"
                  />
                </div>

                <div className="passenger-class">
                  <label>Guests</label>
                  <select
                    value={passengerClass}
                    onChange={(e) => setPassengerClass(e.target.value)}
                  >
                    <option value="1 adult - Economy">1 adult</option>
                    <option value="2 adults - Economy">2 adults</option>
                    <option value="3 adults - Economy">3 adults</option>
                    <option value="4 adults - Economy">4 adults</option>
                  </select>
                </div>

                <div className="rooms">
                  <label>Rooms</label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value))}
                  >
                    <option value="1">1 room</option>
                    <option value="2">2 rooms</option>
                    <option value="3">3 rooms</option>
                    <option value="4">4 rooms</option>
                  </select>
                </div>
              </>
            )}
          </div>

        </div>

        <div className="bottom-buttons-flex-right">
          <button className="show-button" onClick={handleShowMainButton}>
            Show {activeTab === "flights" ? "Flights" : "Hotels"}
          </button>
        </div>
      </div>

      <div className="flights-hotels-flex">
        <div className="airport-img">
          <img src={airport} className="airport-hotel-img" alt="Flights" />
          <h2 className="airport-hotel-text">Flights</h2>
          <h3 className="search-airport-hotel-text">
            Search Flights & Places Hire to our most popular <br />
            destinations
          </h3>
          <button 
            className="show-button" 
            onClick={() => {
              setActiveTab("flights");
              setTimeout(() => {
                handleShowFlights();
              }, 100);
            }}
          >
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
          <button 
            className="show-button" 
            onClick={() => {
              setActiveTab("stays");
              setTimeout(() => {
                handleShowHotels();
              }, 100);
            }}
          >
            Show Hotels
          </button>
        </div>
      </div>
    </>
  );
}

export default FlightsHotels;