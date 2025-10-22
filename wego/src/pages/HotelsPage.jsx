import React from "react";
import LandingHeader from "../components/LandingHeader.jsx";
import GreetSection from "../components/GreetSection.jsx";
import HotelSearch from "../components/HotelSearch.jsx";
import TravelDestinations from "../components/TravelDestinations.jsx";
import Footer from "../components/Footer.jsx";

function HotelsPage() {
  return (
    <div className="hotel-page">
      <LandingHeader />
      <GreetSection />
      <HotelSearch />
      <TravelDestinations />
      <Footer />
    </div>
  );
}

export default HotelsPage;