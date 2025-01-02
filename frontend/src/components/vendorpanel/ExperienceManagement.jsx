import React, { useState,useEffect } from 'react';
import { FaEye, FaLink, FaEdit, FaTrash, FaPlus, FaPauseCircle } from 'react-icons/fa';
import CreateExperience from './createExperience/CreateExperience';
import { useSelector } from 'react-redux';
import api from '../../axios/axios.js';
import { useNavigate } from 'react-router-dom';
const ExperienceManagement = ({ setActiveMenu, setSelectedVendor }) => {
  const vendorId = useSelector(state=>state.vendor.currentVendor.vendor._id);
  const navigate = useNavigate();
  
  const [experiences, setExperiences] = useState([
    { id: 0, name: '', status: '' }
  ]);

  const [pendingExperiences, setPendingExperiences] = useState([
    { id: 0, name: '', status: '' },
    
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [isCreatingExperience, setIsCreatingExperience] = useState(false);

  useEffect(() =>{
    const funcAccept = async () => {
      
      console.log("We are in the useEffect to call all the experiences");
      const token = localStorage.getItem('authToken');
    try{
      console.log("Try func");
       const accepted = await api.get(`/vendors/${vendorId}/accepted-experiences`,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
       })
       const pending = await api.get(`/vendors/${vendorId}/pending-experiences`,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
       })
        const formattedAcceptedExperiences = accepted.data.map(experience => ({
          id: experience._id, // Adjust according to the API response field name
          name: experience.title, // Adjust according to the API response field name
          status: experience?.status || null, // Adjust according to the API response field name
           // Adjust according to the API response field name
      }));

      const formattedPendingExperiences = pending.data.map(experience => ({
        id: experience._id, // Adjust according to the API response field name
        name: experience.title, // Adjust according to the API response field name
        status: experience?.status || null, // Adjust according to the API response field name
         // Adjust according to the API response field name
    }));


        setExperiences(formattedAcceptedExperiences);
        setPendingExperiences(formattedPendingExperiences);
    }
    catch(error){
      console.error('Error getting experience details:', error.response?.data || error.message);
    }
    }
    funcAccept();
    
  },[])

  const handleSearch = (e, isPending = false) => {
    isPending ? setPendingSearchTerm(e.target.value) : setSearchTerm(e.target.value);
  };

  const filteredExperiences = (isPending = false) => {
    const term = isPending ? pendingSearchTerm : searchTerm;
    const experienceList = isPending ? pendingExperiences : experiences;
    return experienceList.filter(exp => 
      exp.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleAction = (action, id) => {
    console.log(`Performing ${action} on experience with id ${id}`);
  };

  const handleCreateExperience = (newExperience) => {
    setPendingExperiences(prevExperiences => [
      ...prevExperiences,
      { ...newExperience, id: Date.now(), status: 'Pending' }
    ]);
    setIsCreatingExperience(false);
  };

  const handleClickForLinks = (exp) => {
    navigate(`/experience/${exp.id}`);

  }

  const ExperienceTable = ({ experiences, isPending }) => (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiences</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          {/* {!isPending && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>} */}
          {!isPending && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {experiences.map((exp) => (
          <tr key={exp.id}>
            <td className="px-6 py-4 whitespace-nowrap">{exp.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <FaEye className="inline mr-2 cursor-pointer text-gray-600 hover:text-gray-900 text-xl"
               onClick={()=>handleClickForLinks(exp)} />
              <FaLink  onClick={()=>handleClickForLinks(exp)} className="inline cursor-pointer text-gray-600 hover:text-gray-900 text-xl"
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                exp.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {exp.status}
              </span>
            </td>
            {/* {!isPending && (
              <td className="px-6 py-4 whitespace-nowrap">
                {exp.bookings > 0 ? (
                  <span className="text-blue-600 hover:text-blue-900 cursor-pointer">{exp.bookings} bookings</span>
                ) : (
                  'No bookings'
                )}
              </td>
            )} */}
            {!isPending && (
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleAction('edit', exp.id)} className="text-blue-600 hover:text-blue-900 mr-2">
                  <FaEdit className="inline mr-1 text-lg" /> Edit
                </button>
                <button onClick={() => handleAction('delete', exp.id)} className="text-red-600 hover:text-red-900">
                  <FaPauseCircle className="inline mr-1 text-lg" /> Hold
                </button>
              </td>
            )}
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
            placeholder="Search for experiences"
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