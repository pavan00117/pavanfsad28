import { useState, useEffect } from 'react';
import './Home.css'; // Reuse some basic CSS

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:5000/api/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch bookings", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader details-loader">Loading your bookings...</div>;
  }

  return (
    <div className="container" style={{paddingTop: '6rem', minHeight: '80vh'}}>
      <h2 className="section-title">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <p style={{color: '#94a3b8'}}>You don't have any bookings yet.</p>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {bookings.map(booking => (
            <div key={booking.id} className="glass-panel" style={{display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center'}}>
              <img src={booking.homestay.imageUrl} alt={booking.homestay.name} style={{width: '120px', height: '100px', objectFit: 'cover', borderRadius: '8px'}} />
              <div style={{flex: 1}}>
                <h3 style={{margin: '0 0 0.5rem 0', color: '#f8fafc'}}>{booking.homestay.name}</h3>
                <p style={{margin: '0 0 0.5rem 0', color: '#94a3b8', fontSize: '0.9rem'}}>{booking.homestay.place.name} • {booking.homestay.place.location}</p>
                <div style={{display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#cbd5e1'}}>
                  <span>👥 {booking.guests} Guests</span>
                  <span>🌙 {booking.nights} Nights</span>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem'}}>Total Paid</div>
                <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80'}}>${booking.totalPrice}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
