// CreateExperience.jsx
import React, { useState } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const CreateExperience = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    images: [],
    state: '',
    city: '',
    duration: '',
    overview: '',
    itinerary: [''],
    highlights: [''],
    inclusions: [''],
    cancellationPolicy: '',
    knowBeforeYouGo: [''],
    faqs: [{ question: '', answer: '' }],
    boardingLocation: { latitude: '', longitude: '' },
    hasVariants: false,
    basePrice: '',
    taxes: '',
    fees: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      alert('You can upload a maximum of 10 images');
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, ...files]
    }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: [...prevState[field], '']
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index)
    }));
  };

  const handleFaqChange = (index, key, value) => {
    setFormData(prevState => ({
      ...prevState,
      faqs: prevState.faqs.map((faq, i) => i === index ? { ...faq, [key]: value } : faq)
    }));
  };

  const handleAddFaq = () => {
    setFormData(prevState => ({
      ...prevState,
      faqs: [...prevState.faqs, { question: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (index) => {
    setFormData(prevState => ({
      ...prevState,
      faqs: prevState.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-8 border w-4/5 shadow-2xl rounded-lg bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-black">Create New Experience</h3>
          <button onClick={onClose} className="text-black hover:text-gray-700 transition-colors">
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Experience Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Upload Images (3-10)</label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                accept="image/*"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Duration (hours)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows="4"
              required
            ></textarea>
          </div>

          {['itinerary', 'highlights', 'inclusions', 'knowBeforeYouGo'].map((field) => (
            <div key={field}>
              <label className="block mb-2 font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
              {formData[field].map((item, index) => (
                <div key={index} className="flex mb-2">
                  <textarea
                    value={item}
                    onChange={(e) => handleArrayChange(index, field, e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    rows="2"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(field, index)}
                    className="ml-2 p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem(field)}
                className="mt-2 p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <FaPlus /> Add Item
              </button>
            </div>
          ))}

          <div>
            <label className="block mb-2 font-semibold">Cancellation Policy</label>
            <textarea
              name="cancellationPolicy"
              value={formData.cancellationPolicy}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-semibold">FAQs</label>
            {formData.faqs.map((faq, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                  placeholder="Question"
                  className="w-full p-3 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                  placeholder="Answer"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                ></textarea>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(index)}
                  className="mt-2 p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  <FaTrash /> Remove FAQ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFaq}
              className="mt-2 p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <FaPlus /> Add FAQ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Boarding Location Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.boardingLocation.latitude}
                onChange={(e) => setFormData(prevState => ({
                  ...prevState,
                  boardingLocation: { ...prevState.boardingLocation, latitude: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Boarding Location Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.boardingLocation.longitude}
                onChange={(e) => setFormData(prevState => ({
                  ...prevState,
                  boardingLocation: { ...prevState.boardingLocation, longitude: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasVariants"
                checked={formData.hasVariants}
                onChange={handleChange}
                className="mr-2 focus:ring-2 focus:ring-black"
              />
              <span className="font-semibold">Do you want to add variants?</span>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Base Price</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Taxes</label>
              <input
                type="number"
                name="taxes"
                value={formData.taxes}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Fees</label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Create Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExperience;