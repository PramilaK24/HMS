export const sectionTabs = [
  { id: 'patient-record', label: 'Patient Record', defaultCardId: 'total-patients' },
  { id: 'surgery-record', label: 'Surgery Record', defaultCardId: 'surgeries' },
  { id: 'revenue-summary', label: 'Revenue Summary', defaultCardId: 'revenue' },
];

export const dashboardCards = {
  'patient-record': [
    {
      id: 'total-patients',
      title: 'Total Patients',
      value: '124K',
      delta: '+12 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: true,
    },
    {
      id: 'active-patients',
      title: 'Active Patients',
      value: '86K',
      delta: '+6 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
    {
      id: 'admissions',
      title: 'Admissions',
      value: '52K',
      delta: '+9 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
    {
      id: 'priority-care',
      title: 'Priority Care',
      value: '18K',
      delta: '+3 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
  ],
  'surgery-record': [
    {
      id: 'surgeries',
      title: 'Surgeries',
      value: '8.2K',
      delta: '+14 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: true,
    },
    {
      id: 'procedures',
      title: 'Procedures',
      value: '4.6K',
      delta: '+8 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
    {
      id: 'recovery',
      title: 'Recovery',
      value: '2.1K',
      delta: '+5 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
    {
      id: 'complex-cases',
      title: 'Complex Cases',
      value: '1.4K',
      delta: '+2 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
  ],
  'revenue-summary': [
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$2.4M',
      delta: '+18 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: true,
    },
    {
      id: 'claims',
      title: 'Claims',
      value: '$1.1M',
      delta: '+10 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
    {
      id: 'billing',
      title: 'Billing',
      value: '$780K',
      delta: '+7 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
    {
      id: 'collections',
      title: 'Collections',
      value: '$420K',
      delta: '+4 this week',
      detail: 'View details',
      buttonText: 'This Week',
      active: false,
    },
  ],
};

export const notificationItems = [
  {
    id: 1,
    title: 'New patients admitted from cardiology department',
    time: '23:38',
  },
  {
    id: 2,
    title: '4 new patients admitted from cardiology department',
    time: '23:38',
  },
  {
    id: 3,
    title: '4 new patients admitted from cardiology department',
    time: '23:38',
  },
  {
    id: 4,
    title: '4 new patients admitted from cardiology department',
    time: '23:38',
  },
  {
    id: 5,
    title: '4 new patients admitted from cardiology department',
    time: '23:38',
  },
];

export const consultationLegend = [
  { label: 'General Physician', color: '#0eff7b', value: 5 },
  { label: 'Dermatology', color: '#64d6a0', value: 3 },
  { label: 'Orthopedics', color: '#dffbe6', value: 2 },
  { label: 'Pediatrics', color: '#6f7e79', value: 1 },
  { label: 'Cardiology', color: '#36d3b2', value: 4 },
  { label: 'Neurology', color: '#8df4d0', value: 2 },
];

export const dashboardSummary = {
  emergencyCases: 42,
  emergencyDate: '29 July 2025',
  consultationCost: '$ 3,570',
  consultationLabel: 'Average consultation cost per doctor',
};

export const getChartSegments = (items) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return items.map((item, index) => {
    const start = items
      .slice(0, index)
      .reduce((sum, current) => sum + current.value, 0);

    const end = start + item.value;

    return {
      ...item,
      total,
      startAngle: (start / total) * 360,
      endAngle: (end / total) * 360,
    };
  });
};
