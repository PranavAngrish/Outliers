import React, { useState } from 'react';
import { FaEye, FaLink, FaEdit, FaTrash, FaCheck, FaTimes, FaPlus, FaPauseCircle } from 'react-icons/fa';
import CreateExperience from './createExperience/CreateExperience';

const ExperienceManagement = ({ setActiveMenu, setSelectedVendor }) => {
  const [experiences, setExperiences] = useState([
    { id: 1, name: 'Floating Feni Experience', status: 'Live', bookings: 618, vendor: { id: 1, name: 'Goa Adventures' } },
    { id: 2, name: 'Slaves and Sultans of Qutub with Shah Umar', status: 'Live', bookings: 28, vendor: { id: 2, name: 'Delhi Heritage Walks' } },
    { id: 3, name: 'One Heart, Two Worlds: A Walk of Jew Town', status: 'Live', bookings: 13, vendor: { id: 3, name: 'Kerala Explorations' } },
    { id: 4, name: 'A Day Trip to Kracadawna Farm', status: 'Live', bookings: 0, vendor: { id: 4, name: 'Farm Stays India' } },
    { id: 7, name: "Exploring Sultan Ghari - Delhi's First Mausoleum", status: 'Live', bookings: 21, vendor: { id: 2, name: 'Delhi Heritage Walks' } },
  ]);

  const [pendingExperiences, setPendingExperiences] = useState([
    { id: 5, name: 'Of Rains, Rivers and Root Bridges, Meghalaya', status: 'Pending', vendor: { id: 5, name: 'Northeast Trekkers' } },
    { id: 6, name: 'Of Valleys and Warriors, an Angami Chapter, Nagaland', status: 'Pending', vendor: { id: 5, name: 'Northeast Trekkers' } },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [isCreatingExperience, setIsCreatingExperience] = useState(false);

  const handleSearch = (e, isPending = false) => {
    isPending ? setPendingSearchTerm(e.target.value) : setSearchTerm(e.target.value);
  };

  const filteredExperiences = (isPending = false) => {
    const term = isPending ? pendingSearchTerm : searchTerm;
    const experienceList = isPending ? pendingExperiences : experiences;
    return experienceList.filter(exp => 
      exp.name.toLowerCase().includes(term.toLowerCase()) ||
      exp.vendor.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleAction = (action, id, isPending = false) => {
    if (isPending) {
      if (action === 'approve') {
        const approvedExperience = pendingExperiences.find(exp => exp.id === id);
        setPendingExperiences(pendingExperiences.filter(exp => exp.id !== id));
        setExperiences([...experiences, { ...approvedExperience, status: 'Live', bookings: 0 }]);
      } else if (action === 'reject') {
        setPendingExperiences(pendingExperiences.filter(exp => exp.id !== id));
      }
    } else {
      console.log(`Performing ${action} on experience with id ${id}`);
    }
  };

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    setActiveMenu('Vendors');
  };

  const handleCreateExperience = (newExperience) => {
    setPendingExperiences(prevExperiences => [
      ...prevExperiences,
      { ...newExperience, id: Date.now(), status: 'Pending', vendor: { id: Date.now(), name: 'New Vendor' } }
    ]);
    setIsCreatingExperience(false);
  };

  const ExperienceTable = ({ experiences, isPending }) => (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiences</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          {!isPending && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {experiences.map((exp) => (
          <tr key={exp.id}>
            <td className="px-6 py-4 whitespace-nowrap">{exp.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span 
                className="text-blue-600 hover:text-blue-900 cursor-pointer"
                onClick={() => handleVendorClick(exp.vendor)}
              >
                {exp.vendor.name}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <FaEye className="inline mr-2 cursor-pointer text-gray-600 hover:text-gray-900 text-xl" />
              <FaLink className="inline cursor-pointer text-gray-600 hover:text-gray-900 text-xl" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                exp.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {exp.status}
              </span>
            </td>
            {!isPending && (
              <td className="px-6 py-4 whitespace-nowrap">
                {exp.bookings > 0 ? (
                  <span className="text-blue-600 hover:text-blue-900 cursor-pointer">{exp.bookings} bookings</span>
                ) : (
                  'No bookings'
                )}
              </td>
            )}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {isPending ? (
                <>
                  <button onClick={() => handleAction('approve', exp.id, true)} className="text-green-600 hover:text-green-900 mr-2">
                    <FaCheck className="inline mr-1 text-lg" /> Approve
                  </button>
                  <button onClick={() => handleAction('reject', exp.id, true)} className="text-red-600 hover:text-red-900">
                    <FaTimes className="inline mr-1 text-lg" /> Reject
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAction('edit', exp.id)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <FaEdit className="inline mr-1 text-lg" /> Edit
                  </button>
                  <button onClick={() => handleAction('delete', exp.id)} className="text-red-600 hover:text-red-900">
                    <FaPauseCircle className="inline mr-1 text-lg" /> Hold
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Experiences</h2>
        {!isCreatingExperience && (
          <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center"
            onClick={() => setIsCreatingExperience(true)}
          >
            <FaPlus className="mr-2" /> Create new experience
          </button>
        )}
      </div>
      
      {isCreatingExperience ? (
        <CreateExperience 
          setPendingExperiences={handleCreateExperience}
          setIsCreatingExperience={setIsCreatingExperience}
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search for experiences or vendors"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
          />
          <ExperienceTable experiences={filteredExperiences()} isPending={false} />

          <h3 className="text-2xl font-semibold text-gray-800 mt-8">Pending Approval</h3>
          <input
            type="text"
            placeholder="Search pending experiences"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={pendingSearchTerm}
            onChange={(e) => handleSearch(e, true)}
          />
          <ExperienceTable experiences={filteredExperiences(true)} isPending={true} />
        </>
      )}
    </div>
  );
};

export default ExperienceManagement;