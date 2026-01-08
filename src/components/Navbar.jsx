import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/tv', label: 'TV Shows' },
    { to: '/watchlist', label: 'Watchlist' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-white hover:text-cyan-400 transition-colors duration-300 group"
            >
              <span className="text-cyan-400 text-3xl md:text-4xl font-extrabold transition-transform duration-300 group-hover:scale-110 inline-block">
                f
              </span>
              lick
              <span className="text-cyan-400 text-3xl md:text-4xl font-extrabold transition-transform duration-300 group-hover:scale-110 inline-block">
                t
              </span>
              ime
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-lg group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <Link
              to="/search"
              className="p-2 text-gray-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 relative group"
              aria-label="Search"
            >
              <IoMdSearch className="w-6 h-6" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Search
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
            }`}
        >
          <div className="pt-2 pb-4 space-y-1 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 text-base font-medium group"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;