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
              href="https://www.facebook.com/share/1DTcJS2Zhx/?mibextid=wwXIfr"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>            
            <a
              href="https://www.tiktok.com/@cyrenecar?_t=ZM-8vGrNXENG6x&_r=1"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://www.snapchat.com/add/cyrenecar"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
              aria-label="Snapchat"
            >
              <i className="fab fa-snapchat-ghost"></i>
            </a>
          </div>

          {/* Footer Contact Info */}
        <div className="text-sm text-gray-400">
          <p>24CF+5X5, Benghazi, Libya</p>
          <p>Email: contact@cyrenecar.com | Phone: +218 92-6666011</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
