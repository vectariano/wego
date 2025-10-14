import React from "react";

function SearchFlight() {
  return (
    <section className="search">
      <div className="search-header">
        <h3>Where are you flying?</h3>
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
        <button className="show-button">Show</button>
      </div>
    </section>
  );
}

export default SearchFlight;