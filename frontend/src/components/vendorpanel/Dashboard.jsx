import React from 'react';

const Dashboard = () => {
  const notifications = [
    { id: 1, message: 'New bookings' },
    { id: 2, message: 'Experience ABC needs to be update -Admin' },
    { id: 3, message: '5 new user registrations' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Active Experiences" value="56" />
        <DashboardCard title="Pending Refunds" value="3" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Notifications</h3>
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-3 bg-gray-50 rounded-md text-gray-700">
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-4xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Dashboard;