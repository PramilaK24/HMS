import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Header = () => {
  const location = useLocation();
  
  // Extract and format the path name
  const pathParts = location.pathname.split('/').filter(Boolean);
  let title = 'Dashboard'; // default
  
  if (pathParts.length > 0) {
    // Take the first part of the path and capitalize it
    title = pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1).replace('-', ' ');
  }

  return (
    <div className="h-16 bg-[#0E0E0E] border-b border-gray-900 flex items-center justify-between px-6">
      
      {/* Left side: Dynamic Title */}
      <h2 className="text-text-highlight text-lg font-medium">
        {title}
      </h2>

      {/* Right side: Search and Actions */}
      <div className="flex items-center gap-4">
        
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-accent">
            <Icon icon="lucide:search" className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Search patient name or ID" 
            className="bg-transparent border border-text-accent rounded-md pl-10 pr-4 py-2 w-72 text-sm text-gray-300 placeholder-text-accent focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Moon Icon */}
          <button className="w-10 h-10 flex items-center justify-center rounded-md bg-btn-solid text-white hover:opacity-90 transition">
            <Icon icon="lucide:moon" className="w-5 h-5" />
          </button>
          
          {/* Settings Icon */}
          <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-800 bg-[#111] text-text-highlight hover:bg-gray-900 transition">
            <Icon icon="lucide:settings" className="w-5 h-5" />
          </button>
          
          {/* Notification Icon */}
          <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-800 bg-[#111] text-text-highlight relative hover:bg-gray-900 transition">
            {/* Notification Dot */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-text-highlight rounded-full"></span>
            <Icon icon="lucide:bell" className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Header;

