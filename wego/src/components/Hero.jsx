import React from "react";
import bg from "../static/img/shai-pal-_DWU4FibLF0-unsplash.jpg";
import SearchFlight from "../components/SearchFlight";

function Hero() {
  return (
    <div className="greetings">
      <img src={bg} alt="background" className="bg-img" />

      <div className="hero-text">
        <h1>Make your travel wishlist, we'll do the rest</h1>
        <p>Special offers to suit your plan</p>
      </div>

      <SearchFlight />
    </div>
  );
}

export default Hero;