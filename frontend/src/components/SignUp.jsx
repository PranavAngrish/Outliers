// SignUp.jsx
import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const InputField = ({ label, type, placeholder, value, onChange, error, pattern, maxLength }) => (
  <div className="mb-2">
    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>{label}</label>
    <input
      className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
      id={label}
      name={label.toLowerCase().replace(' ', '')}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern={pattern}
      maxLength={maxLength}
      onKeyPress={(event) => {
        if (pattern && !new RegExp(pattern).test(event.key)) {
          event.preventDefault();
        }
      }}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

const PasswordField = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Create Password</label>
      <div className="relative">
        <input
          className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

const SignUp = ({ onSignInClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: null,
    email: '',
    contactnumber: '',
    occupation: '',
    state: '',
    city: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contactnumber' && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      dob: date
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.contactnumber) newErrors.contactnumber = "Contact number is required";
    else if (formData.contactnumber.length !== 10) newErrors.contactnumber = "Contact number must be 10 digits";
    if (!formData.occupation) newErrors.occupation = "Occupation is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
        <InputField 
          label="Name" 
          type="text" 
          placeholder="Your name" 
          value={formData.name} 
          onChange={handleChange} 
          error={errors.name} 
          pattern="[A-Za-z\s]+"
        />
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="dob">Date of Birth</label>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dob ? 'border-red-500' : ''}`}
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
            popperPlacement="bottom-start"
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport"
              }
            }}
          />
          {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
        </div>
        <InputField 
          label="Email" 
          type="email" 
          placeholder="Your email" 
          value={formData.email} 
          onChange={handleChange} 
          error={errors.email}
        />
        <InputField 
          label="Contact Number" 
          type="tel" 
          placeholder="10 Digit Number" 
          value={formData.contactnumber} 
          onChange={handleChange} 
          error={errors.contactnumber}
          pattern="\d*"
          maxLength={10}
        />
        <div className="col-span-2">
          <InputField 
            label="Occupation" 
            type="text" 
            placeholder="Your occupation" 
            value={formData.occupation} 
            onChange={handleChange} 
            error={errors.occupation}
          />
        </div>
        <InputField 
          label="State" 
          type="text" 
          placeholder="Your state" 
          value={formData.state} 
          onChange={handleChange} 
          error={errors.state}
          pattern="[A-Za-z\s]+"
        />
        <InputField 
          label="City" 
          type="text" 
          placeholder="Your city" 
          value={formData.city} 
          onChange={handleChange} 
          error={errors.city}
          pattern="[A-Za-z\s]+"
        />
        <div className="col-span-2">
          <PasswordField value={formData.password} onChange={handleChange} error={errors.password} />
        </div>
        <button type="submit" className="col-span-2 mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Sign Up
        </button>
      </form>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center transition duration-300">
        <FaGoogle className="mr-2" /> Sign up with Google
      </button>
      <p className="text-center mt-4 text-sm">
        Already have an account? {' '}
        <button onClick={onSignInClick} className="text-pink-500 hover:text-pink-600 font-semibold">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;