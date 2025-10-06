import React from "react";
import bg from "../static/img/shai-pal-_DWU4FibLF0-unsplash.jpg";

function GreetSection() {
    return (
        <section className="greetings">
            <img src={bg} alt="background" className="bg-img" />
            <div className="greet-string">
                <h2 className="text1">Helping Others</h2>
                <h1 className="text2">LIVE & TRAVEL</h1>
                <h3 className="text3">Special offers to suit your plan</h3>
            </div>
        </section>
    );
}

export default GreetSection;