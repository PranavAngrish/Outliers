// VendorManagement.js
import React, { useState } from 'react';
import { FaEye, FaCheck, FaTimes, FaFileAlt } from 'react-icons/fa';

const VendorManagement = ({ setSelectedVendor }) => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Goa Adventures', email: 'goa@adventures.com', experienceCount: 1 },
    { id: 2, name: 'Delhi Heritage Walks', email: 'delhi@heritagewalks.com', experienceCount: 2 },
    { id: 3, name: 'Kerala Explorations', email: 'kerala@explorations.com', experienceCount: 1 },
    { id: 4, name: 'Farm Stays India', email: 'farmstays@india.com', experienceCount: 1 },
    { id: 5, name: 'Northeast Trekkers', email: 'northeast@trekkers.com', experienceCount: 2 },
  ]);

  const [pendingVendors, setPendingVendors] = useState([
    { id: 6, name: 'Mountain Adventures', email: 'mountain@adventures.com' },
    { id: 7, name: 'City Tours', email: 'city@tours.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');

  const handleSearch = (e, isPending = false) => {
    isPending ? setPendingSearchTerm(e.target.value) : setSearchTerm(e.target.value);
  };

  const filteredVendors = (isPending = false) => {
    const term = isPending ? pendingSearchTerm : searchTerm;
    const vendorList = isPending ? pendingVendors : vendors;
    return vendorList.filter(vendor => 
      vendor.name.toLowerCase().includes(term.toLowerCase()) ||
      vendor.email.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleApprove = (id) => {
    const approvedVendor = pendingVendors.find(vendor => vendor.id === id);
    setPendingVendors(pendingVendors.filter(vendor => vendor.id !== id));
    setVendors([...vendors, { ...approvedVendor, experienceCount: 0 }]);
  };

  const handleReject = (id) => {
    setPendingVendors(pendingVendors.filter(vendor => vendor.id !== id));
  };

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleShowApplication = (id) => {
    console.log(`Showing application for vendor with id ${id}`);
    // Implement show application functionality
  };

  const VendorTable = ({ vendors, isPending }) => (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          {!isPending && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiences</th>}
          {isPending && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {vendors.map((vendor) => (
          <tr key={vendor.id}>
            <td className="px-6 py-4 whitespace-nowrap">{vendor.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{vendor.email}</td>
            {!isPending && <td className="px-6 py-4 whitespace-nowrap">{vendor.experienceCount}</td>}
            {isPending && (
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => handleShowApplication(vendor.id)} 
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaFileAlt className="inline mr-1" /> Show Application
                </button>
              </td>
            )}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {isPending ? (
                <>
                  <button onClick={() => handleApprove(vendor.id)} className="text-green-600 hover:text-green-900 mr-3">
                    <FaCheck className="inline mr-1" /> Approve
                  </button>
                  <button onClick={() => handleReject(vendor.id)} className="text-red-600 hover:text-red-900">
                    <FaTimes className="inline mr-1" /> Reject
                  </button>
                </>
              ) : (
                <button onClick={() => handleViewDetails(vendor)} className="text-blue-600 hover:text-blue-900">
                  <FaEye className="inline mr-1" /> View Details
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Vendor Management</h2>
      <input
        type="text"
        placeholder="Search vendors"
        className="w-full p-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => handleSearch(e)}
      />
      <VendorTable vendors={filteredVendors()} isPending={false} />

      <h3 className="text-2xl font-semibold text-gray-800 mt-8">Pending Approval</h3>
      <input
        type="text"
        placeholder="Search pending vendors"
        className="w-full p-2 border border-gray-300 rounded-md"
        value={pendingSearchTerm}
        onChange={(e) => handleSearch(e, true)}
      />
      <VendorTable vendors={filteredVendors(true)} isPending={true} />
    </div>
  );
};

export default VendorManagement;