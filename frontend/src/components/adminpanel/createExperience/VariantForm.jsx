import React, { useState, useEffect } from 'react';
import ExperienceForm from './ExperienceForm';

const VariantForm = ({ onSave, onCancel, initialVariant }) => {
  const [variant, setVariant] = useState(initialVariant || {
    name: '',
    description: '',
    images: [],
    location: { state: '', city: '' },
    startDate: '',
    endDate: '',
    timeSlots: [''],
    maxOccupancyPerSlot: '',
    duration: '',
    overview: '',
    itinerary: [''],
    highlights: [''],
    inclusions: [''],
    cancellationPolicy: '',
    knowBeforeYouGo: [''],
    faq: [{ question: '', answer: '' }],
    boardingLocationLink: '',
    basePrice: '',
    taxes: '',
    fees: '',
  });

  useEffect(() => {
    if (initialVariant) {
      setVariant(initialVariant);
    }
  }, [initialVariant]);

  const handleSaveVariant = (e) => {
    e.preventDefault();
    onSave(variant);
  };

  return (
    <form onSubmit={handleSaveVariant}>
      <h2 className="text-2xl font-bold mb-4">{initialVariant ? 'Edit Variant' : 'Create Variant'}</h2>
      <ExperienceForm experience={variant} setExperience={setVariant} isVariant={true} />
      <div className="flex items-center justify-between mt-6">
        <button
          className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          {initialVariant ? 'Update Variant' : 'Save Variant'}
        </button>
        <button
          className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default VariantForm;