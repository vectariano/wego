import React, { useEffect, useState } from "react";


import locationImg from "../static/img/Location.png";  
import starImg from "../static/img/blackStar.png";   

export default function HotelDetailCard({ hotelId }) {
  const id = typeof hotelId === "string" ? parseInt(hotelId, 10) : hotelId;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id == null || isNaN(id)) {
      setLoading(false);
      return;
    }

    const fetchHotel = async () => {
      try {
        const response = await fetch(`/api/hotels/${id}/`);
        if (!response.ok) throw new Error("Hotel not found");
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error loading hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <div className="hotel-detail-card-loading">Loading...</div>;
  if (!hotel) return <div className="hotel-detail-card-error">Hotel not found</div>;

  const name = hotel.name || "Unknown Hotel";
  const rating = hotel.overall_rating || 0;
  const reviews = hotel.reviews || 0;
  const price = hotel.total_rate?.lowest || hotel.rate_per_night || "$—";
  const description = hotel.description || "No overview available.";
  const images = hotel.images || [];

  let address = "No address";
  if (hotel.gps_coordinates) {
    address = `${hotel.gps_coordinates.latitude}, ${hotel.gps_coordinates.longitude}`;
  }

  const ratingLabel = rating >= 4.0 ? "Very Good" : rating >= 3.0 ? "Good" : "Fair";

  return (
    <div className="hotel-detail-card">
      <header className="hotel-header">
        <div className="hotel-info">
          <h1 className="hotel-name">{name}</h1>
          <div className="rating-box">
  <span className="rating-value">{rating.toFixed(1)}</span>
  <span className="rating-text">
    {ratingLabel}<br/>
    {reviews} reviews
  </span>
</div>
<div className="hotel-address">
  <img src={locationImg} alt="Location" className="location-icon" />
  {address}
</div>
        </div>

        <div className="hotel-actions">
          <div className="price-tag">{price}/night</div>
          <button className="btn-book">Book now</button>
        </div>
      </header>

      <div className="hotel-gallery">
        <div className="main-image-wrapper">
          {images[0] ? (
            <img
              src={images[0].original || images[0].large || images[0].thumbnail}
              alt={name}
              className="main-image"
              loading="lazy"
            />
          ) : (
            <div className="placeholder-image">📷 No photo</div>
          )}
        </div>
        <div className="thumbnail-grid">
          {images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={img.thumbnail || img.large || img.original}
              alt={`${name} view ${i + 2}`}
              className="thumbnail"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <section className="overview-section">
        <h2>Overview</h2>
        <p className="overview-text">{description}</p>
      </section>

      <div className="features-grid">
        <div className="feature-item primary">
          <div className="feature-rating">{rating.toFixed(1)}</div>
          <div className="feature-text">
            {ratingLabel}<br/>
            {reviews} reviews
          </div>
        </div>
        <div className="feature-item">
          <img src={starImg} alt="Star" className="feature-icon-img" />
          <div className="feature-label">Near park</div>
        </div>
        <div className="feature-item">
          <img src={starImg} alt="Star" className="feature-icon-img" />
          <div className="feature-label">Near nightlife</div>
        </div>
        <div className="feature-item">
          <img src={starImg} alt="Star" className="feature-icon-img" />
          <div className="feature-label">Near theater</div>
        </div>
        <div className="feature-item">
          <img src={starImg} alt="Star" className="feature-icon-img" />
          <div className="feature-label">Clean Hotel</div>
        </div>
      </div>
    </div>
  );
}