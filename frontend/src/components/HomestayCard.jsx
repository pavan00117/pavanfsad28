import { useState } from 'react';
import './HomestayCard.css';

function HomestayCard({ homestay }) {
  const [showBooking, setShowBooking] = useState(false);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [booked, setBooked] = useState(false);

  const handleBook = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to book a homestay.");
      window.location.href = '/login';
      return;
    }
    
    try {
      const res = await fetch('https://pavanfsad28.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          homestayId: homestay.id,
          guests,
          nights,
          totalPrice: homestay.pricePerNight * nights
        })
      });
      
      if (res.ok) {
        setBooked(true);
        setTimeout(() => {
          setShowBooking(false);
          setBooked(false);
          setGuests(1);
          setNights(1);
        }, 4000);
      } else {
        alert('Failed to book homestay');
      }
    } catch (err) {
      alert('An error occurred while booking');
    }
  };

  return (
    <div className="homestay-card glass-panel">
      <div className="homestay-img-container">
        <img src={homestay.imageUrl} alt={homestay.name} className="homestay-img" />
        <div className="homestay-price">
          ${homestay.pricePerNight} <span className="per-night">/ night</span>
        </div>
      </div>
      <div className="homestay-content">
        <div className="homestay-header">
          <h3 className="homestay-title">{homestay.name}</h3>
          <div className="rating">
            <span className="star">★</span> 4.8
          </div>
        </div>
        <p className="homestay-desc">{homestay.description}</p>
        
        {!showBooking ? (
          <button className="btn-primary book-btn" onClick={() => setShowBooking(true)}>
            Book Now
          </button>
        ) : booked ? (
          <div className="booking-success" style={{color: '#4ade80', marginTop: '1rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '0.5rem'}}>
            ✓ Successfully Booked! <br/><span style={{fontSize: '0.9rem', fontWeight: 'normal', color: '#cbd5e1'}}>We look forward to hosting you.</span>
          </div>
        ) : (
          <div className="booking-form" style={{marginTop: '1rem', padding: '1.2rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)'}}>
            <h4 style={{marginBottom: '1rem', color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>Confirm Booking Details</h4>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem'}}>
              <label style={{fontSize: '0.9rem', color: '#cbd5e1'}}>Number of People:</label>
              <input type="number" min="1" max="10" value={guests} onChange={e => setGuests(parseInt(e.target.value) || 1)} style={{width: '70px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid #475569', borderRadius: '4px', padding: '0.3rem 0.5rem'}} />
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
              <label style={{fontSize: '0.9rem', color: '#cbd5e1'}}>Number of Nights:</label>
              <input type="number" min="1" max="30" value={nights} onChange={e => setNights(parseInt(e.target.value) || 1)} style={{width: '70px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid #475569', borderRadius: '4px', padding: '0.3rem 0.5rem'}} />
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0', fontWeight: 'bold', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem'}}>
              <span>Total Price:</span>
              <span style={{color: '#60a5fa', fontSize: '1.2rem'}}>${(homestay.pricePerNight * nights).toFixed(2)}</span>
            </div>
            
            <div style={{display: 'flex', gap: '0.8rem'}}>
              <button className="btn-primary" style={{flex: 1, padding: '0.6rem'}} onClick={handleBook}>Confirm</button>
              <button className="btn-secondary" style={{flex: 1, padding: '0.6rem'}} onClick={() => setShowBooking(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomestayCard;
