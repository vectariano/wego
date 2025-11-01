import React from "react";
import LandingHeader from "../components/LandingHeader.jsx";
import Hero from "../components/Hero.jsx";
import SearchFlight from "../components/SearchFlight.jsx";
import TravelDestinations from "../components/TravelDestinations.jsx";
import Footer from "../components/Footer.jsx";
import bg from "../static/img/philipp-hubert-49HXZgSBV-U-unsplash.jpg";


function FlightsPage() {
    return (
        <div className="flights-page">
            <LandingHeader />
            <Hero bg={bg}/>
            <SearchFlight />
            <TravelDestinations/>
            <Footer/>
        </div>
    );
}

export default FlightsPage;