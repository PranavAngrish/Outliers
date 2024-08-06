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

      <div className="mb-4">
        <label className={labelClass} htmlFor="duration">Duration</label>
        <input
          className={inputClass}
          id="duration"
          type="text"
          placeholder="Duration"
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