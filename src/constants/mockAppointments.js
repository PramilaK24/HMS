const names = ["Prakash", "Anjali", "Rahul", "Sneha", "Vikram", "Priya", "Amit", "Neha", "Rohan", "Kavita", "Suresh", "Megha", "Tarun", "Pooja", "Vijay"];
const depts = ["Orthopedics", "Cardiology", "Neurology", "Pediatrics", "Dermatology"];
const docs = ["Dr. Sravan", "Dr. Rajesh", "Dr. Meena", "Dr. Kiran", "Dr. Anita"];
const types = ["Consultation", "Check-up", "Follow-up"];
const statuses = ["Normal", "Severe", "Critical", "Completed", "Cancelled"];
const timeframes = ["Today", "Upcoming", "Past"];

const generateData = () => {
  const data = [];
  // Generating 120 dummy records to thoroughly test pagination
  for (let i = 1; i <= 120; i++) {
    data.push({
      id: i,
      name: names[i % names.length] + (i > 15 ? " " + String.fromCharCode(64 + (i % 26 === 0 ? 26 : i % 26)) : ""),
      patientId: "SAH" + (257383 + i),
      department: depts[i % depts.length],
      doctor: docs[i % docs.length],
      room: i % 7 === 0 ? "OP" : "RM " + (100 + (i % 30)),
      type: types[i % types.length],
      status: statuses[i % statuses.length],
      timeframe: timeframes[i % timeframes.length],
      date: "2024-10-" + String((i % 28) + 1).padStart(2, '0'),
      phone: "98765" + String(i).padStart(5, '0')
    });
  }
  return data;
};

export const APPOINTMENTS_DATA = generateData();

export const APPOINTMENT_STATS = [
  { label: "Today's Total", count: 150, color: 'bg-green-900 text-green-300' },
  { label: "Visited", count: 47, color: 'bg-blue-900 text-blue-300' },
  { label: "Waiting", count: 12, color: 'bg-red-900 text-red-300' },
  { label: "Cancelled", count: 2, color: 'bg-gray-800 text-gray-300' }
];

export const DROPDOWN_OPTIONS = {
  departments: ["Orthopedics", "Cardiology", "Neurology", "Pediatrics", "Dermatology"],
  doctors: ["Dr. Sravan", "Dr. Rajesh", "Dr. Meena", "Dr. Kiran", "Dr. Anita"],
  statuses: ["Normal", "Severe", "Critical", "Completed", "Cancelled"],
  appointmentTypes: ["Consultation", "Check-up", "Follow-up"]
};

export const TABS = {
  timeframes: ['Today', 'Upcoming', 'Past'],
  statuses: ['All', 'Normal', 'Severe', 'Critical', 'Completed', 'Cancelled']
};

export const TABLE_HEADERS = [
  "Patient Name",
  "Patient ID",
  "Department",
  "Doctor",
  "Room no",
  "Appointment type",
  "Status",
  "Edit"
];
