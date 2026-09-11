export const DEFAULT_SIDEBAR_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'material-symbols:dashboard-rounded' },
  { label: 'Appointments', path: '/appointments', icon: 'material-symbols:calendar-month-rounded' },
  {
    label: 'Patients',
    path: '/patients',
    icon: 'material-symbols:groups-rounded',
    children: [
      { label: 'Patient List', path: '/patients/NewRegistration', icon: 'material-symbols:group-rounded' },
      { label: 'Add Patient', path: '/patients/add', icon: 'material-symbols:person-add-rounded' },
      { label: 'Patient Details', path: '/patients/123', icon: 'material-symbols:info-outline-rounded' },
    ],
  },
  { label: 'Doctors', path: '/doctors', icon: 'material-symbols:medical-services-rounded' },
  { label: 'Clinical Services', path: '/clinical-services', icon: 'material-symbols:medical-information-rounded' },
  { label: 'Billing', path: '/billing', icon: 'material-symbols:receipt-long-rounded' },
  { label: 'Inventory', path: '/inventory', icon: 'material-symbols:inventory-2-rounded' },
  { label: 'Staff', path: '/staff', icon: 'material-symbols:badge-rounded' },
  { label: 'Settings', path: '/settings', icon: 'material-symbols:settings-rounded' },
];

export const DEFAULT_PROFILE = {
  name: 'Victoria',
  role: 'Admin',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
};
