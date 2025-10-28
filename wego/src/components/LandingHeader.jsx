import React, { useState, useEffect } from "react";
import logo from "../static/img/logo.png";
import plane from "../static/img/airplane.png";
import sleeping from "../static/img/sleeping.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function LandingHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("flights");

  useEffect(() => {
    if (location.pathname === "/stays") {
      setActiveTab("stays");
    } else {
      setActiveTab("flights");
    }
  }, [location.pathname]);

  const handleFlightsClick = () => {
    setActiveTab("flights");
    navigate("/flights");
  };

  const handleStaysClick = () => {
    setActiveTab("stays");
    navigate("/stays");
  };

  return (
    <header className="landing-header">
      <nav className="landing-nav">
        <button
          type="button"
          className={`flights-buttonik ${activeTab === "flights" ? "active" : ""}`}
          onClick={handleFlightsClick}
        >
          <img src={plane} className="plane-img" alt="Flights" />
          Find Flights
        </button>
        <button
          type="button"
          className={`stays-buttonik ${activeTab === "stays" ? "active" : ""}`}
          onClick={handleStaysClick}
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