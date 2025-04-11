import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide luxury transportation services including airport transfers, city tours, special events, and corporate travel.",
    },
    {
      question: "How can I book a ride?",
      answer:
        "You can book a ride online through our booking page or by contacting us directly via email or phone.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards and online payment systems through secure gateways.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made at least 24 hours in advance are eligible for a full refund. Please refer to our terms for detailed information.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-500">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* FAQ Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="text-xl font-semibold w-full text-left flex justify-between items-center"
                  >
                    {faq.question}
                    <span>{openIndex === index ? "▲" : "▼"}</span>
                  </button>
                  {openIndex === index && (
                    <p className="text-gray-800 mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 bg-blue-50 p-6 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <form>
              <input
                type="text"
                placeholder="Your Name"
                className="block w-full p-2 border border-cyan-700 rounded mb-4"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="block w-full p-2 border border-cyan-700 rounded mb-4"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="block w-full p-2 border border-cyan-700 rounded mb-4"
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Car Locations</h2>
          <div className="map-container" style={{ height: "500px", width: "100%" }}>
            <iframe
              title="Car Locations"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111671.5322877786!2d20.01326540516441!3d32.0886324308765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8e6e0fcf1327d%3A0x54f52c0d92f6f7db!2sBenghazi%2C%20Libya!5e0!3m2!1sen!2sly!4v1712838376373!5m2!1sen!2sly"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
