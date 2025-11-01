import React, { useState, useEffect } from "react";
import logo from "../static/img/logo.png";
import plane from "../static/img/airplane.png";
import sleeping from "../static/img/sleeping.png";
import { Link } from "react-router-dom";

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/auth/me/', {
                    credentials: 'include'
                });
                setIsAuthenticated(res.ok);
            } catch {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await fetch('http://localhost:8000/api/auth/logout/', {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/';
    };

    return (
        <header className="header-flex">
            <nav className="left-flex-navigation">
                <Link to="/flights" className="flights-button">
                    <img src={plane} className="plane-img" alt="plane" />
                    Find Flights
                </Link>
                <Link to="/stays" className="stays-button">
                    <img src={sleeping} className="sleep-img" alt="sleeping" />
                    Find Stays
                </Link>
            </nav>

            <Link to="/" className="home">
                <img src={logo} className="main-logo" alt="logo" />
            </Link>

            <div className="user-corner">
                {isAuthenticated ? (
                    <>
                        <span className="account">Account</span>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/signup" className="signup">Sign up</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;