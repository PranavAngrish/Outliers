import React, { useState } from 'react';

const RefundManagement = () => {
  const [refunds, setRefunds] = useState([
    { id: 1, user: 'User 1', amount: 100, status: 'Pending' },
    { id: 2, user: 'User 2', amount: 200, status: 'Processed' },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Refund Management</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {refunds.map((refund) => (
              <tr key={refund.id}>
                <td className="px-6 py-4 whitespace-nowrap">{refund.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{refund.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">${refund.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    refund.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {refund.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundManagement;