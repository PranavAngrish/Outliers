import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../custom-datepicker.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons




const InputField = ({ label, type, placeholder, value, onChange, error }) => {
  const fieldName = label.toLowerCase().replace(/ /g, ''); // Convert "Contact Number" to "contactnumber"
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={fieldName}>{label}</label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
        id={fieldName}
        name={fieldName} // Set name attribute to match state property
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};








const SignUpStepTwo = ({ formData, onSubmit }) => {
  
  
  const [data, setData] = useState({
    name: formData.name || '',
    dob: null,
    contactnumber: '',
    occupation: '',
    state: '',
    city: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for showing password


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate contact number input
    if (name === 'contactnumber' && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setData(prevData => ({ ...prevData, [name]: value }));
  };
  

  const handleDateChange = (date) => {
    setData(prevData => ({ ...prevData, dob: date }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.dob) newErrors.dob = "Date of Birth is required";
    if (!data.contactnumber) newErrors.contactnumber = "Contact number is required";
    else if (data.contactnumber.length !== 10) newErrors.contactnumber = "Contact number must be 10 digits";
    if (!data.occupation) newErrors.occupation = "Occupation is required";
    if (!data.state) newErrors.state = "State is required";
    if (!data.city) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    const completeData = { ...formData, ...data }; // Merge form data
    onSubmit(completeData); // Pass the merged data to the parent component or handler
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
        <InputField
          label="Name"
          type="text"
          placeholder="Your name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="dob">Date of Birth</label>
          <DatePicker
            selected={data.dob}
            onChange={handleDateChange}
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dob ? 'border-red-500' : ''}`}
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
          />
          {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
        </div>
        <InputField
          label="Contact Number"
          type="tel"
          placeholder="10 Digit Number"
          value={data.contactnumber}
          onChange={handleChange}
          error={errors.contactnumber}
        />
        <InputField
          label="Occupation"
          type="text"
          placeholder="Your occupation"
          value={data.occupation}
          onChange={handleChange}
          error={errors.occupation}
        />
        <InputField
          label="State"
          type="text"
          placeholder="Your state"
          value={data.state}
          onChange={handleChange}
          error={errors.state}
        />
        <InputField
          label="City"
          type="text"
          placeholder="Your city"
          value={data.city}
          onChange={handleChange}
          error={errors.city}
        />
        <button type="submit" className="col-span-2 mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Complete Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpStepTwo;
