import React, { useState } from 'react';
import { APPOINTMENTS_DATA } from '../../constants/mockAppointments';
import { Icon } from '@iconify/react';
import Dropdown from '../../components/Dropdown/Dropdown';
import DateInput from '../../components/DateInput/DateInput';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeTimeframe, setActiveTimeframe] = useState('Today');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const [appointments, setAppointments] = useState(APPOINTMENTS_DATA);

  const [addForm, setAddForm] = useState({ patientName: '', patientId: '', department: '', doctor: '', status: '', appointmentType: '', date: '', phone: '' });
  const [editForm, setEditForm] = useState({ patientName: '', patientId: '', department: '', doctor: '', status: '', appointmentType: '', date: '', phone: '' });
  const [filterForm, setFilterForm] = useState({ patientName: '', patientId: '', department: '', doctor: '', status: '', date: '' });
  
  const stats = [
    { label: "Today's Total", count: 150, color: 'bg-green-900 text-green-300' },
    { label: "Visited", count: 47, color: 'bg-blue-900 text-blue-300' },
    { label: "Waiting", count: 12, color: 'bg-red-900 text-red-300' },
    { label: "Cancelled", count: 2, color: 'bg-gray-800 text-gray-300' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-text-highlight';
      case 'Cancelled': return 'text-gray-400';
      case 'Normal': return 'text-blue-500';
      case 'Severe': return 'text-red-500';
      case 'Critical': return 'text-orange-500';
      default: return 'text-white';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchTime = apt.timeframe === activeTimeframe;
    const matchStatus = activeTab === 'All' ? true : apt.status === activeTab;
    return matchTime && matchStatus;
  });

  const openEditModal = (apt) => {
    setEditForm({
      patientName: apt.name || '',
      patientId: apt.patientId || '',
      department: apt.department || '',
      doctor: apt.doctor || '',
      status: apt.status || '',
      appointmentType: apt.type || '',
      date: apt.date || '',
      phone: apt.phone || ''
    });
    setIsEditModalOpen(true);
  };

  const isAddFormValid = 
    addForm.patientName.trim() !== '' &&
    addForm.patientId.trim() !== '' &&
    addForm.department !== '' &&
    addForm.date.trim() !== '' &&
    addForm.doctor !== '' &&
    addForm.status !== '' &&
    addForm.phone.trim() !== '' &&
    addForm.appointmentType !== '';

  const handleAddAppointment = () => {
    if (!isAddFormValid) return;

    const newAppointment = {
      id: Date.now(), 
      name: addForm.patientName,
      patientId: addForm.patientId,
      department: addForm.department,
      doctor: addForm.doctor,
      room: "TBD",
      type: addForm.appointmentType,
      status: addForm.status,
      timeframe: "Today", 
      date: addForm.date,
      phone: addForm.phone
    };

    setAppointments([newAppointment, ...appointments]);
    setIsAddModalOpen(false);
    setAddForm({ patientName: '', patientId: '', department: '', doctor: '', status: '', appointmentType: '', date: '', phone: '' });
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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-gradient flex items-center gap-2"
        >
          <span>+</span> Add Appointments
        </button>
      </div>

      {/* Controls row */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {['Today', 'Upcoming', 'Past'].map(time => (
            <button 
              key={time}
              onClick={() => setActiveTimeframe(time)}
              className={"px-6 py-2 rounded-md font-medium " + (activeTimeframe === time ? 'bg-btn-solid text-white' : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800')}
            >
              {time}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon icon="lucide:search" className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search patient name or ID" 
              className="bg-transparent border border-gray-700 rounded-md pl-10 pr-10 py-2 w-72 focus:outline-none focus:border-text-accent"
            />
          </div>
          <button onClick={() => setIsFilterModalOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-700 bg-transparent hover:bg-gray-800 transition">
            <Icon icon="lucide:sliders-horizontal" className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between border-b border-gray-800 mb-4 px-4">
        {['All', 'Normal', 'Severe', 'Critical', 'Completed', 'Cancelled'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={"pb-3 px-4 text-sm font-medium transition-colors " + (activeTab === tab ? 'text-text-highlight border-b-2 border-text-highlight' : 'text-gray-400 hover:text-gray-200')}
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
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((apt) => (
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
                    <button onClick={() => openEditModal(apt)} className="text-blue-500 hover:text-blue-400">
                      <Icon icon="lucide:pencil" className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-400">
                      <Icon icon="lucide:trash-2" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500">No appointments found for this filter combination.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
        <div>
          Page <span className="text-white font-medium">1</span> of 5 (1 to {filteredAppointments.length} from {appointments.length} Patients)
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

      {/* Add Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111] border border-text-accent rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white">Add Appointment</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full bg-btn-solid text-text-highlight hover:opacity-80 transition">
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient Name</label>
                <input type="text" placeholder="enter patient name" value={addForm.patientName} onChange={(e) => setAddForm({...addForm, patientName: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient ID</label>
                <input type="text" placeholder="enter patient ID" value={addForm.patientId} onChange={(e) => setAddForm({...addForm, patientId: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent" />
              </div>
              
              <Dropdown 
                label="Department"
                placeholder="select department"
                options={["Orthopedics", "Cardiology", "Neurology", "Pediatrics"]}
                value={addForm.department}
                onChange={(val) => setAddForm({...addForm, department: val})}
              />
              
              <DateInput label="Appointment date" value={addForm.date} onChange={(val) => setAddForm({...addForm, date: val})} />
              
              <Dropdown 
                label="Doctor"
                placeholder="select doctor"
                options={["Dr. Sravan", "Dr. Rajesh", "Dr. Meena", "Dr. Kiran"]}
                value={addForm.doctor}
                onChange={(val) => setAddForm({...addForm, doctor: val})}
              />
              
              <Dropdown 
                label="Status"
                placeholder="select status"
                options={["Normal", "Severe", "Critical", "Completed", "Cancelled"]}
                value={addForm.status}
                onChange={(val) => setAddForm({...addForm, status: val})}
              />
              
              <div className="relative">
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <input type="text" placeholder="enter phone number" value={addForm.phone} onChange={(e) => setAddForm({...addForm, phone: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent pr-10" />
              </div>
              
              <Dropdown 
                label="Appointment Type"
                placeholder="select appointment type"
                options={["Consultation", "Check-up", "Follow-up"]}
                value={addForm.appointmentType}
                onChange={(val) => setAddForm({...addForm, appointmentType: val})}
              />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsAddModalOpen(false)} className="px-8 py-2.5 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition">Cancel</button>
              <button 
                onClick={handleAddAppointment}
                disabled={!isAddFormValid}
                className={"px-8 py-2.5 rounded-md text-white font-medium transition " + (isAddFormValid ? 'bg-btn-solid hover:opacity-90' : 'bg-gray-700 cursor-not-allowed opacity-50')}
              >
                Add Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111] border border-text-accent rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white">Edit Appointment</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full bg-btn-solid text-text-highlight hover:opacity-80 transition">
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient Name</label>
                <input type="text" placeholder="enter patient name" value={editForm.patientName} onChange={(e) => setEditForm({...editForm, patientName: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient ID</label>
                <input type="text" placeholder="enter patient ID" value={editForm.patientId} onChange={(e) => setEditForm({...editForm, patientId: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent" />
              </div>
              <Dropdown 
                label="Department"
                placeholder="select department"
                options={["Orthopedics", "Cardiology", "Neurology", "Pediatrics"]}
                value={editForm.department}
                onChange={(val) => setEditForm({...editForm, department: val})}
              />
              <DateInput label="Appointment date" value={editForm.date} onChange={(val) => setEditForm({...editForm, date: val})} />
              <Dropdown 
                label="Doctor"
                placeholder="select doctor"
                options={["Dr. Sravan", "Dr. Rajesh", "Dr. Meena", "Dr. Kiran"]}
                value={editForm.doctor}
                onChange={(val) => setEditForm({...editForm, doctor: val})}
              />
              <Dropdown 
                label="Status"
                placeholder="select status"
                options={["Normal", "Severe", "Critical", "Completed", "Cancelled"]}
                value={editForm.status}
                onChange={(val) => setEditForm({...editForm, status: val})}
              />
              <div className="relative">
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <input type="text" placeholder="enter phone number" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent pr-10" />
              </div>
              <Dropdown 
                label="Appointment Type"
                placeholder="select appointment type"
                options={["Consultation", "Check-up", "Follow-up"]}
                value={editForm.appointmentType}
                onChange={(val) => setEditForm({...editForm, appointmentType: val})}
              />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-2.5 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition">Cancel</button>
              <button className="px-8 py-2.5 rounded-md bg-btn-solid text-white font-medium hover:opacity-90 transition">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Appointment Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111] border border-text-accent rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white">Filter Appointment</h2>
              <button onClick={() => setIsFilterModalOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full bg-btn-solid text-text-highlight hover:opacity-80 transition">
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient Name</label>
                <input type="text" placeholder="enter patient name" value={filterForm.patientName} onChange={(e) => setFilterForm({...filterForm, patientName: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Patient ID</label>
                <input type="text" placeholder="enter patient ID" value={filterForm.patientId} onChange={(e) => setFilterForm({...filterForm, patientId: e.target.value})} className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-text-accent" />
              </div>
              <Dropdown 
                label="Department"
                placeholder="select department"
                options={["Orthopedics", "Cardiology", "Neurology", "Pediatrics"]}
                value={filterForm.department}
                onChange={(val) => setFilterForm({...filterForm, department: val})}
              />
              <Dropdown 
                label="Status"
                placeholder="select status"
                options={["Normal", "Severe", "Critical", "Completed", "Cancelled"]}
                value={filterForm.status}
                onChange={(val) => setFilterForm({...filterForm, status: val})}
              />
              <Dropdown 
                label="Doctor"
                placeholder="select doctor"
                options={["Dr. Sravan", "Dr. Rajesh", "Dr. Meena", "Dr. Kiran"]}
                value={filterForm.doctor}
                onChange={(val) => setFilterForm({...filterForm, doctor: val})}
              />
              <DateInput label="Date" value={filterForm.date} onChange={(val) => setFilterForm({...filterForm, date: val})} />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsFilterModalOpen(false)} className="px-8 py-2.5 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition">Cancel</button>
              <button className="px-8 py-2.5 rounded-md bg-btn-solid text-white font-medium hover:opacity-90 transition">Apply Filter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;

