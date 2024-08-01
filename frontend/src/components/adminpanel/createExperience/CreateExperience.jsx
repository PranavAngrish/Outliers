import React, { useState } from 'react';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';

const CreateExperience = ({ setPendingExperiences, setIsCreatingExperience }) => {
  const initialVariant = {
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
    boardingLocation: { latitude: '', longitude: '' },
    basePrice: '',
    taxes: '',
    fees: '',
  };

  const [newExperience, setNewExperience] = useState({
    ...initialVariant,
    addVariants: false,
    variants: [],
  });

  const handleImageUpload = (e, variantIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      const targetImages = variantIndex !== null ? newExperience.variants[variantIndex].images : newExperience.images;
      if (targetImages.length >= 10) {
        alert('You can upload a maximum of 10 images.');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      if (variantIndex !== null) {
        const updatedVariants = [...newExperience.variants];
        updatedVariants[variantIndex].images = [...targetImages, imageUrl];
        setNewExperience({ ...newExperience, variants: updatedVariants });
      } else {
        setNewExperience({ ...newExperience, images: [...targetImages, imageUrl] });
      }
    }
  };

  const removeImage = (index, variantIndex = null) => {
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex].images = updatedVariants[variantIndex].images.filter((_, i) => i !== index);
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      const updatedImages = newExperience.images.filter((_, i) => i !== index);
      setNewExperience({ ...newExperience, images: updatedImages });
    }
  };

  const handleArrayInputChange = (index, field, value, variantIndex = null) => {
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex][field][index] = value;
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      const updatedArray = [...newExperience[field]];
      updatedArray[index] = value;
      setNewExperience({ ...newExperience, [field]: updatedArray });
    }
  };

  const addArrayField = (field, variantIndex = null) => {
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex][field] = [...updatedVariants[variantIndex][field], ''];
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      setNewExperience({ ...newExperience, [field]: [...newExperience[field], ''] });
    }
  };

  const removeArrayField = (field, index, variantIndex = null) => {
    if (index === 0) return; // Prevent removing the first item
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex][field] = updatedVariants[variantIndex][field].filter((_, i) => i !== index);
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      const updatedArray = newExperience[field].filter((_, i) => i !== index);
      setNewExperience({ ...newExperience, [field]: updatedArray });
    }
  };

  const addFAQ = (variantIndex = null) => {
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex].faq = [...updatedVariants[variantIndex].faq, { question: '', answer: '' }];
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      setNewExperience({ ...newExperience, faq: [...newExperience.faq, { question: '', answer: '' }] });
    }
  };

  const removeFAQ = (index, variantIndex = null) => {
    if (index === 0) return; // Prevent removing the first FAQ
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex].faq = updatedVariants[variantIndex].faq.filter((_, i) => i !== index);
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      const updatedFAQ = newExperience.faq.filter((_, i) => i !== index);
      setNewExperience({ ...newExperience, faq: updatedFAQ });
    }
  };

  const handleFAQChange = (index, key, value, variantIndex = null) => {
    if (variantIndex !== null) {
      const updatedVariants = [...newExperience.variants];
      updatedVariants[variantIndex].faq[index][key] = value;
      setNewExperience({ ...newExperience, variants: updatedVariants });
    } else {
      const updatedFAQ = [...newExperience.faq];
      updatedFAQ[index][key] = value;
      setNewExperience({ ...newExperience, faq: updatedFAQ });
    }
  };

  const addVariant = () => {
    setNewExperience({
      ...newExperience,
      variants: [...newExperience.variants, { ...initialVariant }],
    });
  };

  const handleSaveExperience = (e) => {
    e.preventDefault();
    setPendingExperiences(prevExperiences => [...prevExperiences, { ...newExperience, id: Date.now(), status: 'Pending' }]);
    setIsCreatingExperience(false);
  };

  const inputClass = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5";
  const labelClass = "block mb-2 text-sm font-medium text-gray-900";
  const buttonClass = "text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  const renderExperienceForm = (variantIndex = null) => (
    <div className={variantIndex !== null ? "border-t-2 border-gray-200 pt-4 mt-4" : ""}>
      {variantIndex !== null && <h3 className="text-lg font-semibold mb-4">Variant {variantIndex + 1}</h3>}
      <div className="mb-4">
        <label className={labelClass} htmlFor={variantIndex !== null ? `name-${variantIndex}` : "name"}>Experience Name</label>
        <input
          className={inputClass}
          id={variantIndex !== null ? `name-${variantIndex}` : "name"}
          type="text"
          placeholder="Experience Name"
          value={variantIndex !== null ? newExperience.variants[variantIndex].name : newExperience.name}
          onChange={(e) => variantIndex !== null 
            ? setNewExperience({
                ...newExperience, 
                variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, name: e.target.value} : v)
              })
            : setNewExperience({...newExperience, name: e.target.value})
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor={variantIndex !== null ? `description-${variantIndex}` : "description"}>Description</label>
        <textarea
          className={inputClass}
          id={variantIndex !== null ? `description-${variantIndex}` : "description"}
          placeholder="Description"
          value={variantIndex !== null ? newExperience.variants[variantIndex].description : newExperience.description}
          onChange={(e) => variantIndex !== null
            ? setNewExperience({
                ...newExperience,
                variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, description: e.target.value} : v)
              })
            : setNewExperience({...newExperience, description: e.target.value})
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor={variantIndex !== null ? `images-${variantIndex}` : "images"}>Images (3-10)</label>
        <input
          type="file"
          id={variantIndex !== null ? `images-${variantIndex}` : "images"}
          accept="image/*"
          onChange={(e) => handleImageUpload(e, variantIndex)}
          className="mb-2"
        />
        <div className="grid grid-cols-5 gap-2">
          {(variantIndex !== null ? newExperience.variants[variantIndex].images : newExperience.images).map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(index, variantIndex)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <XCircleIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>State</label>
          <input
            className={inputClass}
            type="text"
            placeholder="State"
            value={variantIndex !== null ? newExperience.variants[variantIndex].location.state : newExperience.location.state}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, location: {...v.location, state: e.target.value}} : v)
                })
              : setNewExperience({...newExperience, location: {...newExperience.location, state: e.target.value}})
            }
            required
          />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input
            className={inputClass}
            type="text"
            placeholder="City"
            value={variantIndex !== null ? newExperience.variants[variantIndex].location.city : newExperience.location.city}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, location: {...v.location, city: e.target.value}} : v)
                })
              : setNewExperience({...newExperience, location: {...newExperience.location, city: e.target.value}})
            }
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor={variantIndex !== null ? `duration-${variantIndex}` : "duration"}>Duration</label>
        <input
          className={inputClass}
          id={variantIndex !== null ? `duration-${variantIndex}` : "duration"}
          type="text"
          placeholder="Duration"
          value={variantIndex !== null ? newExperience.variants[variantIndex].duration : newExperience.duration}
          onChange={(e) => variantIndex !== null
            ? setNewExperience({
                ...newExperience,
                variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, duration: e.target.value} : v)
              })
            : setNewExperience({...newExperience, duration: e.target.value})
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor={variantIndex !== null ? `overview-${variantIndex}` : "overview"}>Overview</label>
        <textarea
          className={inputClass}
          id={variantIndex !== null ? `overview-${variantIndex}` : "overview"}
          placeholder="Overview"
          value={variantIndex !== null ? newExperience.variants[variantIndex].overview : newExperience.overview}
          onChange={(e) => variantIndex !== null
            ? setNewExperience({
                ...newExperience,
                variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, overview: e.target.value} : v)
              })
            : setNewExperience({...newExperience, overview: e.target.value})
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Itinerary</label>
        {(variantIndex !== null ? newExperience.variants[variantIndex].itinerary : newExperience.itinerary).map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              className={`${inputClass} flex-grow`}
              type="text"
              placeholder={`Itinerary item ${index + 1}`}
              value={item}
              onChange={(e) => handleArrayInputChange(index, 'itinerary', e.target.value, variantIndex)}
              required
            />
            {index !== 0 && (
              <button type="button" onClick={() => removeArrayField('itinerary', index, variantIndex)} className="ml-2 text-red-500">
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('itinerary', variantIndex)} className={buttonClass}>
          <PlusCircleIcon className="h-5 w-5 inline mr-1" />
          Add Itinerary Item
        </button>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Highlights</label>
        {(variantIndex !== null ? newExperience.variants[variantIndex].highlights : newExperience.highlights).map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              className={`${inputClass} flex-grow`}
              type="text"
              placeholder={`Highlight ${index + 1}`}
              value={item}
              onChange={(e) => handleArrayInputChange(index, 'highlights', e.target.value, variantIndex)}
              required
            />
            {index !== 0 && (
              <button type="button" onClick={() => removeArrayField('highlights', index, variantIndex)} className="ml-2 text-red-500">
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('highlights', variantIndex)} className={buttonClass}>
          <PlusCircleIcon className="h-5 w-5 inline mr-1" />
          Add Highlight
        </button>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Inclusions</label>
        {(variantIndex !== null ? newExperience.variants[variantIndex].inclusions : newExperience.inclusions).map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              className={`${inputClass} flex-grow`}
              type="text"
              placeholder={`Inclusion ${index + 1}`}
              value={item}
              onChange={(e) => handleArrayInputChange(index, 'inclusions', e.target.value, variantIndex)}
              required
            />
            {index !== 0 && (
              <button type="button" onClick={() => removeArrayField('inclusions', index, variantIndex)} className="ml-2 text-red-500">
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('inclusions', variantIndex)} className={buttonClass}>
          <PlusCircleIcon className="h-5 w-5 inline mr-1" />
          Add Inclusion
        </button>
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor={variantIndex !== null ? `cancellationPolicy-${variantIndex}` : "cancellationPolicy"}>Cancellation Policy</label>
        <textarea
          className={inputClass}
          id={variantIndex !== null ? `cancellationPolicy-${variantIndex}` : "cancellationPolicy"}
          placeholder="Cancellation Policy"
          value={variantIndex !== null ? newExperience.variants[variantIndex].cancellationPolicy : newExperience.cancellationPolicy}
          onChange={(e) => variantIndex !== null
            ? setNewExperience({
                ...newExperience,
                variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, cancellationPolicy: e.target.value} : v)
              })
            : setNewExperience({...newExperience, cancellationPolicy: e.target.value})
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Know Before You Go</label>
        {(variantIndex !== null ? newExperience.variants[variantIndex].knowBeforeYouGo : newExperience.knowBeforeYouGo).map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              className={`${inputClass} flex-grow`}
              type="text"
              placeholder={`Know Before You Go ${index + 1}`}
              value={item}
              onChange={(e) => handleArrayInputChange(index, 'knowBeforeYouGo', e.target.value, variantIndex)}
              required
            />
            {index !== 0 && (
              <button type="button" onClick={() => removeArrayField('knowBeforeYouGo', index, variantIndex)} className="ml-2 text-red-500">
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('knowBeforeYouGo', variantIndex)} className={buttonClass}>
          <PlusCircleIcon className="h-5 w-5 inline mr-1" />
          Add Know Before You Go
        </button>
      </div>

      <div className="mb-4">
        <label className={labelClass}>FAQ</label>
        {(variantIndex !== null ? newExperience.variants[variantIndex].faq : newExperience.faq).map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex mb-2">
              <input
                className={`${inputClass} flex-grow`}
                type="text"
                placeholder={`Question ${index + 1}`}
                value={item.question}
                onChange={(e) => handleFAQChange(index, 'question', e.target.value, variantIndex)}
                required
              />
              {index !== 0 && (
                <button type="button" onClick={() => removeFAQ(index, variantIndex)} className="ml-2 text-red-500">
                  <XCircleIcon className="h-6 w-6" />
                </button>
              )}
            </div>
            <textarea
              className={inputClass}
              placeholder={`Answer ${index + 1}`}
              value={item.answer}
              onChange={(e) => handleFAQChange(index, 'answer', e.target.value, variantIndex)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addFAQ(variantIndex)} className={buttonClass}>
          <PlusCircleIcon className="h-5 w-5 inline mr-1" />
          Add FAQ
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Latitude</label>
          <input
            className={inputClass}
            type="text"
            placeholder="Latitude"
            value={variantIndex !== null ? newExperience.variants[variantIndex].boardingLocation.latitude : newExperience.boardingLocation.latitude}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, boardingLocation: {...v.boardingLocation, latitude: e.target.value}} : v)
                })
              : setNewExperience({...newExperience, boardingLocation: {...newExperience.boardingLocation, latitude: e.target.value}})
            }
            required
          />
        </div>
        <div>
          <label className={labelClass}>Longitude</label>
          <input
            className={inputClass}
            type="text"
            placeholder="Longitude"
            value={variantIndex !== null ? newExperience.variants[variantIndex].boardingLocation.longitude : newExperience.boardingLocation.longitude}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, boardingLocation: {...v.boardingLocation, longitude: e.target.value}} : v)
                })
              : setNewExperience({...newExperience, boardingLocation: {...newExperience.boardingLocation, longitude: e.target.value}})
            }
            required
          />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass} htmlFor={variantIndex !== null ? `basePrice-${variantIndex}` : "basePrice"}>Base Price</label>
          <input
            className={inputClass}
            id={variantIndex !== null ? `basePrice-${variantIndex}` : "basePrice"}
            type="number"
            placeholder="Base Price"
            value={variantIndex !== null ? newExperience.variants[variantIndex].basePrice : newExperience.basePrice}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, basePrice: e.target.value} : v)
                })
              : setNewExperience({...newExperience, basePrice: e.target.value})
            }
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={variantIndex !== null ? `taxes-${variantIndex}` : "taxes"}>Taxes</label>
          <input
            className={inputClass}
            id={variantIndex !== null ? `taxes-${variantIndex}` : "taxes"}
            type="number"
            placeholder="Taxes"
            value={variantIndex !== null ? newExperience.variants[variantIndex].taxes : newExperience.taxes}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, taxes: e.target.value} : v)
                })
              : setNewExperience({...newExperience, taxes: e.target.value})
            }
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={variantIndex !== null ? `fees-${variantIndex}` : "fees"}>Fees</label>
          <input
            className={inputClass}
            id={variantIndex !== null ? `fees-${variantIndex}` : "fees"}
            type="number"
            placeholder="Fees"
            value={variantIndex !== null ? newExperience.variants[variantIndex].fees : newExperience.fees}
            onChange={(e) => variantIndex !== null
              ? setNewExperience({
                  ...newExperience,
                  variants: newExperience.variants.map((v, i) => i === variantIndex ? {...v, fees: e.target.value} : v)
                })
              : setNewExperience({...newExperience, fees: e.target.value})
            }
            required
          />
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSaveExperience} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {renderExperienceForm()}

      <div className="mb-4">
        <label className={labelClass}>
          <input
            type="checkbox"
            checked={newExperience.addVariants}
            onChange={(e) => setNewExperience({...newExperience, addVariants: e.target.checked})}
            className="mr-2"
          />
          Do you want to add variants?
        </label>
      </div>

      {newExperience.addVariants && (
        <div>
          {newExperience.variants.map((variant, index) => (
            <div key={index}>
              {renderExperienceForm(index)}
            </div>
          ))}
          <button type="button" onClick={addVariant} className={`${buttonClass} mt-4`}>
            Add Another Variant
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <button
          className={`${buttonClass} bg-black hover:bg-gray-800`}
          type="submit"
        >
          Create Experience
        </button>
        <button
          className={`${buttonClass} bg-gray-500 hover:bg-gray-700`}
          type="button"
          onClick={() => setIsCreatingExperience(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateExperience;