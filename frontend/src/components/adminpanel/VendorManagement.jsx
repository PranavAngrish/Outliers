import React, { useState } from 'react';

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor 1', email: 'vendor1@example.com' },
    { id: 2, name: 'Vendor 2', email: 'vendor2@example.com' },
  ]);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Vendor"
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-t">
              <td className="p-3">{vendor.id}</td>
              <td className="p-3">{vendor.name}</td>
              <td className="p-3">{vendor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorManagement;