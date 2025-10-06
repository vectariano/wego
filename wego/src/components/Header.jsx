import React from "react";
import logo from "../static/img/logo.png";
import plane from "../static/img/airplane.png";
import sleeping from "../static/img/sleeping.png";

function Header() {

    return (
        <header className="header-flex">
            <nav className="left-flex-navigation">
                <a href="/flights" className="flights-button">
                    <img src={plane} className="plane-img" alt="plane"/>
                    Find Flights
                </a>
                <a href="/stays" className="stays-button">
                    <img src={sleeping} className="sleep-img" alt="plane" />
                    Find Stays
                </a>
            </nav>

            <img src={logo} className="main-logo" alt="logo" />

            <div className="user-corner">
                <button className="login">Login</button>
                <button className="signup">Sign up</button>
            </div>
        </header>
    );
}

export default Header;