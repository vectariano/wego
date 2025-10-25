import React, { useState, useEffect } from "react";
import logo from "../static/img/logo.png";
import plane from "../static/img/airplane.png";
import { Link, useLocation } from "react-router-dom";
import sleeping from "../static/img/sleeping.png";

function LandingHeader() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("flights");

  // При первой загрузке — установить вкладку в зависимости от URL
  useEffect(() => {
    if (location.pathname === "/stays") {
      setActiveTab("stays");
    } else {
      setActiveTab("flights");
    }
  }, [location.pathname]);

  return (
    <header className="landing-header">
      <nav className="landing-nav">
        <button
          type="button"
          className={`flights-buttonik ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          <img src={plane} className="plane-img" alt="Flights" />
          Find Flights
        </button>
        <button
          type="button"
          className={`stays-buttonik ${activeTab === "stays" ? "active" : ""}`}
          onClick={() => setActiveTab("stays")}
        >
          <img src={sleeping} className="sleep-img" alt="Stays" />
          Find Stays
        </button>
      </nav>

      <Link to="/" className="home">
        <img src={logo} className="main-logo" alt="logo" />
      </Link>

      <div className="user-corner">
        <Link to="/login" className="login">Login</Link>
        <Link to="/signup" className="signup">Sign up</Link>
      </div>
    </header>
  );
}

export default LandingHeader;