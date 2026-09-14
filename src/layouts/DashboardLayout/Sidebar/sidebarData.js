export const DEFAULT_SIDEBAR_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'material-symbols:dashboard-rounded' },
  { label: 'Appointments', path: '/appointments', icon: 'material-symbols:calendar-month-rounded' },
  {
    label: 'Patients',
    path: '/patients',
    icon: 'material-symbols:groups-rounded',  
    children: [
      { label: 'New Registration', path: '/patients/newRegistration', icon: 'material-symbols:person-add-rounded' },
      { label: 'IPD/OPD Patient', path: '/patients/IPD-OPD-Patient', icon: 'material-symbols:group-rounded' },
      { label: 'Patients Profile', path: '/patients/patientsProfile', icon: 'akar-icons:person' },
    ],
  },
  { label: 'Administration', path: '/administration', icon: 'bi:hospital',
     children: [
      { label: 'Departments', path: '/administration/departments', icon: 'carbon:list' },
      { label: 'Room Management', path: '/administration/roomManagement', icon: 'arcticons:emoji-bed' },
      { label: 'Staff Management', path: '/administration/staffManagement', icon: 'akar-icons:person' },
    ],
   },   
  { label: 'Stock & Inventory', path: '/stock-inventory', icon: 'fluent-mdl2:product-catalog' },
  { label: 'Doctor/Nurse', path: '/doctor-nurse', icon: 'carbon:add-large',
     children: [
      { label: 'Doctor', path: '/doctor-nurse/doctor', icon: 'hugeicons:doctor-01' },
      { label: 'Nurse', path: '/doctor-nurse/nurse', icon: 'healthicons:nurse-outline' },
    ],
   },
  { label: 'Clinical Services', path: '/clinical-services', icon: 'healthicons:virus-lab-research-syringe',
    children: [
      { label: 'Laboratory & Radiology', path: '/clinical-services/laboratory-radiology', icon: 'healthicons:virus-lab-research-test-tube-outline' },
      { label: 'Clinical Reports', path: '/clinical-services/clinical-reports', icon: 'material-symbols:person-add-rounded' },
      { label: 'Ambulance Management', path: '/clinical-services/ambulance-management', icon: 'boxicons:ambulance' },
    ],
   },
  { label: 'Billing', path: '/billing', icon: 'bi:clipboard2-check' },
  { label: 'Settings', path: '/settings', icon: 'akar-icons:person' },
];

export const DEFAULT_PROFILE = {
  name: 'Victoria',
  role: 'Admin',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
};
