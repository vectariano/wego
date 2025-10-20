import React from "react";
import logo from "../static/img/dark-logo.png"
import img from "../static/img/rakabtw_-M3YuHIpgmSY-unsplash.jpg"

function Login() {
    return (
        <div className="login-flex">
            <section className="login-section-flex">
                <img src={logo} className="dark-logo" alt="logo" />
                <div className="login-text-div">
                    <h1>Login</h1>
                    <h2>Login to access your WeGo account</h2>
                </div>

                <form className="login-form">
                    <div className="email-div">
                        <label className="email-label">Email</label>
                        <input className="email" />
                    </div>

                    <div className="password-div">
                        <label className="password-label">Password</label>
                        <input className="password" type="password" />
                    </div>
                </form>

                <button className="login-access-button">Login</button>

            </section>

            <section className="images-section">
                <img src={img} className="login-img" alt="img" />
            </section>
        </div>
    );
}

export default Login;