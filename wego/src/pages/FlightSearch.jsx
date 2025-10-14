import React from "react";
import LandingHeader from "../components/LandingHeader";
import Hero from "../components/Hero.jsx";
import TravelDestinations from "../components/TravelDestinations.jsx";
import Footer from "../components/Footer.jsx";


function FlightsPage() {
    return (
        <div className="flights-page">
           <LandingHeader />
            <Hero />
            <TravelDestinations/>
            <Footer/>
        </div>
    );
}

export default FlightsPage;