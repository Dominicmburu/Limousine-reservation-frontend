import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import images from '../assets/images'; 
import { BASE_API } from '../utils/Api';

// Animated heading component for reuse
const AnimatedHeading = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Animated reveal component for lists and sections
const AnimatedReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const FleetPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const navigate = useNavigate();

  const categories = ['All', 'LONDON CAB', 'SANTA FE', 'CHAIRMAN VIP', 'MERCEDES E200', 'HONGQI HS'];

  // Handle scroll for showing back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch vehicles with loading animation
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Simulate loading progress for better UX
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) clearInterval(progressInterval);
            return Math.min(prev + 10, 90);
          });
        }, 200);

        const response = await fetch(`${BASE_API}/vehicles`);
        const data = await response.json();
        
        setVehicles(data);
        setLoadingProgress(100);
        
        // Small delay to show complete loading
        setTimeout(() => {
          setLoading(false);
          clearInterval(progressInterval);
        }, 500);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
        setLoadingProgress(100);
      }
    };

    fetchVehicles();
  }, []);

  // Filter vehicles based on category and search query
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesCategory =
      selectedCategory === 'All' || vehicle.category === selectedCategory;
    const matchesSearch = vehicle.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleBooking = (vehicle) => {
    navigate('/booking', { state: { vehicle } });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Staggered card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Loading State */}
      {loading ? (
        <div className="flex-grow flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
          <motion.div 
            className="w-24 h-24 relative"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5,
              ease: "linear",
              repeat: Infinity
            }}
          >
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full" />
          </motion.div>
          
          <div className="mt-8 w-64">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500" 
                animate={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-center mt-2 text-gray-600">Loading fleet...</p>
          </div>
        </div>
      ) : (
        <main className="flex-grow pt-0 pb-0">
          <section className="bg-gradient-to-r from-blue-50 to-blue-500">
            <div className="container mx-auto">
              <AnimatedHeading>
                <h1 className="text-4xl font-bold text-center text-white py-12 shadow-text">
                  Our Fleet
                </h1>
              </AnimatedHeading>
              
              <div className="flex flex-col md:flex-row gap-8 pb-16 px-4">
                {/* Sidebar */}
                <motion.aside 
                  className="md:w-1/4 bg-white rounded-xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="p-6 bg-gradient-to-r from-primary to-blue-600">
                    <h2 className="text-xl font-bold text-white mb-2">Vehicle Categories</h2>
                    <p className="text-blue-100">Find your perfect ride</p>
                  </div>
                  
                  <div className="p-4">
                    <ul className="space-y-1">
                      {categories.map((category, index) => (
                        <motion.li
                          key={category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center ${
                              selectedCategory === category
                                ? 'bg-primary text-white shadow-md'
                                : 'hover:bg-blue-50 text-gray-700'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            <motion.span 
                              className="mr-2"
                              animate={selectedCategory === category ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              {selectedCategory === category ? '●' : '○'}
                            </motion.span>
                            {category}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <AnimatedReveal delay={0.4}>
                    <div className="p-6 bg-blue-50 m-4 rounded-lg">
                      <h3 className="font-semibold text-primary mb-2">Need Assistance?</h3>
                      <p className="text-sm text-gray-600 mb-4">Our team is here to help you choose the perfect vehicle for your needs.</p>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors" onClick={handleContact}>
                        Contact Us
                      </button>
                    </div>
                  </AnimatedReveal>
                </motion.aside>

                {/* Main Content */}
                <div className="md:w-3/4">
                  {/* Search Bar with Animation */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search vehicles..."
                        className="w-full p-4 pr-12 border rounded-full border-blue-300 shadow-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      
                      {searchQuery && (
                        <motion.div 
                          className="absolute right-14 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setSearchQuery('')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Search results summary */}
                    <motion.div 
                      className="mt-4 text-gray-600 font-medium pl-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
                      {searchQuery && ` for "${searchQuery}"`}
                      {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                    </motion.div>
                  </motion.div>

                  {/* Vehicle Cards Grid with Animation */}
                  {filteredVehicles.length > 0 ? (
                    <motion.div 
                      className="grid grid-cols-1\2 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredVehicles.map((vehicle, index) => (
                        <motion.div
                          key={vehicle.id}
                          variants={cardVariants}
                          layoutId={`vehicle-card-${vehicle.id}`}
                          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                          style={{ maxWidth: '250px' }}
                        >
                          <div className="relative overflow-hidden">
                            <motion.img
                              src={`./image/${vehicle.image}`}
                              alt={vehicle.name}
                              className="w-full h-56 object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="absolute top-4 right-4 bg-primary text-white text-sm font-semibold py-1 px-3 rounded-full shadow">
                              {vehicle.category}
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-primary mb-3">
                              {vehicle.name}
                            </h3>
                            
                            <p className="text-gray-600 mb-4">{vehicle.description}</p>
                            
                            <div className="grid grid-cols-3 gap-2 mb-6">
                              <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-sm font-medium">{vehicle.capacity}</span>
                              </div>
                              
                              <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sm font-medium">{vehicle.fuelType}</span>
                              </div>
                              
                              <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium">{vehicle.transmission}</span>
                              </div>
                            </div>

                            {/* Expandable Section */}
                            <motion.button
                              className="w-full flex items-center justify-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                              onClick={() => toggleCardExpansion(vehicle.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="mr-3 text-gray-700">
                                {expandedCard === vehicle.id ? 'Hide Details' : 'View Details'}
                              </span>
                              <motion.span
                                animate={{ rotate: expandedCard === vehicle.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </motion.span>
                            </motion.button>

                            <AnimatePresence>
                              {expandedCard === vehicle.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 bg-blue-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-bold text-primary mb-3">
                                      Vehicle Features
                                    </h4>
                                    <ul className="space-y-2">
                                      {vehicle.features?.map((feature, idx) => (
                                        <motion.li 
                                          key={idx} 
                                          className="flex items-center space-x-3 text-gray-700"
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.1 }}
                                        >
                                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                          </span>
                                          <span>{feature}</span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Book Now Button */}
                            <motion.button
                              className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                              onClick={() => handleBooking(vehicle)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <span>Book Now</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="bg-white p-10 rounded-xl shadow text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-7xl mb-4">🔍</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">No vehicles found</h3>
                      <p className="text-gray-600">Try adjusting your search or category filter</p>
                      <motion.button
                        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reset Filters
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <AnimatedReveal>
            <section className="bg-gradient-to-r from-primary to-blue-600 text-white mt-0 py-16">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-4">Ready to hit the road?</h2>
                    <p className="text-blue-100 text-lg mb-6">Get in touch with our team to book your perfect ride or learn more about our premium services.</p>
                    <div className="flex flex-wrap gap-4">
                      <motion.button 
                        className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleContact}
                      >
                        Contact Us
                      </motion.button>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <motion.img 
                      src="/image/image_23.jpg" 
                      alt="Luxury Car" 
                      className="rounded-lg shadow-2xl mx-auto max-w-md w-full object-cover h-64"
                      initial={{ opacity: 0.6, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </AnimatedReveal>
        </main>
      )}
      
      <Footer />
      
      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FleetPage;