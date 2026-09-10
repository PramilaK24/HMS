import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
// import Breadcrumb from './Breadcrumb/Breadcrumb';
import { DEFAULT_SIDEBAR_ITEMS, DEFAULT_PROFILE } from './Sidebar/sidebarData';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        items={DEFAULT_SIDEBAR_ITEMS}
        profile={DEFAULT_PROFILE}
        brand={{ name: 'Stacklycare', shortName: 'HMS' }}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <Header />
        {/* <Breadcrumb /> */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
