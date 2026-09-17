import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';
import Appointments from '../pages/Appointments/Appointments';
import Patients from '../pages/Patients/Patients';
import AddPatient from '../pages/Patients/AddPatient';
import PatientDetails from '../pages/Patients/PatientDetails';
import Doctors from '../pages/Doctors/Doctors';
import AddDoctor from '../pages/Doctors/AddDoctor';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import LaboratoryAndRadiology from '../pages/ClinicalServices/LaboratoryAndRadiology';
import { ClinicalReports } from '../pages/ClinicalServices/ClinicalReports';
import { AmbulanceManagement } from '../pages/ClinicalServices/AmbulanceMangement';
import Billing from '../pages/Billing/Billing';
import Inventory from '../pages/StockInvetory/Inventory';
import AddInventory from '../pages/StockInvetory/AddInventory';
import Nurse from '../pages/Nurse/Nurse';
import AddStaff from '../pages/Nurse/AddStaff';
import StaffDetails from '../pages/Nurse/StaffDetails';
import Settings from '../pages/Settings/Settings';
import SecuritySettings from '../pages/Settings/SecuritySettings';
import { Departments } from '../pages/Administration/Departments';
import { RoomManagement } from '../pages/Administration/RoomManagement';
import { StaffManagement } from '../pages/Administration/StaffManagement';
import AccessManagement from '../pages/Settings/AccessManagement';
import NotFound from '../components/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        
        <Route path="/administration/departments" element={<Departments />} />
        <Route path="/administration/roomManagement" element={<RoomManagement />} />
        <Route path="/administration/staffManagement" element={<StaffManagement />} />

        <Route path="/doctor-nurse/doctor" element={<Doctors />} />
        <Route path="/doctor-nurse/doctor/add" element={<AddDoctor />} />
        <Route path="/doctor-nurse/doctor/:id/edit" element={<AddDoctor />} />
        <Route path="/doctor-nurse/doctor/:id/medicine-allocation" element={<DoctorDetails allocation />} />
        <Route path="/doctor-nurse/doctor/:id" element={<DoctorDetails />} />
        <Route path="/doctors/*" element={<LegacyDoctorRedirect />} />
        
        <Route path="/clinical-services/ambulance-management" element={<AmbulanceManagement />} />
        <Route path="/clinical-services/clinical-reports" element={<ClinicalReports />} />
        <Route path="/clinical-services/laboratory-radiology" element={<LaboratoryAndRadiology />} />
        
        <Route path="/billing" element={<Billing />} />
        
        <Route path="/stock-inventory" element={<Inventory />} />
        <Route path="/stock-inventory/add" element={<AddInventory />} />
        
        <Route path="/doctor-nurse/nurse" element={<Nurse />} />
        <Route path="/doctor-nurse/nurse/add" element={<AddStaff />} />
        <Route path="/doctor-nurse/nurse/:id" element={<StaffDetails />} />
        
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
        <Route path="/settings/access-management" element={<AccessManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

// Keep previously shared Doctor links working after the sidebar route change.
function LegacyDoctorRedirect() {
  const { pathname, search, hash, state } = useLocation();
  return <Navigate to={{ pathname: pathname.replace(/^\/doctors(?=\/|$)/, '/doctor-nurse/doctor'), search, hash }} state={state} replace />;
}
