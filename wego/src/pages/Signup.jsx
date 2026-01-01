// SignUp.js
import React from "react";
import logo from "../static/img/dark-logo.png";
import img from "../static/img/clay-banks-O5hfuVWgsS8-unsplash.jpg";

function SignUp() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = document.querySelector('.first-name').value;
        const lastName = document.querySelector('.last-name').value;
        const email = document.querySelector('.signup-email').value;
        const password = document.querySelector('.password').value;
        const confirmPassword = document.querySelector('.confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/auth/signup/', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = '/login';
            } else {
                alert(`Error: ${data.error || 'Registration failed'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

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

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="name-div-flex">
                        <div className="fn">
                            <label className="first-name-label">First name</label>
                            <input className="first-name" required />
                        </div>
                        <div className="ln">
                            <label className="last-name-label">Last name</label>
                            <input className="last-name" required />
                        </div>
                    </div>

                    <div className="email-phone-div-flex">
                        <div className="em">
                            <label className="signup-email-label">Email</label>
                            <input className="signup-email" type="email" required />
                        </div>
                        <div className="ph">
                            <label className="phone-label">Phone Number</label>
                            <input className="phone" />
                        </div>
                    </div>

                    <div className="signup-password-div">
                        <div className="pass">
                            <label className="password-label">Password</label>
                            <input className="password" type="password" required />
                        </div>
                        <div className="conf-pass">
                            <label className="confirm-password-label">Confirm Password</label>
                            <input className="confirm-password" type="password" required />
                        </div>
                    </div>
                </form>

                <button className="signup-access-button" onClick={handleSubmit}>
                    Create account
                </button>
            </section>
        </div>
    );
}

export default SignUp;