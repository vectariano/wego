import React from "react";
import LandingHeader from "../components/LandingHeader.jsx";
import GreetSection from "../components/GreetSection.jsx";
import TravelDestinations from "../components/TravelDestinations.jsx";
import Footer from "../components/Footer.jsx";


function FlightsPage() {
    return (
        <div className="flights-page">
            <LandingHeader />
            <GreetSection />
            <TravelDestinations/>
            <Footer/>
        </div>
    );
}

export default FlightsPage;