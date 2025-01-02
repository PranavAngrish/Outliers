import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./custom-datepicker.css";
import api from '../axios/axios.js';


const InputField = ({ label, type, placeholder, name, value, onChange, error, pattern, maxLength }) => (
  <div className="mb-2">
    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={name}>{label}</label>
    <input
      className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
      id={name}
      name={name}
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

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    panCardNumber: '',
    gstNumber: '',
    password: '',
    state: '',
    city: '',
    accountNumber: '',
    ifseCode: '',
    branchName: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
  
    // Username validation (string)
    if (!formData.username) newErrors.username = "Username is required";
    else if (typeof formData.username !== "string") newErrors.username = "Username must be a string";
  
    // Email validation (string, valid email format)
    if (!formData.email) newErrors.email = "Email is required";
    else if (typeof formData.email !== "string") newErrors.email = "Email must be a string";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
  
    // Phone Number validation (number, 10 digits)
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (typeof formData.phoneNumber !== "string" || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be a 10-digit number";
    }
  
    // Password validation (string)
    if (!formData.password) newErrors.password = "Password is required";
    else if (typeof formData.password !== "string") newErrors.password = "Password must be a string";
  
    // City validation (string)
    if (!formData.city) newErrors.city = "City is required";
    else if (typeof formData.city !== "string") newErrors.city = "City must be a string";
  
    // State validation (string)
    if (!formData.state) newErrors.state = "State is required";
    else if (typeof formData.state !== "string") newErrors.state = "State must be a string";
  
    // PAN Card Number validation (string)
    if (!formData.panCardNumber) newErrors.panCardNumber = "PAN Card number is required";
    else if (typeof formData.panCardNumber !== "string") newErrors.panCardNumber = "PAN Card number must be a string";
  
    // GST Number validation (string)
    if (!formData.gstNumber) newErrors.gstNumber = "GST number is required";
    else if (typeof formData.gstNumber !== "string") newErrors.gstNumber = "GST number must be a string";
  
    // IFSC Code validation (string)
    if (!formData.ifseCode) newErrors.ifscCode = "IFSC code is required";
    else if (typeof formData.ifseCode !== "string") newErrors.ifseCode = "IFSE code must be a string";
  
    // Account Number validation (number)
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    else if (typeof formData.accountNumber !== "string" || !/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account number must be numeric";
    }
  
    // Branch Name validation (string)
    if (!formData.branchName) newErrors.branchName = "Branch name is required";
    else if (typeof formData.branchName !== "string") newErrors.branchName = "Branch name must be a string";
  
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    console.log("Lets gpo");
    e.preventDefault();
    if (validateForm()) {
      
      try {
        console.log('Form submitted: is', formData);
        const vendor = await api.post('/vendors/signup', formData);
        alert(vendor.data.message);
        console.log("Testing");
        console.log(vendor.status);

        if(vendor.status === 202){
          setFormData(()=>({
            username: '',
            email: '',
            phoneNumber: '',
            panCardNumber: '',
            gstNumber: '',
            password: '',
            state: '',
            city: '',
            accountNumber: '',
            ifseCode: '',
            branchName: ''
          }));
        }
        if(vendor.status === 201){
          navigate('/');

        }
        
        
      } catch (error) {
        console.log("We have an error in vendor sign-up");
        console.log("huh");
        alert(error.message);
        console.log(error);
      }
    }
  };

  const handleSignInClick = () => {
    navigate('/vendor-signin');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white bg-opacity-80 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">List With Us</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
        <InputField
          label="Username"
          type="text"
          placeholder="Enter a username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="10 Digit Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          pattern="\d*"
          maxLength={10}
        />
        <InputField
          label="PAN Card Number"
          type="text"
          placeholder="PAN Card Number"
          name="panCardNumber"
          value={formData.panCardNumber}
          onChange={handleChange}
          error={errors.panCardNumber}
        />
        <InputField
          label="GST Number"
          type="text"
          placeholder="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          error={errors.gstNumber}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          label="State"
          type="text"
          placeholder="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
        />
        <InputField
          label="City"
          type="text"
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
        </div>
        <InputField
          label="Account Number"
          type="text"
          placeholder="Account Number"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          error={errors.accountNumber}
        />
        <InputField
          label="IFSC Code"
          type="text"
          placeholder="IFSC Code"
          name="ifseCode"
          value={formData.ifseCode}
          onChange={handleChange}
          error={errors.ifseCode}
        />
        <InputField
          label="Branch Name"
          type="text"
          placeholder="Branch Name"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          error={errors.branchName}
        />
        <button type="submit" className="col-span-2 mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Send Request
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <button onClick={handleSignInClick} className="text-pink-500 hover:text-pink-600 font-semibold">
          Login
        </button>
      </p>
    </div>
  );
};

export default VendorSignup;
