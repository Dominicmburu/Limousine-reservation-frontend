import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { BASE_API } from '../utils/Api';

const BookingForm = ({ carDetails, userName }) => {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    pickup_location: '',
    dropoff_location: '',
    pickup_datetime: '',
    dropoff_datetime: '',
    payment_method: '',
  });

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    const bookingData = {
      userId: user.id, 
      vehicle_id: carDetails?.id, 
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
  };

  return (
    <section
      id="book"
      className="p-8 bg-blue-50 rounded-lg shadow-md max-w-lg w-full"
    >
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

        {/* Vehicle Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Vehicle</label>
          <input
            type="text"
            value={carDetails?.name || ''}
            readOnly
            className="block w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
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

        <button type="submit" className="bg-primary text-white p-2 rounded w-full">
          Book Now
        </button>
      </form>

      {showSuccessDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
            <p>Your booking has been confirmed. Enjoy your ride!</p>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="mt-4 bg-primary text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
    </section>
  );
};

export default BookingForm;
