import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const FileUploadField = ({ label, onChange, error }) => (
  <div className="mb-2">
    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>{label}</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
      onChange={onChange}
      className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
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
    panCardImage: null,
    gstNumber: '',
    cancelledChequeImage: null,
    password: '',
    accountNumber: '',
    ifscCode: '',
    branchName: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.panCardNumber) newErrors.panCardNumber = "PAN Card number is required";
    if (!formData.panCardImage) newErrors.panCardImage = "PAN Card image is required";
    if (!formData.gstNumber) newErrors.gstNumber = "GST number is required";
    if (!formData.cancelledChequeImage) newErrors.cancelledChequeImage = "Cancelled cheque image is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    if (!formData.branchName) newErrors.branchName = "Branch name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  const handleSignInClick = () => {
    navigate('/auth');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white bg-opacity-80 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">List With Us</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
        <InputField 
          label="Username" 
          type="text" 
          placeholder="Enter a username" 
          value={formData.username} 
          onChange={handleChange} 
          error={errors.username}
        />
        <InputField 
          label="Email" 
          type="email" 
          placeholder="Your email" 
          value={formData.email} 
          onChange={handleChange} 
          error={errors.email}
        />
        <InputField 
          label="Phone Number" 
          type="tel" 
          placeholder="10 Digit Number" 
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
          value={formData.panCardNumber} 
          onChange={handleChange} 
          error={errors.panCardNumber}
        />
        <FileUploadField
          label="Upload PAN Card Image"
          onChange={(e) => handleChange({ target: { name: 'panCardImage', type: 'file', files: e.target.files } })}
          error={errors.panCardImage}
        />
        <InputField 
          label="GST Number" 
          type="text" 
          placeholder="GST Number" 
          value={formData.gstNumber} 
          onChange={handleChange} 
          error={errors.gstNumber}
        />
        <FileUploadField
          label="Upload Cancelled Cheque Image"
          onChange={(e) => handleChange({ target: { name: 'cancelledChequeImage', type: 'file', files: e.target.files } })}
          error={errors.cancelledChequeImage}
        />
        <InputField 
          label="Password" 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          error={errors.password}
        />
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
        </div>
        <InputField 
          label="Account Number" 
          type="text" 
          placeholder="Account Number" 
          value={formData.accountNumber} 
          onChange={handleChange} 
          error={errors.accountNumber}
        />
        <InputField 
          label="IFSC Code" 
          type="text" 
          placeholder="IFSC Code" 
          value={formData.ifscCode} 
          onChange={handleChange} 
          error={errors.ifscCode}
        />
        <InputField 
          label="Branch Name" 
          type="text" 
          placeholder="Branch Name" 
          value={formData.branchName} 
          onChange={handleChange} 
          error={errors.branchName}
        />
        <button type="submit" className="col-span-2 mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Send Request
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account? {' '}
        <button onClick={handleSignInClick} className="text-pink-500 hover:text-pink-600 font-semibold">
          Login
        </button>
      </p>
    </div>
  );
};

export default VendorSignup;