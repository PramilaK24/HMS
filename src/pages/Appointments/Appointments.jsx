import React, { useState, useEffect } from 'react';
import { 
  APPOINTMENTS_DATA, 
  APPOINTMENT_STATS, 
  DROPDOWN_OPTIONS, 
  TABS, 
  TABLE_HEADERS 
} from '../../constants/mockAppointments';
import { Icon } from '@iconify/react';
import Dropdown from '../../components/Dropdown/Dropdown';
import DateInput from '../../components/DateInput/DateInput';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Pagination from '../../components/Pagination/Pagination';

const gradientButtonStyle = "flex items-center justify-center gap-2 rounded-[12px] border-b border-[#0EFF7B] bg-gradient-to-r from-[#025126] via-[#0D7F41] to-[#025126] px-6 py-[10px] text-[15px] font-semibold text-white shadow-[0_2px_12px_0_rgba(0,0,0,0.25)] transition hover:opacity-90";
const disabledGradientButtonStyle = "flex items-center justify-center gap-2 rounded-[12px] border-b border-[#0EFF7B]/50 bg-gradient-to-r from-[#025126]/50 via-[#0D7F41]/50 to-[#025126]/50 px-6 py-[10px] text-[15px] font-semibold text-white/50 shadow-[0_2px_12px_0_rgba(0,0,0,0.1)] cursor-not-allowed";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [activeTimeframe, setActiveTimeframe] = useState('Today');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [appointments, setAppointments] = useState(APPOINTMENTS_DATA);

  const [addForm, setAddForm] = useState({ patientName: '', patientId: '', department: '', doctor: '', status: '', appointmentType: '', date: '', phone: '' });
  const [editForm, setEditForm] = useState({ patientName: '', patientId: '', department: '', doctor: '', status: '', appointmentType: '', date: '', phone: '' });
  
  // Filter States
  const [filterForm, setFilterForm] = useState({ patientName: '', patientId: '', department: '', doctor: '', status: '', date: '' });
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset pagination when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
    // 1. Tab/Timeframe matching
    const matchTime = apt.timeframe === activeTimeframe;
    const matchStatus = activeTab === 'All' ? true : apt.status === activeTab;
    
    // 2. Applied Modal Filters matching
    let matchApplied = true;
    if (appliedFilters) {
      if (appliedFilters.patientName && !apt.name.toLowerCase().includes(appliedFilters.patientName.toLowerCase())) matchApplied = false;
      if (appliedFilters.patientId && !apt.patientId.toLowerCase().includes(appliedFilters.patientId.toLowerCase())) matchApplied = false;
      if (appliedFilters.department && apt.department !== appliedFilters.department) matchApplied = false;
      if (appliedFilters.doctor && apt.doctor !== appliedFilters.doctor) matchApplied = false;
      if (appliedFilters.status && apt.status !== appliedFilters.status) matchApplied = false;
      if (appliedFilters.date && apt.date !== appliedFilters.date) matchApplied = false;
    }

    // 3. Global Search matching
    let matchSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchSearch = apt.name.toLowerCase().includes(query) || apt.patientId.toLowerCase().includes(query);
    }

    return matchTime && matchStatus && matchApplied && matchSearch;
  });

  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openEditModal = (apt) => {
    setEditForm({
      id: apt.id,
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

  const handleEditAppointment = () => {
    setAppointments(appointments.map(apt => 
      apt.id === editForm.id ? {
        ...apt,
        name: editForm.patientName,
        patientId: editForm.patientId,
        department: editForm.department,
        doctor: editForm.doctor,
        status: editForm.status,
        type: editForm.appointmentType,
        date: editForm.date,
        phone: editForm.phone
      } : apt
    ));
    setIsEditModalOpen(false);
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

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      setAppointments(appointments.filter(apt => apt.id !== itemToDelete.id));
      setItemToDelete(null);
      // Fallback page adjustment if deleting the last item on a page
      if (paginatedAppointments.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleApplyFilter = () => {
    setAppliedFilters(filterForm);
    setIsFilterModalOpen(false);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    const emptyFilter = { patientName: '', patientId: '', department: '', doctor: '', status: '', date: '' };
    setFilterForm(emptyFilter);
    setAppliedFilters(null);
    setIsFilterModalOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="text-white w-full">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-3">Appointment List</h1>
          <div className="flex gap-6 text-sm text-gray-300">
            {APPOINTMENT_STATS.map((stat, index) => (
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
          className={gradientButtonStyle}
        >
          <span>+</span> Add Appointments
        </button>
      </div>

      {/* Controls row */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {TABS.timeframes.map(time => (
            <button 
              key={time}
              onClick={() => {
                setActiveTimeframe(time);
                setCurrentPage(1);
              }}
              className={activeTimeframe === time ? gradientButtonStyle : "flex items-center justify-center rounded-[12px] border border-transparent bg-[#1a1a1a] px-6 py-[10px] text-[15px] font-medium text-gray-300 hover:bg-gray-800 transition"}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-gray-700 rounded-md pl-10 pr-10 py-2 w-72 focus:outline-none focus:border-text-accent"
            />
          </div>
          <button 
            onClick={() => setIsFilterModalOpen(true)} 
            className={"w-11 h-11 flex items-center justify-center rounded-md border transition " + (appliedFilters ? 'border-text-accent bg-[#025126]/30 text-text-highlight' : 'border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300')}
          >
            <Icon icon="lucide:sliders-horizontal" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between border-b border-gray-800 mb-4 px-4">
        {TABS.statuses.map(tab => (
          <button 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
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
              {TABLE_HEADERS.map((header, idx) => (
                <th key={idx} className="p-4 font-normal">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900">
            {paginatedAppointments.length > 0 ? (
              paginatedAppointments.map((apt) => (
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
                    <button 
                      onClick={() => {
                        setItemToDelete(apt);
                        setIsDeleteModalOpen(true);
                      }} 
                      className="text-red-500 hover:text-red-400"
                    >
                      <Icon icon="lucide:trash-2" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        page={currentPage} 
        pageSize={pageSize} 
        totalItems={filteredAppointments.length} 
        onPageChange={(page) => setCurrentPage(page)} 
        itemLabel="Patients" 
      />

      {/* Add Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
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
                options={DROPDOWN_OPTIONS.departments}
                value={addForm.department}
                onChange={(val) => setAddForm({...addForm, department: val})}
              />
              
              <DateInput label="Appointment date" value={addForm.date} onChange={(val) => setAddForm({...addForm, date: val})} />
              
              <Dropdown 
                label="Doctor"
                placeholder="select doctor"
                options={DROPDOWN_OPTIONS.doctors}
                value={addForm.doctor}
                onChange={(val) => setAddForm({...addForm, doctor: val})}
              />
              
              <Dropdown 
                label="Status"
                placeholder="select status"
                options={DROPDOWN_OPTIONS.statuses}
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
                options={DROPDOWN_OPTIONS.appointmentTypes}
                value={addForm.appointmentType}
                onChange={(val) => setAddForm({...addForm, appointmentType: val})}
              />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsAddModalOpen(false)} className="px-8 py-[10px] rounded-[12px] border border-gray-600 text-gray-300 hover:bg-gray-800 transition font-medium">Cancel</button>
              <button 
                onClick={handleAddAppointment}
                disabled={!isAddFormValid}
                className={isAddFormValid ? gradientButtonStyle : disabledGradientButtonStyle}
              >
                Add Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
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
                options={DROPDOWN_OPTIONS.departments}
                value={editForm.department}
                onChange={(val) => setEditForm({...editForm, department: val})}
              />
              <DateInput label="Appointment date" value={editForm.date} onChange={(val) => setEditForm({...editForm, date: val})} />
              <Dropdown 
                label="Doctor"
                placeholder="select doctor"
                options={DROPDOWN_OPTIONS.doctors}
                value={editForm.doctor}
                onChange={(val) => setEditForm({...editForm, doctor: val})}
              />
              <Dropdown 
                label="Status"
                placeholder="select status"
                options={DROPDOWN_OPTIONS.statuses}
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
                options={DROPDOWN_OPTIONS.appointmentTypes}
                value={editForm.appointmentType}
                onChange={(val) => setEditForm({...editForm, appointmentType: val})}
              />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-[10px] rounded-[12px] border border-gray-600 text-gray-300 hover:bg-gray-800 transition font-medium">Cancel</button>
              <button onClick={handleEditAppointment} className={gradientButtonStyle}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Appointment Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
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
                options={DROPDOWN_OPTIONS.departments}
                value={filterForm.department}
                onChange={(val) => setFilterForm({...filterForm, department: val})}
              />
              <Dropdown 
                label="Status"
                placeholder="select status"
                options={DROPDOWN_OPTIONS.statuses}
                value={filterForm.status}
                onChange={(val) => setFilterForm({...filterForm, status: val})}
              />
              <Dropdown 
                label="Doctor"
                placeholder="select doctor"
                options={DROPDOWN_OPTIONS.doctors}
                value={filterForm.doctor}
                onChange={(val) => setFilterForm({...filterForm, doctor: val})}
              />
              <DateInput label="Date" value={filterForm.date} onChange={(val) => setFilterForm({...filterForm, date: val})} />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={handleClearFilter} className="px-8 py-[10px] rounded-[12px] border border-gray-600 text-gray-300 hover:bg-gray-800 transition font-medium">Clear Filters</button>
              <button onClick={handleApplyFilter} className={gradientButtonStyle}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}

      {/* Global Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
};

export default Appointments;
