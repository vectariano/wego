// src/components/HotelDetailCard.jsx
import React, { useEffect, useState } from "react";
import locationImg from "../static/img/Location.png";
import starImg from "../static/img/blackStar.png";

function HotelDetailCard({ hotelId }) {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!hotelId) {
            setLoading(false);
            return;
        }

        try {
            const cached = localStorage.getItem('cachedHotels');
            const hotels = cached ? JSON.parse(cached) : [];
            const found = hotels.find(h => h.property_token === hotelId);

            if (found) {
                setHotel(found);
            } else {
                setHotel(null);
            }
        } catch (error) {
            console.error("Error loading hotel from cache:", error);
            setHotel(null);
        } finally {
            setLoading(false);
        }
    }, [hotelId]);

    if (loading) return <div className="hotel-detail-card-loading">Loading...</div>;
    if (!hotel) return <div className="hotel-detail-card-error">Hotel not found</div>;

    const name = hotel.name || "Unknown Hotel";
    const rating = hotel.overall_rating || 0;
    const reviews = hotel.reviews || 0;
    const price = hotel.total_rate?.lowest || "$—";
    const description = hotel.description || "No overview available.";
    const images = hotel.images || [];

    let address = "No address";
    if (hotel.gps_coordinates) {
        address = `${hotel.gps_coordinates.latitude}, ${hotel.gps_coordinates.longitude}`;
    }

    const ratingLabel = rating >= 4.0 ? "Very Good" : rating >= 3.0 ? "Good" : "Fair";

    const hasCoordinates = hotel.gps_coordinates && 
                          hotel.gps_coordinates.latitude && 
                          hotel.gps_coordinates.longitude;

    return (
        <div className="hotel-detail-card">
            <header className="hotel-header">
                <div className="hotel-info">
                    <h1 className="hotel-name">{name}</h1>
                    <div className="rating-box">
                        <span className="rating-value">{rating.toFixed(1)}</span>
                        <span className="rating-text">
                            {ratingLabel}<br />
                            {reviews} reviews
                        </span>
                    </div>
                    <div className="hotel-address">
                        <img src={locationImg} alt="Location" className="location-icon" />
                        {address}
                        {hasCoordinates && (
                            <button 
                                onClick={() => {
                                    const { latitude, longitude } = hotel.gps_coordinates;
                                    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
                                }}
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px 10px',
                                    background: '#4285f4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.9em'
                                }}
                            >
                                📍 View on Map
                            </button>
                        )}
                    </div>
                </div>

                <div className="hotel-actions">
                    <div className="price-tag">{price}/night</div>
                    <button 
                        className="btn-book"
                        onClick={() => {
                            if (hasCoordinates) {
                                const { latitude, longitude } = hotel.gps_coordinates;
                                window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
                            } else {
                                alert('Location not available for this hotel. Please try searching for another hotel.');
                            }
                        }}
                    >
                        Book now
                    </button>
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
                        {ratingLabel}<br />
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

function HotelSearch() {
  const [destination, setDestination] = useState("Bali Resorts");
  const [checkIn, setCheckIn] = useState("2025-12-24");
  const [checkOut, setCheckOut] = useState("2025-12-26");
  const [guestsOption, setGuestsOption] = useState("1 room, 2 guests");

  const handleSearch = () => {
    let rooms = 1;
    let adults = 2;
    
    switch(guestsOption) {
      case "1 room, 1 guest":
        rooms = 1;
        adults = 1;
        break;
      case "1 room, 2 guests":
        rooms = 1;
        adults = 2;
        break;
      case "2 rooms, 4 guests":
        rooms = 2;
        adults = 4;
        break;
      case "3 rooms, 6 guests":
        rooms = 3;
        adults = 6;
        break;
    }
    
    window.location.href = `/hotels?destination=${encodeURIComponent(destination)}&check_in=${checkIn}&check_out=${checkOut}&rooms=${rooms}&adults=${adults}`;
  };

  const getNextDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    if (newCheckIn >= checkOut) {
      setCheckOut(getNextDay(newCheckIn));
    }
  };

  return (
    <section className="hotel-search">
      <div className="hotel-search-header">
        <h3>Book your stay</h3>
      </div>

      <div className="hotel-search-flex">
        <div className="destination">
          <label className="destination-label">Destination</label>
          <input 
            className="dest-border" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>

        <div className="check-in-out">
          <label className="check-in-out-label">Check-in – Check-out</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input 
              type="date"
              className="cio-border" 
              value={checkIn}
              onChange={handleCheckInChange}
              min={new Date().toISOString().split('T')[0]}
              style={{ flex: 1 }}
            />
            <span style={{ alignSelf: "center" }}>–</span>
            <input 
              type="date"
              className="cio-border" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={getNextDay(checkIn)}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div className="guests-rooms">
          <label className="guests-rooms-label">Guests – Rooms</label>
          <select 
            className="gr-border" 
            value={guestsOption}
            onChange={(e) => setGuestsOption(e.target.value)}
          >
            <option value="1 room, 1 guest">1 room, 1 guest</option>
            <option value="1 room, 2 guests">1 room, 2 guests</option>
            <option value="2 rooms, 4 guests">2 rooms, 4 guests</option>
            <option value="3 rooms, 6 guests">3 rooms, 6 guests</option>
          </select>
        </div>
      </div>

      <div className="hotel-bottom-buttons-flex">
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
}

export default HotelDetailCard;