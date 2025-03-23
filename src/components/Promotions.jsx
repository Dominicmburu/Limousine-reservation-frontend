import React from 'react';

const promotions = [
  { title: 'Holiday Discount', details: '10% off on all bookings this December!' },
  { title: 'Referral Bonus', details: 'Earn free rides by referring friends!' },
];

const Promotions = () => {
  return (
    <section id="promotions" className="p-8 bg-primary text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Special Promotions</h2>
      <div className="grid gap-4">
        {promotions.map((promo, index) => (
          <div key={index} className="p-4 bg-white text-black rounded shadow-md">
            <h3 className="font-bold text-lg">{promo.title}</h3>
            <p>{promo.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
