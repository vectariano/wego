import React, { useState } from "react";
import logo from "../static/img/logo.png";
import plane from "../static/img/airplane.png";
import sleeping from "../static/img/sleeping.png";

function LandingHeader() {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <header className="landing-header">
      <nav className="landing-nav">
        <button
          className={`flights-buttonik ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          <img src={plane} className="plane-img" alt="Flights" />
          Find Flights
        </button>
        <button
          className={`stays-buttonik ${activeTab === "stays" ? "active" : ""}`}
          onClick={() => setActiveTab("stays")}
        >
          <img src={sleeping} className="sleep-img" alt="Stays" />
          Find Stays
        </button>
      </nav>

      <img src={logo} className="main-logo" alt="WeGo" />

      <div className="landing-auth">
        <button className="loginik">Login</button>
        <button className="signupik">Sign up</button>
      </div>
    </header>
  );
}

export default LandingHeader;