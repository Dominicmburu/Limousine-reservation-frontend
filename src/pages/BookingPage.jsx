import React from 'react';
import Navbar from '../components/Navbar';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const BookingPage = () => {

  const location = useLocation();
  const carDetails = location.state?.vehicle || {};
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-500">
        <h1 className="text-4xl font-bold text-center mb-8">Book Your Ride</h1>
        <div className="flex justify-center">
          <BookingForm carDetails={carDetails} userName={user?.name || 'Guest'} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BookingPage;
