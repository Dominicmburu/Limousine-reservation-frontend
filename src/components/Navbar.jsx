import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { BASE_API } from '../utils/Api';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    fetch(`${BASE_API}/auth/logout`, { method: 'POST', credentials: 'include' });
  };

  useEffect(() => {
  }, [user]);

  // Menu Items Array (moved inside the component)
  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Book', to: '/booking' },
    { label: 'Fleet', to: '/fleet' },
    { label: 'Reviews', to: '/reviews' },
    { label: 'Contact', to: '/contact' },
    ...(user
      ? [{ label: 'Logout', to: '#', onClick: handleLogout }]
      : [
          { label: 'Login', to: '/login' },
          { label: 'Sign Up', to: '/signup' },
        ]),
  ];

  return (
    <nav className="bg-blue-200 text-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-2">
        {/* Brand Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold flex flex-col md:flex-row items-center justify-center gap-4 text-gray-800">
          <img
            src="Images/CYRENE CARS LOGO-1.png"
            alt="Cyrene Car Logo"
            className="w-20 md:w-20 h-auto object-contain"
          />
        </h1>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-grey-900 focus:outline-none"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {menuItems.map(({ label, to, onClick }) => (
            <li key={label}>
              <Link
                to={to}
                className={`hover:text-blue-600 transition-colors ${
                  location.pathname === to
                    ? 'border-b-4 border-blue-500 pb-1 text-blue-600'
                    : ''
                }`}
                onClick={onClick}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-200">
          <ul className="space-y-4 p-4">
            {menuItems.map(({ label, to, onClick }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`block hover:text-blue-600 transition-colors ${
                    location.pathname === to
                      ? 'border-l-4 border-blue-500 pl-2 text-blue-600'
                      : ''
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onClick) onClick();
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
