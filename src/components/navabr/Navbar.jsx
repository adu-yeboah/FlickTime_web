import React, { useState } from 'react';
import './Navbar.scss';
import { IoMdSearch } from 'react-icons/io';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbarWrapper flex-item">
          <div className="logo">
            <Link to="/">
              <span>f</span>lick<span>t</span>ime
            </Link>
          </div>

          {/* Navigation Links */}
          <div className={`nav flex-item ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/movies" onClick={() => setIsMobileMenuOpen(false)}>Movies</Link>
            <Link to="/tv" onClick={() => setIsMobileMenuOpen(false)}>TV Shows</Link>
          </div>

          {/* Search Icon */}
          <Link to="/search" className="search">
            <IoMdSearch />
          </Link>

          {/* Hamburger Toggle for Mobile */}
          <div className="mobile-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;