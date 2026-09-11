import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { DEFAULT_SIDEBAR_ITEMS, DEFAULT_PROFILE } from './Sidebar/sidebarData';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#050d0a] text-white">
      <Sidebar
        items={DEFAULT_SIDEBAR_ITEMS}
        profile={DEFAULT_PROFILE}
        brand={{ name: 'Stacklycare', shortName: 'HMS' }}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 flex-col bg-[radial-gradient(circle_at_top,_#0b1b17_0%,_#071611_35%,_#050d0a_100%)]">
        <Header />
        <div className="flex-1 p-4 md:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
