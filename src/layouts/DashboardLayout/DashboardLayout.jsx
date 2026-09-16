import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import {
  DEFAULT_SIDEBAR_ITEMS,
  DEFAULT_PROFILE,
} from "./Sidebar/sidebarData";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0A]">
      {/* SIDEBAR */}
      <Sidebar
        items={DEFAULT_SIDEBAR_ITEMS}
        profile={DEFAULT_PROFILE}
        brand={{ name: "Stacklycare", shortName: "HMS" }}
        onLogout={handleLogout}
      />

      {/* MAIN CONTENT */}
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        {/* HEADER */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* ONLY THIS AREA SCROLLS */}
        <main className="page-content min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;