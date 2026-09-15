export const APPOINTMENTS_DATA = [
  { id: 1, name: "Prakash", patientId: "SAH257384", department: "Orthopedics", doctor: "Dr. Sravan", room: "RM 305", type: "Follow-up", status: "Completed", timeframe: "Today", date: "2024-10-15", phone: "9876543210" },
  { id: 2, name: "Anjali", patientId: "SAH257385", department: "Cardiology", doctor: "Dr. Rajesh", room: "RM 102", type: "Check-up", status: "Cancelled", timeframe: "Today", date: "2024-10-15", phone: "9876543211" },
  { id: 3, name: "Rahul", patientId: "SAH257386", department: "Neurology", doctor: "Dr. Meena", room: "OP", type: "Consultation", status: "Normal", timeframe: "Today", date: "2024-10-15", phone: "9876543212" },
  { id: 4, name: "Sneha", patientId: "SAH257387", department: "Pediatrics", doctor: "Dr. Kiran", room: "OP", type: "Consultation", status: "Severe", timeframe: "Upcoming", date: "2024-10-20", phone: "9876543213" },
  { id: 5, name: "Vikram", patientId: "SAH257388", department: "Orthopedics", doctor: "Dr. Sravan", room: "N/A", type: "Check-up", status: "Completed", timeframe: "Past", date: "2024-10-01", phone: "9876543214" },
  { id: 6, name: "Priya", patientId: "SAH257389", department: "Dermatology", doctor: "Dr. Anita", room: "RM 205", type: "Follow-up", status: "Critical", timeframe: "Today", date: "2024-10-15", phone: "9876543215" },
  { id: 7, name: "Amit", patientId: "SAH257390", department: "Cardiology", doctor: "Dr. Rajesh", room: "RM 405", type: "Follow-up", status: "Severe", timeframe: "Upcoming", date: "2024-10-22", phone: "9876543216" },
  { id: 8, name: "Neha", patientId: "SAH257391", department: "Neurology", doctor: "Dr. Meena", room: "RM 309", type: "Consultation", status: "Critical", timeframe: "Upcoming", date: "2024-10-23", phone: "9876543217" },
  { id: 9, name: "Rohan", patientId: "SAH257392", department: "Pediatrics", doctor: "Dr. Kiran", room: "N/A", type: "Check-up", status: "Normal", timeframe: "Past", date: "2024-09-30", phone: "9876543218" },
  { id: 10, name: "Kavita", patientId: "SAH257393", department: "Dermatology", doctor: "Dr. Anita", room: "OP", type: "Follow-up", status: "Completed", timeframe: "Past", date: "2024-09-28", phone: "9876543219" },
  { id: 11, name: "Suresh", patientId: "SAH257394", department: "Orthopedics", doctor: "Dr. Sravan", room: "RM 306", type: "Check-up", status: "Normal", timeframe: "Today", date: "2024-10-15", phone: "9876543220" },
  { id: 12, name: "Megha", patientId: "SAH257395", department: "Cardiology", doctor: "Dr. Rajesh", room: "RM 103", type: "Consultation", status: "Cancelled", timeframe: "Upcoming", date: "2024-10-25", phone: "9876543221" },
  { id: 13, name: "Tarun", patientId: "SAH257396", department: "Neurology", doctor: "Dr. Meena", room: "OP", type: "Follow-up", status: "Severe", timeframe: "Past", date: "2024-09-25", phone: "9876543222" },
  { id: 14, name: "Pooja", patientId: "SAH257397", department: "Pediatrics", doctor: "Dr. Kiran", room: "RM 202", type: "Check-up", status: "Completed", timeframe: "Today", date: "2024-10-15", phone: "9876543223" },
  { id: 15, name: "Vijay", patientId: "SAH257398", department: "Dermatology", doctor: "Dr. Anita", room: "RM 206", type: "Consultation", status: "Critical", timeframe: "Past", date: "2024-09-20", phone: "9876543224" }
];

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
