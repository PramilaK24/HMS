import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// clinical services
import LaboratoryAndRadiology from '../pages/ClinicalServices/LaboratoryAndRadiology';
import BloodBankAndDonorList from '../pages/ClinicalServices/BloodBankAndDonorList';
import AmbulanceMangement from '../pages/ClinicalServices/AmbulanceMangement';

import Billing from '../pages/Billing/Billing';

import Inventory from '../pages/Inventory/Inventory';
import AddInventory from '../pages/Inventory/AddInventory';

import Staff from '../pages/Staff/Staff';
import AddStaff from '../pages/Staff/AddStaff';
import StaffDetails from '../pages/Staff/StaffDetails';

import Settings from '../pages/Settings/Settings';
import SecuritySettings from '../pages/Settings/SecuritySettings';

const AppRoutes = () => {
  return (
    <Routes>
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
        
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/add" element={<AddDoctor />} />
        <Route path="/doctors/:id/edit" element={<AddDoctor />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        
        <Route path="/ambulance-management" element={<AmbulanceMangement />} />
        <Route path="/blood-and-donor" element={<BloodBankAndDonorList />} />
        <Route path="/laboratory-radiology" element={<LaboratoryAndRadiology />} />
        
        <Route path="/billing" element={<Billing />} />
        
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/add" element={<AddInventory />} />
        
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/add" element={<AddStaff />} />
        <Route path="/staff/:id" element={<StaffDetails />} />
        
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<SecuritySettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
