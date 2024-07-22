import React, { useState } from 'react';

const RefundManagement = () => {
  const [refunds, setRefunds] = useState([
    { id: 1, user: 'User 1', amount: 100, status: 'Pending' },
    { id: 2, user: 'User 2', amount: 200, status: 'Processed' },
  ]);

  const processRefund = (id) => {
    setRefunds(refunds.map(refund => 
      refund.id === id ? { ...refund, status: 'Processed' } : refund
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Refund Management</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((refund) => (
            <tr key={refund.id} className="border-t">
              <td className="p-3">{refund.id}</td>
              <td className="p-3">{refund.user}</td>
              <td className="p-3">${refund.amount}</td>
              <td className="p-3">{refund.status}</td>
              <td className="p-3">
                {refund.status === 'Pending' && (
                  <button 
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                    onClick={() => processRefund(refund.id)}
                  >
                    Process Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundManagement;