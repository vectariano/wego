import React from "react";
import LandingHeader from "../components/LandingHeader.jsx";
import Hero from "../components/Hero.jsx";
import HotelSearch from "../components/HotelSearch.jsx";
import TravelDestinations from "../components/TravelDestinations.jsx";
import Footer from "../components/Footer.jsx";
import bg from "../static/img/omar-ramadan-FRxIiuy-O7A-unsplash.jpg";

function HotelsPage() {
  return (
    <div className="hotel-page">
      <LandingHeader />
      <Hero bg={bg}/>
      <HotelSearch />
      <TravelDestinations />
      <Footer />
    </div>
  );
}

export default HotelsPage;