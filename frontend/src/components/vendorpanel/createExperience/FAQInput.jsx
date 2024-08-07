import React from 'react';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';

const FAQInput = ({ faqs, setFaqs }) => {
  const handleFAQChange = (index, key, value) => {
    const updatedFAQs = [...faqs];
    updatedFAQs[index][key] = value;
    setFaqs(updatedFAQs);
  };

  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFAQ = (index) => {
    if (index === 0) return;
    const updatedFAQs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFAQs);
  };

  const inputClass = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5";
  const buttonClass = "text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900">FAQ</label>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2">
          <div className="flex mb-2">
            <input
              className={`${inputClass} flex-grow`}
              type="text"
              placeholder={`Question ${index + 1}`}
              value={faq.question}
              onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
              required
            />
            {index !== 0 && (
              <button type="button" onClick={() => removeFAQ(index)} className="ml-2 text-red-500">
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
          <textarea
            className={inputClass}
            placeholder={`Answer ${index + 1}`}
            value={faq.answer}
            onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addFAQ} className={buttonClass}>
        <PlusCircleIcon className="h-5 w-5 inline mr-1" />
        Add FAQ
      </button>
    </div>
  );
};

export default FAQInput;