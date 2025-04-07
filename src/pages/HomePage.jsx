import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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

// Animated section component for reuse
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Animated feature card component
const FeatureCard = ({ image, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
      whileHover={{ y: -10 }}
    >
      <img
        src={image}
        alt={title}
        className="mx-auto w-full md:w-50 mb-6 rounded object-cover h-48"
      />
      <motion.h3 
        className="text-2xl font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 + index * 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-700"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Text animation component
const AnimatedText = ({ text, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {},
        }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      >
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-1"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.6 }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false });

  // Parallax effect for hero section
  const backgroundY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  
  const handlePrevious = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? videos.length -
      1 : prevIndex - 1
    );
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  const handleViewFleet = () => {
    navigate('/fleet');
  };

  // Autoscroll for video carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <motion.header
        ref={heroRef}
        className="relative bg-cover bg-center text-white py-16 lg:py-24 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/Images/limo-back-1.jpg')",
          minHeight: '80vh',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('/Images/limo-back-1.jpg')",
            y: backgroundY 
          }}
        />
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-0 relative z-10">
          {/* Left Content with Animation */}
          <motion.div 
            className="text-center md:text-left flex-1 px-6"
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedText 
              text="Welcome to Cyrene Car Limousine" 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            />
            <motion.p 
              className="text-xl md:text-2xl mb-8 opacity-90"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Your luxury ride, anytime, anywhere.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-10"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                className="bg-blue-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                onClick={handleBookNow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
              <motion.button
                className="bg-white text-gray-800 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
                onClick={handleViewFleet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Fleet
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image with Animation */}
          <motion.div 
            className="flex-1 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img
              src="/image/image_23.jpg"
              alt="Cyrene Car Limousine"
              className="w-full h-auto object-contain max-w-lg mx-auto md:mx-0 rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.header>

      {/* Promotions Section */}
      <AnimatedSection>
        <section className="py-16 bg-gradient-to-r from-green-100 to-green-200 text-primary relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-pattern opacity-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
          <Promotions />
        </section>
      </AnimatedSection>

      {/* Featured Section with Animated Cards */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-r from-blue-100 to-blue-200 text-primary">
          <div className="container mx-auto text-center px-4">
            <AnimatedText 
              text="Why Ride with Us?" 
              className="text-4xl md:text-5xl font-bold mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <FeatureCard 
                image={images.car6}
                title="Luxury Rides"
                description="Experience top-of-the-line luxury vehicles for every occasion."
                index={0}
              />
              <FeatureCard 
                image={images.car8}
                title="Professional Chauffeurs"
                description="Driven by experienced and courteous professionals."
                index={1}
              />
              <FeatureCard 
                image={images.car3}
                title="On-Time Guarantee"
                description="Punctuality is our promise for every ride."
                index={2}
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section with Video Carousel */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center px-4">
            <AnimatedText 
              text="About Cyrene Car Limousine" 
              className="text-4xl font-bold text-primary mb-8"
            />
            <motion.p 
              className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Cyrene Car Limousine offers unparalleled luxury transportation services with a fleet of premium vehicles and professional chauffeurs. From airport pickups to city tours, we redefine travel experiences with comfort, style, and reliability.
            </motion.p>

            {/* Enhanced Video Section */}
            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              {/* Video progress indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-10">
                <motion.div 
                  className="h-full bg-blue-500"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 8, ease: "linear", repeat: Infinity, repeatType: "loop" }}
                />
              </div>
              
              {/* Videos */}
              <motion.div
                className="flex transition-all duration-700 ease-in-out"
                animate={{ x: `${-carouselIndex * 100}%` }}
              >
                {videos.map((video, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <video
                      controls
                      className="w-full aspect-video object-cover"
                      poster={video.poster}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </motion.div>

              {/* Video Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      carouselIndex === index ? "bg-blue-500" : "bg-white opacity-70"
                    }`}
                    onClick={() => setCarouselIndex(index)}
                  />
                ))}
              </div>

              {/* Arrows */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-300 focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-300 focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Vehicle List with Animation */}
      <AnimatedSection>
        <VehicleList />
      </AnimatedSection>

      {/* Recommendations Section */}
      <AnimatedSection>
        <section className="py-16 bg-blue-50 relative overflow-hidden">
          <motion.div
            className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-200 opacity-50"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-green-200 opacity-40"
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <Recommendations />
          </div>
        </section>
      </AnimatedSection>

      {/* Call-to-Action Section with Animation */}
      <AnimatedSection>
        <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ 
              background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 100%)",
              backgroundSize: "30px 30px"
            }}
            animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          
          <div className="container mx-auto px-4">
            <AnimatedText 
              text="Ready to Book Your Ride?" 
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Whether it's a business trip or a special occasion, Cyrene Car Limousine has got you covered.
            </motion.p>
            <motion.button 
              className="bg-white text-primary px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition duration-300"
              onClick={handleBookNow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >  
              Book Now
            </motion.button>
          </div>
        </section>
      </AnimatedSection>

      {/* Reviews with Animation */}
      <AnimatedSection>
        <Reviews />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
      
      {/* Floating CTA Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <motion.button
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          onClick={handleBookNow}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0.5)", "0px 0px 20px rgba(59, 130, 246, 0.8)", "0px 0px 0px rgba(59, 130, 246, 0.5)"]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="mr-2">Book Now</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
      
      {/* Back to top button - appears after scrolling */}
      <motion.button
        className="fixed bottom-8 left-8 z-50 bg-gray-800 text-white rounded-full p-3 shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
          y: scrollYProgress.get() > 0.2 ? 0 : 20 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

export default HomePage;