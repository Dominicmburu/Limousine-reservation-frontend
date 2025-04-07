import React from 'react';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();


  const handleBookNow = () => {
    navigate('/booking');
  };

  const handleVehicle = () => {
    navigate('/fleet');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <p className="text-lg mb-4">© 2024 Cyrene Car Limousine. All Rights Reserved.</p>

        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={handleHome}
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Home
          </button>
          <button
            onClick={handleVehicle}
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Vehicles
          </button>
          <button
            onClick={handleBookNow}
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Book
          </button>
          <button
            onClick={handleContact}
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Contact
          </button>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            className="text-white hover:text-primary transition duration-300 ease-in-out"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            className="text-white hover:text-primary transition duration-300 ease-in-out"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-white hover:text-primary transition duration-300 ease-in-out"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            className="text-white hover:text-primary transition duration-300 ease-in-out"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Footer Contact Info */}
        <div className="text-sm text-gray-400">
          <p>123 Luxury Lane, Cyrene, Car City, London</p>
          <p>Email: contact@cyrenecar.com | Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
