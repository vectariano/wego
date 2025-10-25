import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import airplaneb from "../static/img/airplaneb.png";
import sleepingb from "../static/img/sleepingb.png";

function ListingHeader() {
  const [activeTab, setActiveTab] = useState("flights");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/flights") {
      setActiveTab("flights");
    } else if (location.pathname === "/stays") {
      setActiveTab("stays");
    }
  }, [location.pathname]);

  const user = {
    name: "Tony S.",
    avatar: "https://i.pinimg.com/originals/6e/2f/5f/6e2f5f95a7d6fad85d2eea30fb89c08e.jpg"
  };

  return (
    <header className="listing-header">

      <nav className="left-nav">
        <Link
          to="/flights"
          className={`nav-link ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          <img src={airplaneb} className="nav-icon" alt="Flights" />
          Find Flights
        </Link>
        <Link
          to="/hotels"
          className={`nav-link ${activeTab === "stays" ? "active" : ""}`}
          onClick={() => setActiveTab("stays")}
        >
          <img src={sleepingb} className="nav-icon" alt="Stays" />
          Find Stays
        </Link>
      </nav>

    
      <div className="logo-text">
        We<span className="logo-accent">G</span>o
      </div>

      {/* Правая часть */}
      <div className="right-user">
        <Link to="/favourites" className="favourites-link">
          <span className="heart-icon">❤️</span>
          Favourites
        </Link>
        <span className="separator">|</span>
        <div className="user-profile">
          <img src={user.avatar} className="avatar" alt="User" />
          <span className="username">{user.name}</span>
        </div>
      </div>
    </header>
  );
}

export default ListingHeader;