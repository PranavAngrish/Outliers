import React, { useState } from 'react';
import ExperienceForm from './ExperienceForm';
import VariantForm from './VariantForm';
import VariantPreview from './VariantPreview';

const CreateExperience = ({ setPendingExperiences, setIsCreatingExperience }) => {
  const initialExperience = {
    name: '',
    description: '',
    images: [],
    location: { state: '', city: '' },
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
  };

  const [experience, setExperience] = useState(initialExperience);
  const [isCreatingVariant, setIsCreatingVariant] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  const handleSaveExperience = (e) => {
    e.preventDefault();
    setPendingExperiences(prevExperiences => [...prevExperiences, { ...experience, id: Date.now(), status: 'Pending' }]);
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