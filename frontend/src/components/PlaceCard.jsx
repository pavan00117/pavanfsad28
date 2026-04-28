import { Link } from 'react-router-dom';
import './PlaceCard.css';

function PlaceCard({ place }) {
  return (
    <div className="place-card glass-panel">
      <div className="place-img-container">
        <img src={place.imageUrl} alt={place.name} className="place-img" />
        <div className="place-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {place.location}
        </div>
      </div>
      <div className="place-content">
        <h3 className="place-title">{place.name}</h3>
        <p className="place-desc">{place.description.substring(0, 80)}...</p>
        <Link to={`/place/${place.id}`} className="btn-secondary">
          View Homestays
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;
