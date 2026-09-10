import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const [clientServicesOpen, setClientServicesOpen] = useState(false);

  return (
    <div className="sidebar">
      <h2>HMS Sidebar</h2>
      <ul>
        <li>
          <Link to="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
        </li>
        <li><Link to="/appointments" style={{color: 'white'}}>Appointments</Link></li>
        <li>
          <Link to="/patients" style={{ color: "white" }}>
            Patients
          </Link>
        </li>
        <li>
          <Link to="/doctors" style={{ color: "white" }}>
            Doctors
          </Link>
        </li>
        <li className="pb-2">
          {/* Clinical Services */}
          <div
            onClick={() => setClientServicesOpen(!clientServicesOpen)}
            className="flex items-center justify-between cursor-pointer py-2 text-white px-2 rounded-md"
          >
            <span>Clinical Services</span>

            <span className="text-xs">{clientServicesOpen ? "▲" : "▼"}</span>
          </div>

          {/* Sub Menu */}
          {clientServicesOpen && (
            <ul className="ml-4 mt-1 pl-3 space-y-1">
                <li>
                <Link
                  to="/laboratory-radiology"
                  className="block py-2 text-sm text-white hover:text-gray-300"
                >
                  Laboratory & Radiology
                </Link>
              </li>
              <li>
                <Link
                  to="/blood-and-donor"
                  className="block py-2 text-sm text-white hover:text-gray-300 "
                >
                  Blood Bank & Donor List
                </Link>
              </li>

              <li>
                <Link
                  to="/ambulance-management"
                  className="block py-2 text-sm text-white hover:text-gray-300 "
                >
                  Ambulance Management
                </Link>
              </li>

            
            </ul>
          )}
        </li>
        <li>
          <Link to="/billing" style={{ color: "white" }}>
            Billing
          </Link>
        </li>
        <li>
          <Link to="/inventory" style={{ color: "white" }}>
            Inventory
          </Link>
        </li>
        <li>
          <Link to="/staff" style={{ color: "white" }}>
            Staff
          </Link>
        </li>
        <li>
          <Link to="/settings" style={{ color: "white" }}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
