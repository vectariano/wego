
import React from "react";
import Header from "../components/Header.jsx";
import GreetSection from "./GreetSection.jsx";
import SearchForm from "../components/SearchForm.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
    return (
        <div className="home-screen">
            <Header /> 
            <GreetSection />
            <SearchForm />
            <Footer/>
        </div>
    );
}

export default Home;