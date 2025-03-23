import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import images from '../assets/images'; // Assuming this is still necessary for static assets like default images.
import { BASE_API } from '../utils/Api';

const FleetPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null);
  const [vehicles, setVehicles] = useState([]); // State to hold fetched vehicles
  const [loading, setLoading] = useState(true); // State to handle loading status

  const navigate = useNavigate();

  const categories = ['All', 'Luxury Sedan', 'SUV', 'Limousine', 'Van'];

  // Fetch vehicles on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${BASE_API}/vehicles`);
        const data = await response.json();
        setVehicles(data); // Set the fetched vehicles in state
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchVehicles();
  }, []); // Empty dependency array to run this only once on mount

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

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading spinner or message
  }

  return (
    <div>
      <Navbar />
      <section className="bg-gray-100 mt-10 mb-10 bg-gradient-to-r from-blue-50 to-blue-500">
        <div className="container mx-auto flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/4 lg:w-1/4 bg-white shadow-md p-4">
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer p-2 rounded ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-3/4 p-4 m-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full p-3 border rounded border-cyan-700 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Vehicle Cards */}
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={vehicle.image || images.defaultCarImage} // Fallback to a default image if none exists
                    alt={vehicle.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {vehicle.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{vehicle.description}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-users text-primary"></i>
                        <span className="text-sm text-gray-600">
                          {vehicle.capacity}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-gas-pump text-primary"></i>
                        <span className="text-sm text-gray-600">
                          {vehicle.fuelType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-cogs text-primary"></i>
                        <span className="text-sm text-gray-600">
                          {vehicle.transmission}
                        </span>
                      </div>
                    </div>

                    {/* Dropdown Toggle */}
                    <div
                      className="cursor-pointer flex items-center justify-center space-x-2 p-2 rounded hover:bg-gray-200"
                      onClick={() => toggleCardExpansion(vehicle.id)}
                    >
                      <span className="text-sm text-gray-600">
                        {expandedCard === vehicle.id
                          ? 'Hide Details'
                          : 'More Details'}
                      </span>
                      <i
                        className={`fas fa-chevron-down text-primary transition-transform duration-300 ${
                          expandedCard === vehicle.id ? 'rotate-180' : ''
                        }`}></i>
                    </div>

                    {/* Expandable Details */}
                    {expandedCard === vehicle.id && (
                      <div className="mt-4 bg-gray-200 p-4 rounded">
                        <h4 className="text-md font-bold text-primary mb-2">
                          Vehicle Features:
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          {vehicle.features?.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <i className="fas fa-check-circle text-primary"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Book Now Button */}
                    <button
                      className="mt-4 w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                      onClick={() => handleBooking(vehicle)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FleetPage;
