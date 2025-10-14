import React from "react";
import melbourneImg from "../static/img/Mel.jpg";
import parisImg from "../static/img/Paris.jpg";
import londonImg from "../static/img/London.jpg";
import columbiaImg from "../static/img/Colombia.jpg";

function TravelDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Melbourne",
      description: "An amazing journey",
      price: "$700",
      image: melbourneImg,
    },
    {
      id: 2,
      name: "Paris",
      description: "A Paris Adventure",
      price: "$600",
      image: parisImg,
    },
    {
      id: 3,
      name: "London",
      description: "London eye adventure",
      price: "$350",
      image: londonImg,
    },
    {
      id: 4,
      name: "Columbia",
      description: "Amazing landmark",
      price: "$700",
      image: columbiaImg,
    },
  ];

  return (
    <section className="destinations-section">
      <div className="destinations-header">
        <div>
          <h2>Fall into travel</h2>
          <p>
            Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
          </p>
        </div>
        <button className="see-all-button">See All</button>
      </div>

      <div className="destinations-grid">
        {destinations.map((dest) => (
          <div key={dest.id} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <div className="card-content">
              <h3>{dest.name}</h3>
              <p className="description">{dest.description}</p>
              <div className="price-row">
                <span className="price">{dest.price}</span>
                <button className="book-button">Book Flight</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TravelDestinations;