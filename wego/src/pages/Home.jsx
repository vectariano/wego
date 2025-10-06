
import React from "react";
import Header from "../components/Header.jsx";
import GreetSection from "./GreetSection.jsx";

function Home() {
    return (
        <div className="home-screen">
            <Header /> 
            <GreetSection />
        </div>
    );
}

export default Home;