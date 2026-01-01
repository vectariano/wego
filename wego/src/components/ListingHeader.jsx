import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import airplaneb from "../static/img/airplaneb.png";
import sleepingb from "../static/img/sleepingb.png";

function ListingHeader() {
  const [activeTab, setActiveTab] = useState("flights");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes("/flight") || path === "/flights" || path.startsWith("/flight/")) {
      setActiveTab("flights");
    } 
    else if (path.includes("/hotel") || path === "/hotels" || path.startsWith("/hotel/")) {
      setActiveTab("stays");
    }
    else if (path === "/") {
      setActiveTab("flights");
    }
  }, [location.pathname]);


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

      <div className="right-user">
        <Link to="/favourites" className="favourites-link">
          Favourites
        </Link>
      </div>
    </header>
  );
}

export default ListingHeader;