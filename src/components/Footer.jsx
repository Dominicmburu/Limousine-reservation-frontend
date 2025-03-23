import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <p className="text-lg mb-4">© 2024 Cyrene Car Limousine. All Rights Reserved.</p>

        {/* Footer Navigation Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="#home"
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Home
          </a>
          <a
            href="#vehicles"
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Vehicles
          </a>
          <a
            href="#book"
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Book
          </a>
          <a
            href="#contact"
            className="text-white hover:text-primary transition duration-300 ease-in-out text-lg"
          >
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
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
          <p>123 Luxury Lane, Cyrene, Car City, Country</p>
          <p>Email: contact@cyrenecar.com | Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
