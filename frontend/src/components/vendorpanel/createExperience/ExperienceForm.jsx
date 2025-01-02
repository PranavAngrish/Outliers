import React from 'react';
import ImageUpload from './ImageUpload';
import ArrayInput from './ArrayInput';
import FAQInput from './FAQInput';

const ExperienceForm = ({ experience, setExperience, isVariant }) => {
  const handleChange = (field, value) => {
    setExperience(prev => ({...prev, [field]: value}));
  };

  const handleLocationChange = (field, value) => {
    setExperience(prev => ({...prev, location: {...prev.location, [field]: value}}));
  };

  const handleTimeSlotChange = (index, value) => {

     // Assume that the date is today's date for simplicity
  const today = new Date();
  
  // Split the time (HH:MM) into hours and minutes
  const [hours, minutes] = value.split(':').map(Number);

  // Create a new Date object with the current date and the selected time
  const dateWithTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

  const updatedTimeSlots = [...experience.timeSlots];
  updatedTimeSlots[index] = dateWithTime;
  
  setExperience(prev => ({...prev, timeSlots: updatedTimeSlots}));

  };

  // Helper function to format the Date object into "HH:mm" for displaying in the input field
const formatTimeForInput = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};


  const addTimeSlot = () => {
    setExperience(prev => ({...prev, timeSlots: [...prev.timeSlots, '']}));
  };

  const removeTimeSlot = (index) => {
    if (experience.timeSlots.length > 1) {
      setExperience(prev => ({
        ...prev,
        timeSlots: prev.timeSlots.filter((_, i) => i !== index)
      }));
    }
  };

  const inputClass = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5";
  const labelClass = "block mb-2 text-sm font-medium text-gray-900";

  return (
    <div>
      <div className="mb-4">
        <label className={labelClass} htmlFor="name">{isVariant ? "Variant Name" : "Experience Name"}</label>
        <input
          className={inputClass}
          id="name"
          type="text"
          placeholder={isVariant ? "Variant Name" : "Experience Name"}
          value={experience.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="description">Description</label>
        <textarea
          className={inputClass}
          id="description"
          placeholder="Description"
          value={experience.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>

      <ImageUpload
        images={experience.images}
        setImages={(images) => handleChange('images', images)}
      />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>State</label>
          <input
            className={inputClass}
            type="text"
            placeholder="State"
            value={experience.location.state}
            onChange={(e) => handleLocationChange('state', e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input
            className={inputClass}
            type="text"
            placeholder="City"
            value={experience.location.city}
            onChange={(e) => handleLocationChange('city', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="startDate">Start Date</label>
          <input
            className={inputClass}
            id="startDate"
            type="date"
            value={experience.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="endDate">End Date</label>
          <input
            className={inputClass}
            id="endDate"
            type="date"
            value={experience.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            min={experience.startDate || new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <div className="mb-4">
    <label className={labelClass}>Time Slots</label>
    {experience.timeSlots.map((slot, index) => (
      <div key={index} className="flex mb-2">
        <input
          className={`${inputClass} flex-grow`}
          type="time"
          value={formatTimeForInput(new Date(slot))}
          onChange={(e) => handleTimeSlotChange(index, e.target.value)}
          required
        />
        {index > 0 && (
          <button
            type="button"
            onClick={() => removeTimeSlot(index)}
            className="ml-2 text-red-500"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={addTimeSlot}
      className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Add Time Slot
    </button>
  </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="category">Category</label>
        <input
          className={inputClass}
          id="category"
          type="text"
          placeholder="Category"
          value={experience.category}
          onChange={(e) => handleChange('category', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="maxOccupancyPerSlot">Max Occupancy Per Slot</label>
        <input
          className={inputClass}
          id="maxOccupancyPerSlot"
          type="number"
          placeholder="Max Occupancy Per Slot"
          value={experience.maxOccupancyPerSlot}
          onChange={(e) => handleChange('maxOccupancyPerSlot', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="cancellationPeriod">Cancellation period</label>
        <input
          className={inputClass}
          id="cancellationPeriod"
          type="number"
          placeholder="Cancellation period"
          value={experience.cancellationPeriod}
          onChange={(e) => handleChange('cancellationPeriod', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="duration">Duration</label>
        <input
          className={inputClass}
          id="duration"
          type="text"
          placeholder="Duration Per Slot"
          value={experience.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="overview">Overview</label>
        <textarea
          className={inputClass}
          id="overview"
          placeholder="Overview"
          value={experience.overview}
          onChange={(e) => handleChange('overview', e.target.value)}
          required
        />
      </div>

      <ArrayInput
        label="Itinerary"
        items={experience.itinerary}
        setItems={(items) => handleChange('itinerary', items)}
      />

      <ArrayInput
        label="Highlights"
        items={experience.highlights}
        setItems={(items) => handleChange('highlights', items)}
      />

      <ArrayInput
        label="Inclusions"
        items={experience.inclusions}
        setItems={(items) => handleChange('inclusions', items)}
      />

      <div className="mb-4">
        <label className={labelClass} htmlFor="cancellationPolicy">Cancellation Policy</label>
        <textarea
          className={inputClass}
          id="cancellationPolicy"
          placeholder="Cancellation Policy"
          value={experience.cancellationPolicy}
          onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
          required
        />
      </div>

      <ArrayInput
        label="Know Before You Go"
        items={experience.knowBeforeYouGo}
        setItems={(items) => handleChange('knowBeforeYouGo', items)}
      />

      <FAQInput
        faqs={experience.faq}
        setFaqs={(faqs) => handleChange('faq', faqs)}
      />

      <div className="mb-4">
        <label className={labelClass} htmlFor="boardingLocationLink">Boarding Location Google Map Link</label>
        <input
          className={inputClass}
          id="boardingLocationLink"
          type="url"
          placeholder="https://goo.gl/maps/..."
          value={experience.boardingLocationLink}
          onChange={(e) => handleChange('boardingLocationLink', e.target.value)}
          required
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass} htmlFor="basePrice">Base Price</label>
          <input
            className={inputClass}
            id="basePrice"
            type="number"
            placeholder="Base Price"
            value={experience.basePrice}
            onChange={(e) => handleChange('basePrice', e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="taxes">Taxes</label>
          <input
            className={inputClass}
            id="taxes"
            type="number"
            placeholder="Taxes"
            value={experience.taxes}
            onChange={(e) => handleChange('taxes', e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fees">Fees</label>
          <input
            className={inputClass}
            id="fees"
            type="number"
            placeholder="Fees"
            value={experience.fees}
            onChange={(e) => handleChange('fees', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;