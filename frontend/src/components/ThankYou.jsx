import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYou = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-lg text-center">
      <FaCheckCircle className="text-green-500 text-9xl mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
      <p className="text-xl text-gray-600">
        We are reviewing your details and will get back to you very shortly. Thanks for joining The Outliers Co.
      </p>
    </div>
  );
};

export default ThankYou;