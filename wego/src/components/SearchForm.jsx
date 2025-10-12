import React from "react";
import plane from "../static/img/airplaneb.png";
import sleeping from "../static/img/sleepingb.png";

function SearchForm() {

    const buttonStyle = {
        color: "black"
    };

    return (
        <section className="search">
            <div className="head-buttons-flex">
                <button className="flights-button"
                    style={buttonStyle}>
                    <img src={plane} className="plane-img" alt="plane"
                    />
                    Flights
                </button>

                <button className="stays-button"
                    style={buttonStyle}>
                    <img src={sleeping} className="sleep-img" alt="plane" />
                    Stays
                </button>
            </div>
            <div className="search-flex">

                <div className="from-to">
                    <label className="from-to-label">From - To</label>
                    <input className="ft-border" />
                </div>

                <div className="trip">
                    <label className="trip-label">Trip</label>
                    <input className="trip-border" />
                </div>

                <div className="depart-return">
                    <label className="depart-return-label">Depart-Return</label>
                    <input className="dr-border" />
                </div>

                <div className="passenger-class">
                    <label className="passenger-class-label">Passenger-Class</label>
                    <input className="pc-border" />
                </div>
            </div>
            <div className="bottom-buttons-flex">
                <button className="promo-button" style={buttonStyle}>
                    + Add Promo Code
                </button>

                <button className="show-button" style={buttonStyle}>
                    Show
                </button>
            </div>
            
        </section>
    );
}

export default SearchForm;