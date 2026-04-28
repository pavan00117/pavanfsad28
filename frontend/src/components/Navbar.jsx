import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">Wander<span className="logo-highlight">Stay</span></span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Explore</Link></li>
          {user ? (
            <>
              <li><Link to="/bookings">My Bookings</Link></li>
              <li><span style={{color: '#94a3b8', marginRight: '1rem'}}>Hi, {user.name}</span></li>
              <li><button onClick={handleLogout} className="btn-secondary" style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup" className="btn-primary" style={{padding: '0.4rem 1rem', textDecoration: 'none'}}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
