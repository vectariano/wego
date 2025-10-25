import React from "react";


function Hero( {bg} ) {
  return (
          <section className="greetings">
              <img src={bg} alt="background" className="bg-img" />
              <div className="greet-string-flights">
                  <h2 className="text1">Make your travel wishlist, we'll do the rest</h2>
                  
                  <h3 className="text3">Special offers to suit your plan</h3>
              </div>
          </section>
      );
}

export default Hero;