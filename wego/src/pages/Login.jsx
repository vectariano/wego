// Login.js
import React from "react";
import logo from "../static/img/dark-logo.png";
import img from "../static/img/rakabtw_-M3YuHIpgmSY-unsplash.jpg";

function Login() {
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;

        try {
            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                const userData = {
                    id: data.user?.id || Date.now(),
                    name: data.user?.name || email.split('@')[0],
                    email: email,
                    token: data.token || 'default_token'
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                window.location.href = '/';
            } else {
                const data = await response.json();
                alert('Login failed: ' + (data.error || 'Invalid email or password'));
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Something went wrong. Check console for details.');
        }
    };

    return (
        <div className="login-flex">
            <section className="login-section-flex">
                <img src={logo} className="dark-logo" alt="logo" />
                <div className="login-text-div">
                    <h1>Login</h1>
                    <h2>Login to access your WeGo account</h2>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="email-div">
                        <label className="email-label">Email</label>
                        <input className="email" type="email" required />
                    </div>
                    <div className="password-div">
                        <label className="password-label">Password</label>
                        <input className="password" type="password" required />
                    </div>
                </form>

                <button className="login-access-button" onClick={handleLogin}>
                    Login
                </button>
            </section>

            <section className="images-section">
                <img src={img} className="login-img" alt="img" />
            </section>
        </div>
    );
}

export default Login;