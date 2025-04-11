import React from 'react';
import '../styles/reviews.css';

const reviews = [
  { name: "Osama Mansouri", comment: "The limousine was top-notch. Highly recommend!", rating: 5 },
  { name: "Hamza Al Ali", comment: "Amazing service and super comfortable rides.", rating: 4.5 },
  { name: "Emad Mansouri", comment: "Professional drivers and clean vehicles.", rating: 4 },
  { name: "Yahia Sonbaty", comment: "Professional drivers and clean vehicles.", rating: 4 },
  { name: "Saef Wezri", comment: "Professional drivers and clean vehicles.", rating: 4 },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-16">
      <div className="container mx-auto text-center">
        <div className="relative overflow-hidden">
          <div className="flex space-x-8 px-4 overflow-x-auto hide-scrollbar">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white p-8 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 w-72"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{review.name}</h3>
                <p className="text-gray-600 mb-4">{review.comment}</p>
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-yellow-500 text-lg">{review.rating} ★</p>
                  <div className="flex space-x-1">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                    {review.rating % 1 !== 0 && (
                      <span className="text-yellow-500">☆</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};

export default Reviews;
