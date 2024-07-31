import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import VendorManagement from './VendorManagement';
import ExperienceManagement from './ExperienceManagement';
import UserManagement from './UserManagement';
import RefundManagement from './RefundManagement';

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Vendors':
        return <VendorManagement setSelectedVendor={setSelectedVendor} />;
      case 'Experiences':
        return <ExperienceManagement setActiveMenu={setActiveMenu} setSelectedVendor={setSelectedVendor} />;
      case 'Users':
        return <UserManagement />;
      case 'Refunds':
        return <RefundManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;