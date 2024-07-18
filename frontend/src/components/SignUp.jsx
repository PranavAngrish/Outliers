import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({ label, type, placeholder, value, onChange, error }) => (
  <div className="mb-2">
    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>{label}</label>
    <input
      className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
      id={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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
  const [formData, setFormData] = useState({ name: '', age: '', email: '', contactNumber: '', addressState: '', addressCity: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.addressState) newErrors.addressState = "State is required";
    if (!formData.addressCity) newErrors.addressCity = "City is required";
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
        <InputField label="Name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} error={errors.name} />
        <InputField label="Age" type="number" placeholder="Your age" value={formData.age} onChange={handleChange} error={errors.age} />
        <InputField label="Email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} error={errors.email} />
        <InputField label="Contact Number" type="tel" placeholder="Your number" value={formData.contactNumber} onChange={handleChange} error={errors.contactNumber} />
        <InputField label="State" type="text" placeholder="Your state" value={formData.addressState} onChange={handleChange} error={errors.addressState} />
        <InputField label="City" type="text" placeholder="Your city" value={formData.addressCity} onChange={handleChange} error={errors.addressCity} />
        <div className="col-span-2">
          <PasswordField value={formData.password} onChange={(e) => handleChange({ target: { id: 'password', value: e.target.value } })} error={errors.password} />
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