import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { BASE_API } from '../utils/Api';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ carDetails, userName }) => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  const navigate = useNavigate();

  if (user == null) {
    // alert('Please log in to make a booking.');
    navigate('/login');
  }


  const [formData, setFormData] = useState({
    pickup_location: '',
    dropoff_location: '',
    pickup_datetime: '',
    dropoff_datetime: '',
    payment_method: '',
  });

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch vehicles data when the component mounts
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${BASE_API}/vehicles`);
        const data = await response.json();
        setVehicles(data); // Set the fetched vehicles in state
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []); // Empty dependency array to run this only once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Authorization token not found. Please log in again.');
      return;
    }

    setLoading(true);
    const bookingData = {
      userId: user.id,
      vehicle_id: selectedVehicleId, // Use selected vehicle ID from dropdown
      pickup_location: formData.pickup_location,
      dropoff_location: formData.dropoff_location,
      pickup_datetime: formData.pickup_datetime,
      dropoff_datetime: formData.dropoff_datetime,
      payment_method: formData.payment_method,
    };

    try {
      const response = await fetch(`${BASE_API}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setShowSuccessDialog(true);
        setFormData({
          pickup_location: '',
          dropoff_location: '',
          pickup_datetime: '',
          dropoff_datetime: '',
          payment_method: '',
        });
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to make the booking.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="p-8 bg-blue-50 rounded-lg shadow-md max-w-lg w-full">
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* User Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">User</label>
          <input
            type="text"
            value={userName || ''}
            readOnly
            className="block w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Vehicle Select Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Vehicle</label>
          <select
            name="vehicle"
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)} // Update selected vehicle ID
            className="block w-full p-2 border border-cyan-700 rounded mb-4"
            required
          >
            <option value="">Select a Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} - {vehicle.model} ({vehicle.year})
              </option>
            ))}
          </select>
        </div>

        {/* Pickup Location */}
        <input
          type="text"
          name="pickup_location"
          placeholder="Pickup Location"
          value={formData.pickup_location}
          onChange={handleChange}
          className="block w-full p-2 border border-cyan-700 rounded mb-4"
        />

        {/* Dropoff Location */}
        <input
          type="text"
          name="dropoff_location"
          placeholder="Dropoff Location"
          value={formData.dropoff_location}
          onChange={handleChange}
          className="block w-full p-2 border border-cyan-700 rounded mb-4"
        />

        {/* Pickup DateTime */}
        <label className="block mb-2 font-semibold text-sm">
          Pickup Date and Time
        </label>
        <input
          type="datetime-local"
          name="pickup_datetime"
          value={formData.pickup_datetime}
          onChange={handleChange}
          className="block w-full p-2 border border-cyan-700 rounded mb-4"
        />

        {/* Dropoff DateTime */}
        <label className="block mb-2 font-semibold text-sm">
          Dropoff Date and Time
        </label>
        <input
          type="datetime-local"
          name="dropoff_datetime"
          value={formData.dropoff_datetime}
          onChange={handleChange}
          className="block w-full p-2 border border-cyan-700 rounded mb-4"
        />

        {/* Payment Method */}
        <label className="block mb-2 font-semibold text-sm">Payment Method</label>
        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
          className="block w-full p-2 border border-cyan-700 rounded mb-4"
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash">Cash</option>
        </select>

        <button type="submit" className="bg-primary text-white p-2 rounded w-full" disabled={loading}>
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>

      {showSuccessDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
            <p className="mb-4">Your booking has been confirmed. Enjoy your ride!</p>

            <p className="mb-4">
              A confirmation email has been sent to your inbox. Please check your email for the details of your reservation.
            </p>

            <p className="mb-4">
              To ensure everything goes smoothly, we recommend arriving 15 minutes earlier than your pickup time.
            </p>

            <button
              onClick={() => setShowSuccessDialog(false)}
              className="mt-4 bg-primary text-white p-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default BookingForm;
