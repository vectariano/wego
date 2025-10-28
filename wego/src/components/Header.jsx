import React from "react";
import logo from "../static/img/logo.png";
import plane from "../static/img/airplane.png";
import { Link } from "react-router-dom";
import sleeping from "../static/img/sleeping.png";

function Header() {

    return (
        <header className="header-flex">
            <nav className="left-flex-navigation">

                <Link to="/flights" className="flights-button">
                    <img src={plane} className="plane-img" alt="plane" />
                    Find Flights
                </Link>
                <Link to="/stays" className="stays-button">
                    <img src={sleeping} className="sleep-img" alt="plane" />
                    Find Stays
                </Link>
            </nav>

            <Link to="/" className="home"><img src={logo} className="main-logo" alt="logo" /></Link>
            

            <div className="user-corner">
                <Link to="/login" className="login">Login</Link>
                <Link to="/signup" className="signup">Sign up</Link>
            </div>
        </header>
    );
}

export default Header;