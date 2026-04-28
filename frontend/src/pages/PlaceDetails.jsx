import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HomestayCard from '../components/HomestayCard';
import './PlaceDetails.css';

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/places/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setPlace(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch place", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loader details-loader">Loading details...</div>;
  }

  if (!place) {
    return <div className="error-msg">Place not found</div>;
  }

  return (
    <div className="place-details-page">
      <div 
        className="details-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9)), url(${place.imageUrl})` }}
      >
        <div className="container hero-content-inner">
          <Link to="/" className="back-link">
            &larr; Back to Destinations
          </Link>
          <h1 className="details-title">{place.name}</h1>
          <div className="details-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {place.location}
          </div>
        </div>
      </div>

      <div className="container details-content">
        <div className="details-about glass-panel">
          <h2>About {place.name}</h2>
          <p>{place.description}</p>
        </div>

        <div className="homestays-section">
          <h2>Nearby Homestays</h2>
          <div className="homestays-list">
            {place.homestays.map(homestay => (
              <HomestayCard key={homestay.id} homestay={homestay} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
