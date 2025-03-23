import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VehicleList from '../components/VehicleList';
import Reviews from '../components/Reviews';
import Promotions from '../components/Promotions';
import Recommendations from '../components/Recommendations';
import Footer from '../components/Footer';
import images from '../assets/images';


const videos = [
  { src: "/Videos/video_4.mp4", poster: "/Images/limo-back-1.jpg" },
  { src: "/Videos/video_2.mp4", poster: "/Images/limo-back-2.jpg" },
  { src: "/Videos/video_3.mp4", poster: "/Images/limo-back-3.jpg" },
];


const HomePage = () => {

  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  
  const handlePrevious = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  const handleViewFleet = () => {
    navigate('/fleet');
  };

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <header
        className="bg-cover bg-center text-white py-5 text-center"
        style={{
          backgroundImage: "url('/Images/limo-back-1.jpg')",
          minHeight: '50vh',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-0">
          {/* Left Content */}
          <div className="text-center md:text-center flex-1">
            <h1 className="text-5xl font-bold mb-4">Welcome to Cyrene Car Limousine</h1>
            <p className="text-xl mb-6">Your luxury ride, anytime, anywhere.</p>
            <div className="flex justify-center md:justify-start gap-4 mb-10">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
                onClick={handleBookNow}
              >
                Book Now
              </button>
              <button
                className="bg-white text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-200 transition"
                onClick={handleViewFleet}
              >
                View Fleet
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src="/Images/intro.jpg"
              alt="Cyrene Car Limousine"
              className="w-full h-auto object-contain max-w-sm mx-auto md:mx-0 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Promotions Section */}
      <section className="py-16 bg-gradient-to-r from-green-100 to-green-200 text-primary">
        <Promotions />
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200 text-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Why Ride with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <img
                src={images.car6}
                alt="Luxury"
                className="mx-auto w-full md:w-50 mb-6 rounded"
              />
              <h3 className="text-2xl font-semibold mb-4">Luxury Rides</h3>
              <p className="text-gray-700">
                Experience top-of-the-line luxury vehicles for every occasion.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <img
                src={images.car8}
                alt="Chauffeur"
                className="mx-auto w-full md:w-50 mb-6 rounded"
              />
              <h3 className="text-2xl font-semibold mb-4">Professional Chauffeurs</h3>
              <p className="text-gray-700">
                Driven by experienced and courteous professionals.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <img
                src={images.car3}
                alt="On Time"
                className="mx-auto w-full md:w-50 mb-6 rounded"
              />
              <h3 className="text-2xl font-semibold mb-4">On-Time Guarantee</h3>
              <p className="text-gray-700">
                Punctuality is our promise for every ride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-8">About Cyrene Car Limousine</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Cyrene Car Limousine offers unparalleled luxury transportation services with a fleet of premium vehicles and professional chauffeurs. From airport pickups to city tours, we redefine travel experiences with comfort, style, and reliability.
          </p>

          {/* Video Section */}
          <div className="relative max-w-4xl mx-auto">
            {/* Videos */}
            <div
              className="flex overflow-hidden transition-transform duration-500"
              id="videoCarousel"
              style={{ transform: `translateX(${carouselIndex * -100}%)` }} // Dynamic transform for the active video
            >
              {/* Video Items */}
              {videos.map((video, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <video
                    controls
                    className="w-full max-h-[400px] rounded shadow-lg"
                    poster={video.poster}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
              </div>

              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 focus:outline-none"
              >
                &lt;
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 focus:outline-none"
              >
                &gt;
              </button>
            </div>
          </div>
      </section>



      {/* Vehicle List */}
      <VehicleList />

      {/* Recommendations Section */}
      <section className="py-16 bg-blue-50">
        <Recommendations />
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Ride?</h2>
          <p className="text-xl mb-8">Whether it's a business trip or a special occasion, Cyrene Car Limousine has got you covered.</p>
          <button className="bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-200 transition duration-300">
            Book Now
          </button>
        </div>
      </section>


      {/* Reviews */}
      <Reviews />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
