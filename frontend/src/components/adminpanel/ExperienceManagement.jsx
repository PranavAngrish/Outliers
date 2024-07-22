import React, { useState } from 'react';

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState([
    { id: 1, name: 'Experience 1', status: 'Pending' },
    { id: 2, name: 'Experience 2', status: 'Approved' },
  ]);

  const handleAccept = (id) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, status: 'Approved' } : exp
    ));
  };

  const handleReject = (id) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, status: 'Rejected' } : exp
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Experience Management</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id} className="border-t">
              <td className="p-3">{exp.id}</td>
              <td className="p-3">{exp.name}</td>
              <td className="p-3">{exp.status}</td>
              <td className="p-3">
                <button 
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition-colors"
                  onClick={() => handleAccept(exp.id)}
                >
                  Accept
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleReject(exp.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExperienceManagement;