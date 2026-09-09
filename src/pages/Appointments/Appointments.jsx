import React, { useState } from 'react';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const stats = [
    { label: "Today's Total", count: 150, color: 'bg-green-900 text-green-300' },
    { label: "Visited", count: 47, color: 'bg-blue-900 text-blue-300' },
    { label: "Waiting", count: 12, color: 'bg-red-900 text-red-300' },
    { label: "Cancelled", count: 2, color: 'bg-gray-800 text-gray-300' }
  ];

  const appointmentsData = [
    { id: 1, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "RM 305", type: "Follow-up", status: "Completed" },
    { id: 2, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "N/A", type: "Check-up", status: "Cancelled" },
    { id: 3, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "OP", type: "Consultation", status: "Normal" },
    { id: 4, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "OP", type: "Consultation", status: "Severe" },
    { id: 5, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "N/A", type: "Check-up", status: "Completed" },
    { id: 6, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "N/A", type: "Check-up", status: "Completed" },
    { id: 7, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "RM 405", type: "Follow-up", status: "Severe" },
    { id: 8, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "RM 309", type: "Follow-up", status: "Severe" },
    { id: 9, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr.Sravan", room: "N/A", type: "Check-up", status: "Normal" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-text-highlight';
      case 'Cancelled': return 'text-gray-400';
      case 'Normal': return 'text-blue-500';
      case 'Severe': return 'text-red-500';
      default: return 'text-white';
    }
  };

  return (
    <div className="text-white w-full">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-3">Appointment List</h1>
          <div className="flex gap-6 text-sm text-gray-300">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{stat.label}</span>
                <span className={"px-2 py-0.5 rounded-full text-xs " + stat.color}>
                  {stat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-gradient flex items-center gap-2">
          <span>+</span> Add Appointments
        </button>
      </div>

      {/* Controls row */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="bg-btn-solid text-white px-6 py-2 rounded-md font-medium">Today</button>
          <button className="bg-[#1a1a1a] text-gray-300 px-6 py-2 rounded-md font-medium hover:bg-gray-800">Upcoming</button>
          <button className="bg-[#1a1a1a] text-gray-300 px-6 py-2 rounded-md font-medium hover:bg-gray-800">Past</button>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search patient name or ID" 
            className="bg-transparent border border-gray-700 rounded-md pl-10 pr-10 py-2 w-72 focus:outline-none focus:border-text-accent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between border-b border-gray-800 mb-4 px-4">
        {['All', 'Normal', 'Severe', 'Critical', 'Completed', 'Cancelled'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={"pb-3 px-4 text-sm font-medium " + (activeTab === tab ? 'text-text-highlight border-b-2 border-text-highlight' : 'text-gray-400 hover:text-gray-200')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#111] rounded-lg overflow-hidden border border-gray-900">
        <table className="w-full text-left text-sm">
          <thead className="text-text-accent border-b border-gray-800">
            <tr>
              <th className="p-4 w-12"><input type="checkbox" className="accent-text-accent" /></th>
              <th className="p-4 font-normal">Patient Name</th>
              <th className="p-4 font-normal">Patient ID</th>
              <th className="p-4 font-normal">Department</th>
              <th className="p-4 font-normal">Doctor</th>
              <th className="p-4 font-normal">Room no</th>
              <th className="p-4 font-normal">Appointment type</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900">
            {appointmentsData.map((apt) => (
              <tr key={apt.id} className="hover:bg-[#1a1a1a] transition-colors">
                <td className="p-4"><input type="checkbox" className="accent-text-accent" /></td>
                <td className="p-4">{apt.name}</td>
                <td className="p-4">{apt.patientId}</td>
                <td className="p-4">{apt.department}</td>
                <td className="p-4">{apt.doctor}</td>
                <td className="p-4">{apt.room}</td>
                <td className="p-4">{apt.type}</td>
                <td className={"p-4 " + getStatusColor(apt.status)}>{apt.status}</td>
                <td className="p-4 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
        <div>
          Page <span className="text-white font-medium">1</span> of 5 (1 to 14 from 150 Patients)
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-gray-800">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-text-highlight text-black hover:bg-green-400">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
