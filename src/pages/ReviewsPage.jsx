import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';

const ReviewsPage = () => {
  return (
    <div>
      <Navbar />
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-500">
        <h1 className="text-4xl font-bold text-center mb-8">What Our Customers Say</h1>
        <Reviews />
      </section>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
