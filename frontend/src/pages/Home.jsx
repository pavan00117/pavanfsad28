import { useState, useEffect } from 'react';
import PlaceCard from '../components/PlaceCard';
import './Home.css';

function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/places')
      .then(res => res.json())
      .then(data => {
        setPlaces(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch places", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next <span className="text-gradient">Adventure</span></h1>
          <p className="hero-subtitle">Find the perfect homestay near breathtaking tourist destinations. Experience travel like a local.</p>
          <button 
            className="btn-primary hero-btn" 
            onClick={() => {
              const section = document.getElementById('destinations');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Destinations
          </button>
        </div>
      </header>

      <section id="destinations" className="container places-section">
        <h2 className="section-title">Popular Destinations</h2>
        
        {loading ? (
          <div className="loader">Loading amazing places...</div>
        ) : (
          <div className="places-grid">
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
