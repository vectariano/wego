import React from "react";
import logo from "../static/img/logo-black-fix.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4 className="footer-heading">Our Destinations</h4>
          <ul className="footer-links">
            <li><a href="/canada" className="footer-link">Canada</a></li>
            <li><a href="/alaska" className="footer-link">Alaska</a></li>
            <li><a href="/france" className="footer-link">France</a></li>
            <li><a href="/iceland" className="footer-link">Iceland</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Our Activities</h4>
          <ul className="footer-links">
            <li><a href="/northern-lights" className="footer-link">Northern Lights</a></li>
            <li><a href="/cruising" className="footer-link">Cruising & sailing</a></li>
            <li><a href="/multi-activities" className="footer-link">Multi-activities</a></li>
            <li><a href="/kayaking" className="footer-link">Kayaking</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Travel Blogs</h4>
          <ul className="footer-links">
            <li><a href="/bali-guide" className="footer-link">Bali Travel Guide</a></li>
            <li><a href="/sri-lanka-guide" className="footer-link">Sri Lanka Travel Guide</a></li>
            <li><a href="/peru-guide" className="footer-link">Peru Travel Guide</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">About Us</h4>
          <ul className="footer-links">
            <li><a href="/our-story" className="footer-link">Our Story</a></li>
            <li><a href="/work-with-us" className="footer-link">Work with us</a></li>
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <img src={logo} alt="Wego" className="footer-logo" />
          <p className="footer-text">Email: support@wego.com</p>
          <p className="footer-text">Phone: +1 (800) 123-4567</p>
        </div>
      </div>

      <div className="footer-copyright">
        © 2025 Wego. By travelers for travelers.
      </div>
    </footer>
  );
}

export default Footer;