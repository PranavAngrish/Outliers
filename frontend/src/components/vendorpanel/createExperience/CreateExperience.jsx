import React, { useState } from 'react';
import ExperienceForm from './ExperienceForm';
import VariantForm from './VariantForm';
import VariantPreview from './VariantPreview';
import api from '../../../axios/axios.js';
import { useSelector } from 'react-redux';

const CreateExperience = ({ setPendingExperiences, setIsCreatingExperience }) => {
  const vendorId = useSelector(state=>state.vendor.currentVendor.vendor._id);
  const initialExperience = {
    name: '',
    description: '',
    images: [],
    location: { state: '', city: '' },
    startDate: '',
    endDate: '',
    timeSlots: [],
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
    variants: [],
    vendor: vendorId,
    cancellationPeriod: 0,
    category: ''
  };

  const [experience, setExperience] = useState(initialExperience);
  const [isCreatingVariant, setIsCreatingVariant] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  const handleSaveExperience =async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try{
      console.log("THE EXPERIENCE SENT IS AS FOLLOW",experience);
      const response = await api.post('/experiences/create-experience',experience,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
       });
      console.log("The experience has been stored");
    }
    catch(error){
      console.error('Error creating experience:', error.response?.data || error.message);
    }
   

    setIsCreatingExperience(false);
  };

  const handleSaveVariant = (variant) => {
    setExperience(prev => {
      const updatedVariants = [...prev.variants];
      if (editingVariantIndex !== null) {
        updatedVariants[editingVariantIndex] = variant;
      } else {
        updatedVariants.push(variant);
      }
      return { ...prev, variants: updatedVariants };
    });
    setIsCreatingVariant(false);
    setEditingVariantIndex(null);
  };

  const addVariant = () => {
    setIsCreatingVariant(true);
    setEditingVariantIndex(null);
  };

  const editVariant = (index) => {
    setIsCreatingVariant(true);
    setEditingVariantIndex(index);
  };

  const deleteVariant = (index) => {
    setExperience(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {!isCreatingVariant ? (
        <form onSubmit={handleSaveExperience}>
          <ExperienceForm
            experience={experience}
            setExperience={setExperience}
            isVariant={false}
          />

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              <input
                type="checkbox"
                checked={experience.variants.length > 0 || isCreatingVariant}
                onChange={addVariant}
                className="mr-2"
              />
              Do you want to add variants?
            </label>
          </div>

          {experience.variants.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Saved Variants</h3>
              {experience.variants.map((variant, index) => (
                <VariantPreview 
                  key={index} 
                  variant={variant} 
                  index={index} 
                  onEdit={() => editVariant(index)}
                  onDelete={() => deleteVariant(index)}
                />
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
              >
                Add Another Variant
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <button
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Create Experience
            </button>
            <button
              className="text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
              onClick={() => setIsCreatingExperience(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <VariantForm 
          onSave={handleSaveVariant} 
          onCancel={() => {
            setIsCreatingVariant(false);
            setEditingVariantIndex(null);
          }} 
          initialVariant={editingVariantIndex !== null ? experience.variants[editingVariantIndex] : null}
        />
      )}
    </div>
  );
};

export default CreateExperience;