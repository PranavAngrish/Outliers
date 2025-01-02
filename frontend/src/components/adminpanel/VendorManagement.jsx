import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaFileAlt } from 'react-icons/fa';
import { getAllVendors, getAllPendingVendors } from '../../API/index.js';
import { handlingApprove } from '../../API/index.js';

const VendorManagement = ({ setSelectedVendor }) => {
  const [vendors, setVendors] = useState([]);
  const [pendingVendors, setPendingVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptedError, setAcceptedError] = useState('');
  const [pendingError, setPendingError] = useState('');

  useEffect(() => {
    const fetchAcceptedVendors = async () => {
      setLoading(true);
      setAcceptedError('');
      try {
        const vendorList = await getAllVendors();
        if (vendorList.status === 200) {
          console.log("Accepted vendors fetched successfully:", vendorList.data.body);
          setVendors(vendorList.data.body || []); // Update state with fetched data
        } else {
          setAcceptedError('Failed to fetch accepted vendors.');
        }
      } catch (err) {
        setAcceptedError(err?.response?.data?.message || 'An error occurred while fetching accepted vendors.');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchPendingVendors = async () => {
      setLoading(true);
      setPendingError('');
      try {
        const vendorList = await getAllPendingVendors();
        if (vendorList.status === 200) {
          console.log("Pending vendors fetched successfully:", vendorList.data);
          setPendingVendors(vendorList.data || []); // Update state with fetched data
        } else {
          setPendingError('Failed to fetch pending vendors.');
        }
      } catch (err) {
        setPendingError(err?.response?.data?.message || 'An error occurred while fetching pending vendors.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAcceptedVendors();
    fetchPendingVendors();
  }, []);

  useEffect(()=>{
    console.log("veee",vendors);
  },[vendors]);

  const handleSearch = (e, isPending = false) => {
    const term = e.target.value;
    isPending ? setPendingSearchTerm(term) : setSearchTerm(term);
  };

  const filteredVendors = (isPending = false) => {
    const term = isPending ? pendingSearchTerm?.toLowerCase() : searchTerm?.toLowerCase();
    const vendorList = isPending ? pendingVendors : vendors;
    return vendorList.filter(
      (vendor) =>
        vendor?.username?.toLowerCase().includes(term) || vendor?.email.toLowerCase()?.includes(term)
    );
  };

  const handleApprove = async (id) => {
    console.log("func id",id)
    const approvedVendor = pendingVendors.find((vendor) => vendor._id === id);
    if (approvedVendor) {
      try{
        const response = await handlingApprove(id);
        setPendingVendors(pendingVendors.filter((vendor) => vendor.id !== id));
        setVendors([...vendors, { ...approvedVendor, experienceCount: 0 }]);

      }catch(error){
        console.log(error)
        alert(error.response?.data?.message || error.response?.data?.error);
      }
    }
  };

  const handleReject = (id) => {
    setPendingVendors(pendingVendors.filter((vendor) => vendor.id !== id));
  };

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleShowApplication = (id) => {
    console.log(`Showing application for vendor with id ${id}`);
    // Implement the application viewing logic here
  };

  const VendorTable = ({ vendors, isPending }) => (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          {!isPending && (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Experiences
            </th>
          )}
          {isPending && (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Application
            </th>
          )}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {vendors.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              No vendors found
            </td>
          </tr>
        ) : (
          vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{vendor.email}</td>
              {!isPending && <td className="px-6 py-4 whitespace-nowrap">{vendor.experienceCount}</td>}
              {isPending && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleShowApplication(vendor._id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaFileAlt className="inline mr-1" /> Show Application
                  </button>
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {isPending ? (
                  <>
                    <button
                      onClick={() => handleApprove(vendor._id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      <FaCheck className="inline mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(vendor._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTimes className="inline mr-1" /> Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleViewDetails(vendor)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEye className="inline mr-1" /> View Details
                  </button>
                )}
              </td>
            </tr>
          ))
        )}
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
      {loading ? (
        <p>Loading vendors...</p>
      ) : acceptedError ? (
        <p className="text-red-500">{acceptedError}</p>
      ) : (
        <VendorTable vendors={filteredVendors()} isPending={false} />
      )}

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
