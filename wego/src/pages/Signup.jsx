import React from "react";
import logo from "../static/img/dark-logo.png"
import img from "../static/img/clay-banks-O5hfuVWgsS8-unsplash.jpg"

function SignUp() {
    return (
        <div className="signup-flex">
            <section className="images-section">
                <img src={img} className="signup-img" alt="img" />
            </section>

            <section className="signup-section-flex">
                <img src={logo} className="dark-logo" alt="logo" />
                <div className="signup-text-div">
                    <h1>Sign up</h1>
                    <h2>Let's get you all set up so you can access your personal account</h2>
                </div>

                <form className="signup-form">
                    <div className="name-div-flex">
                        <div className="fn">
                            <label className="first-name-label">First name</label>
                            <input className="first-name" />
                        </div>

                        <div className="ln">
                            <label className="last-name-label">Last name</label>
                            <input className="last-name" />
                        </div>
                    </div>

                    <div className="email-phone-div-flex">
                        <div className="em">
                            <label className="signup-email-label">Email</label>
                            <input className="signup-email" />
                        </div>

                        <div className="ph">
                            <label className="phone-label">Phone Number</label>
                            <input className="phone" />
                        </div>
                    </div>

                    <div className="signup-password-div">
                        <div className="pass">
                            <label className="password-label">Password</label>
                            <input className="password" type="password" />
                        </div>

                        <div className="conf-pass">
                            <label className="confirm-password-label">Confirm Password</label>
                            <input className="password" type="password" />
                        </div>
                    </div>
                </form>

                <button className="signup-access-button">Create account</button>

            </section>
        </div>
    );
}

export default SignUp;