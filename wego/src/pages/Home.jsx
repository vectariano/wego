
import React from "react";
import Header from "../components/Header.jsx";
import GreetSection from "../components/GreetSection";
import SearchForm from "../components/SearchForm.jsx";
import Footer from "../components/Footer.jsx";
import FlightsHotels from "../components/Flights-Hotel.jsx";

function Home() {
    return (
        <div className="home-screen">
            <Header /> 
            <GreetSection />
            <SearchForm />
            <FlightsHotels />
            <Footer/>
        </div>
    );
}

export default Home;