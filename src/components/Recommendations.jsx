import React from 'react';

const Recommendations = ({ history = [] }) => {
  const suggestedVehicles = history.includes('SUV') 
    ? ['Luxury Sedan', 'Limousine'] 
    : ['SUV', 'Compact Car'];

  return (
    <section id="recommendations" className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Recommended For You</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {suggestedVehicles.map((vehicle, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded">
            <p className="font-bold">{vehicle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
