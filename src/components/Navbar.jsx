import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/tv', label: 'TV Shows' },
    { to: '/watchlist', label: 'Watchlist' },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/90 backdrop-blur-lg border-b border-white/[0.06]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-3 group"
            aria-label="FlickTime Home"
          >
            <div className="relative">
              {/* Subtle glow behind logo on hover */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                src={logo}
                alt="FlickTime Logo"
                className="relative h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400
                    ${active
                      ? 'text-cyan-400 bg-cyan-400/[0.08]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Link
              to="/search"
              className="p-2.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              aria-label="Search"
              title="Search"
            >
              <IoMdSearch className="w-5 h-5" aria-hidden="true" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen
                ? <FaTimes className="w-5 h-5" aria-hidden="true" />
                : <FaBars className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-72 opacity-100 pb-3' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="pt-2 border-t border-white/[0.06] space-y-0.5">
            {navLinks.map((link, i) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: isMobileMenuOpen ? `${i * 40}ms` : '0ms' }}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400
                    ${active
                      ? 'text-cyan-400 bg-cyan-400/[0.08]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {link.label}
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  )}
                </Link>
              );
            })}

            {/* Mobile search shortcut */}
            <Link
              to="/search"
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
            >
              <IoMdSearch className="w-4 h-4" />
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;