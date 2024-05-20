import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">MovieDb</Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Popular</Link>
          </li>
          <li className="nav-item">
            <Link to="/top-rated" className="nav-link">Top Rated</Link>
          </li>
          <li className="nav-item">
            <Link to="/upcoming" className="nav-link">Upcoming</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
