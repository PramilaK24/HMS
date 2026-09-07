import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>HMS Sidebar</h2>
      <ul>
        <li><Link to="/dashboard" style={{color: 'white'}}>Dashboard</Link></li>
        <li><Link to="/patients" style={{color: 'white'}}>Patients</Link></li>
        <li><Link to="/doctors" style={{color: 'white'}}>Doctors</Link></li>
        <li><Link to="/clinical-services" style={{color: 'white'}}>Clinical Services</Link></li>
        <li><Link to="/billing" style={{color: 'white'}}>Billing</Link></li>
        <li><Link to="/inventory" style={{color: 'white'}}>Inventory</Link></li>
        <li><Link to="/staff" style={{color: 'white'}}>Staff</Link></li>
        <li><Link to="/settings" style={{color: 'white'}}>Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
