import React from 'react';
import images from '../assets/images';

const vehicles = [
  { name: 'LONDON CAB', image: images.car11, description: 'Comfortable for city rides.' },
  // { name: 'LONDON CAB', image: images.car12, description: 'Spacious for family trips.' },
  { name: 'SANTA FE', image: images.car14, description: 'Perfect for special events.' },
  { name: 'CHAIRMAN VIP', image: images.car17, description: 'Open-air experience for sunny days.' },
  { name: 'MERCEDES E200', image: images.car2, description: 'For those who love speed and style.' },
  { name: 'HONGQI HS', image: images.car21, description: 'Ideal for group travel and large families.' },
  // { name: 'Executive Sedan', image: images.car17, description: 'Premium comfort for business travelers.' },
  // { name: 'Minivan', image: images.car18, description: 'Spacious and practical for family adventures.' },
  // { name: 'Classic Car', image: images.car19, description: 'Perfect for nostalgic rides and events.' },
];

const VehicleList = () => {
  return (
    <section id="vehicles" className="py-16 bg-gradient-to-r from-blue-50 to-blue-500">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">Our Fleet Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="transform transition-all hover:scale-105 hover:shadow-2xl border border-transparent rounded-lg bg-white p-6 shadow-lg hover:border-blue-400"
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-56 object-cover rounded-t-lg mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{vehicle.name}</h3>
              <p className="text-gray-600 text-lg">{vehicle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleList;
