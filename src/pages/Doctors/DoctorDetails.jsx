import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Search from '../../components/Search/Search';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import { APPOINTMENTS_DATA } from '../../constants/mockAppointments';
import { loadDoctors, useDoctors } from './Doctors';

// Isolated illustrative schedule; this does not represent Appointments module records.
const demoVisits = [
  { title: 'Routine Checkup', time: '9:00 AM – 10:30 AM', description: 'Visiting admitted patients to review progress and update care plans.', type: 'Check up' },
  { title: 'Outpatient Appointments', time: '10:00 AM – 12:00 PM', description: 'Consultations with patients in the OPD clinic.', type: 'Check up' },
  { title: 'Minor Procedures', time: '12:00 PM – 1:00 PM', description: 'Small treatments, wound checks and post-surgery reviews.', type: 'Check up' },
  { title: 'Lunch & Documentation', time: '1:00 PM – 2:00 PM', description: 'Break time and updating patient records.', type: 'Break' },
  { title: 'New Patient Consultations', time: '2:00 PM – 4:00 PM', description: 'First-time visits and detailed assessments.', type: 'Check up' },
  { title: 'Outpatient & Emergency Consults', time: '4:00 PM – 7:00 PM', description: 'Follow-up visits and urgent patient care.', type: 'Urgent visit' },
];

function formatDate(value) {
  if (!value) return 'Not specified';
  const date = new Date(value + 'T00:00:00');
  return Number.isNaN(date.getTime()) ? 'Not specified' : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getAge(value) {
  if (!value) return '';
  const birth = new Date(value + 'T00:00:00');
  if (Number.isNaN(birth.getTime()) || birth > new Date()) return '';
  const today = new Date();
  return today.getFullYear() - birth.getFullYear() - (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) ? 1 : 0);
}

function formatTime(value) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value || '')) return 'Not specified';
  const [hours, minutes] = value.split(':').map(Number);
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function InformationSection({ title, items, children }) {
  return (
    <section className="mt-7">
      <h2 className="mb-4 text-sm font-medium text-white">{title}</h2>
      <dl className="space-y-3">
        {items.map(([label, value]) => (
          <div key={label} className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <dt className="text-white/65">{label}</dt>
            <dd className="min-w-0 break-words text-text-accent">{value !== '' && value !== undefined && value !== null ? value : 'Not specified'}</dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  );
}

function MetricCard({ label, icon, value, detail }) {
  return (
    <Card className="min-w-0 !border-0 !bg-[#0d281a] !px-4 !py-5">
      <h3 className="text-sm text-white/80">{label}</h3>
      <p className="my-4 flex items-center gap-3">
        <span className="rounded-full bg-text-accent/15 p-2 text-text-accent"><Icon icon={icon} width="22" /></span>
        <span className="text-2xl text-white">{value}</span>
      </p>
      <p className="text-xs leading-relaxed text-white/55">{detail}</p>
    </Card>
  );
}

export default function DoctorDetails({ allocation = false }) {
  const { id } = useParams();
  // Reset schedule controls when navigating directly between doctor profiles.
  return allocation ? <MedicineAllocation key={id} id={id} /> : <DoctorProfile key={id} id={id} />;
}

function DoctorProfile({ id }) {
  const location = useLocation();
  const titleRef = useRef(null);
  useEffect(() => { titleRef.current?.focus(); }, []);
  const doctors = useDoctors();
  const [visitType, setVisitType] = useState('All');
  const [dayOffset, setDayOffset] = useState(0);
  const doctor = doctors.find((record) => record.id === id);
  const returnTo = location.state?.returnTo?.match(/^\/doctors(?:\?|$)/) ? location.state.returnTo : '/doctors';
  const selectedDate = new Date();
  selectedDate.setDate(selectedDate.getDate() + dayOffset);
  const weekday = selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6;
  const hasDemoSchedule = doctor?.profileDemo === true;
  const isActive = doctor?.status === 'Active';
  const scheduledDay = doctor?.availabilityDays === 'Every day' || (doctor?.availabilityDays === 'Weekdays (Mon–Fri)' && weekday) || (doctor?.availabilityDays === 'Weekends (Sat–Sun)' && !weekday);
  const sessions = [[doctor?.availableFrom, doctor?.availableTo], [doctor?.availableFrom2, doctor?.availableTo2]].filter(([start, end]) => start && end);
  const visits = hasDemoSchedule && isActive && scheduledDay && sessions.length ? demoVisits.filter((visit) => visitType === 'All' || visit.type === visitType) : [];
  const certificates = Array.isArray(doctor?.certificates) ? doctor.certificates : [];

  return (
    <section aria-labelledby="doctor-profile-title" className="mx-auto w-full min-w-0 max-w-[1400px] text-white">
      <Button as={Link} to={returnTo} className="mb-5 bg-btn-solid px-4 py-2 text-sm">
        <Icon icon="solar:arrow-left-linear" width="18" /> Back to Doctors
      </Button>
      {!doctor ? (
        <Card><h1 ref={titleRef} tabIndex={-1} id="doctor-profile-title" className="text-xl outline-none">Doctor not found</h1><p className="mt-2 text-white/60">This profile is unavailable. Choose a doctor from the list.</p></Card>
      ) : (
        <>
          {location.state?.saved && <p role="status" className="mb-5 rounded-md border border-text-accent/50 bg-btn-solid/30 px-4 py-3 text-sm text-text-highlight">Doctor information saved successfully.</p>}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h1 ref={titleRef} tabIndex={-1} id="doctor-profile-title" className="text-xl font-medium outline-none">Doctor Profile</h1>
            <div className="text-right">
              <Button as={Link} to={`/doctors/${doctor.id}/medicine-allocation`} state={{ returnTo }} className="bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:add-circle-linear" width="18" /> Medicine Allocation</Button>
            </div>
          </div>
          <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="min-w-0">
              <div className="relative flex flex-col items-start gap-5 pr-10 sm:flex-row sm:items-center">
                <div className="flex h-48 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0d281a] text-text-accent">
                  {doctor.photo ? <img src={doctor.photo} alt={'Dr. ' + doctor.name} className="size-full object-cover" /> : <Icon icon="solar:user-rounded-bold" width="76" />}
                </div>
                <div className="min-w-0 flex-1">
                  <span className={'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ' + (isActive ? 'border-text-accent text-text-highlight' : 'border-white/30 text-white/60')}><span className="size-1.5 rounded-full bg-current" />{doctor.status}</span>
                  <h2 className="mt-5 break-words text-xl font-medium">Dr. {doctor.name}</h2>
                  <p className="mt-2 text-sm text-white/55">{doctor.specialist}</p>
                  <div className="mt-5 flex gap-3">
                    <Button as="a" href={'tel:' + doctor.phone.replace(/[^+\d]/g, '')} aria-label={'Call Dr. ' + doctor.name} className="rounded-full bg-white/5 p-2 text-text-accent"><Icon icon="solar:phone-linear" width="22" /></Button>
                    <Button as="a" href={'mailto:' + doctor.email} aria-label={'Email Dr. ' + doctor.name} className="rounded-full bg-white/5 p-2 text-text-accent"><Icon icon="solar:letter-linear" width="22" /></Button>
                  </div>
                </div>
                <Button as={Link} to={'/doctors/' + doctor.id + '/edit'} state={{ returnTo }} aria-label="Edit Doctor" title="Edit Doctor" className="absolute right-0 top-0 rounded-full bg-white/5 p-2 text-text-accent"><Icon icon="solar:pen-linear" width="22" /></Button>
              </div>
              <InformationSection title="Basic Information" items={[
                ['Gender', doctor.gender], ['Age', getAge(doctor.dateOfBirth)], ['Blood group', doctor.bloodGroup],
                ['Contact number', doctor.phone], ['Email', doctor.email], ['Education', doctor.qualification],
              ]}>
                {doctor.biography && <p className="mt-4 text-sm italic leading-relaxed text-text-accent">{doctor.biography}</p>}
              </InformationSection>
              <InformationSection title="About the Physician" items={[
                ['Experience', doctor.experience ? doctor.experience + ' years' : ''],
                ['Department', doctor.department], ['License number', doctor.licenseNumber],
                ['Specialization', doctor.specialist], ['Board certifications', doctor.boardCertifications],
                ['Professional memberships', doctor.memberships], ['Languages spoken', doctor.languages],
                ['Awards & recognitions', doctor.awards],
              ]} />
              <details className="mt-7 rounded-lg border border-white/10 p-4">
                <summary className="cursor-pointer text-sm text-white/75 focus-visible:outline-2 focus-visible:outline-text-highlight">Additional details & documents</summary>
                <InformationSection title="Personal & employment details" items={[
                  ['Doctor ID', doctor.id], ['Date of birth', formatDate(doctor.dateOfBirth)], ['Marital status', doctor.maritalStatus],
                  ['Address', doctor.address], ['City', doctor.city], ['Country', doctor.country],
                  ['Date of joining', formatDate(doctor.joiningDate)], ['Designation', doctor.designation], ['Shift timing', doctor.shiftTiming],
                  ['National ID file', doctor.nationalId?.name], ['Certificate files', certificates.map((file) => file.name).join(', ')],
                ]} />
                <p className="mt-4 text-xs text-white/45">Documents contain saved file details only; no files are uploaded.</p>
              </details>
            </div>
            <div className="min-w-0">
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Total patients" icon="solar:users-group-rounded-linear" value={hasDemoSchedule ? '230' : '—'} detail={hasDemoSchedule ? '3.5% increase from yesterday' : 'No patient data available'} />
                <MetricCard label="Surgeries" icon="solar:health-linear" value={hasDemoSchedule ? '90' : '—'} detail={hasDemoSchedule ? '96% success rate' : 'No surgery data available'} />
                <MetricCard label="Reviews" icon="solar:star-linear" value={hasDemoSchedule ? '4.5/5' : '—'} detail={hasDemoSchedule ? 'Based on sample patient reviews' : 'No reviews available'} />
              </div>
              <p className="mt-3 text-xs text-white/45">{hasDemoSchedule ? 'Illustrative demo metrics and schedule; not linked to Appointments.' : 'Patient metrics and schedules have not been added for this doctor.'}</p>
              <section className="mt-7" aria-labelledby="patient-visits-title">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 id="patient-visits-title" className="text-base">Patient Visits</h2>
                  <div className="flex items-center gap-2">
                    <Button aria-label="Previous day" onClick={() => setDayOffset((day) => day - 1)} className="rounded-full bg-btn-solid p-1.5"><Icon icon="solar:alt-arrow-left-linear" width="18" /></Button>
                    <Button aria-label="Next day" onClick={() => setDayOffset((day) => day + 1)} className="rounded-full bg-btn-solid p-1.5"><Icon icon="solar:alt-arrow-right-linear" width="18" /></Button>
                  </div>
                </div>
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                  <p aria-live="polite" className="text-xs text-white/60">{selectedDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter patient visits">
                    {['All', 'Check up', 'Urgent visit'].map((type) => <Button key={type} aria-pressed={visitType === type} onClick={() => setVisitType(type)} className={'rounded-full border px-2.5 py-1 text-xs ' + (visitType === type ? 'border-text-accent bg-btn-solid text-text-highlight' : 'border-white/15 text-white/60')}>{type}</Button>)}
                  </div>
                </div>
                {visits.length ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {visits.map((visit) => <Card as="article" key={visit.title} className="!border-0 !bg-[#0d281a] !p-4">
                      <h3 className="text-xs text-white/80">{visit.title}</h3>
                      <p className="my-3 text-sm font-medium text-text-accent">{visit.time}</p>
                      <p className="text-xs italic leading-relaxed text-white/65">{visit.description}</p>
                    </Card>)}
                  </div>
                ) : <div role="status" className="rounded-lg border border-white/10 px-5 py-10 text-center text-sm text-white/55">{!isActive ? 'No visits scheduled while this doctor is inactive or on leave.' : !hasDemoSchedule ? 'No patient visits scheduled for this doctor.' : !scheduledDay || !sessions.length ? 'No visits scheduled on this day.' : 'No visits match this filter.'}</div>}
              </section>
              <section className="mt-7" aria-labelledby="availability-title">
                <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="availability-title" className="text-base">Availability</h2><Button as={Link} to={`/doctors/${doctor.id}/edit`} state={{ returnTo }} className="text-xs text-text-highlight underline">Edit availability</Button></div>
                {isActive && doctor.availabilityDays && sessions.length ? <><p className="mb-3 mt-4 text-sm text-white/50">{doctor.availabilityDays}</p><div className="flex flex-wrap gap-3">{sessions.map(([start, end]) => <span key={start} className="rounded-full border border-text-accent/50 px-3 py-2 text-xs text-white/80 shadow-[0_0_12px_#00a04820]">{formatTime(start)} – {formatTime(end)}</span>)}</div></> : <p className="mt-4 text-sm text-white/55">{!isActive ? 'Currently unavailable' : 'Availability has not been configured.'}</p>}
              </section>
            </div>
          </div>
        </>
      )}
    </section>
  );
}


// Fictional patient and stock data for the local demonstration.
const allocationPatients = [
  { id: 'DEMO-P001', name: 'Watson', department: 'Cardiology', gender: 'Female', age: '28', bloodGroup: 'A+', bed: 'RM 325', consultation: 'In-patient', email: 'watson@example.com', pressure: '133/98 mmHg', temperature: '98.4 °F', heartRate: '102 bpm' },
  ...APPOINTMENTS_DATA.map((patient) => ({ id: patient.patientId, name: patient.name, department: patient.department, bed: patient.room, consultation: patient.type })),
];
const initialMedicines = [
  { id: 'amoxicillin', name: 'Amoxicillin', stock: 100 },
  { id: 'paracetamol', name: 'Paracetamol', stock: 200 },
  { id: 'metformin', name: 'Metformin', stock: 0 },
];
const initialLabTests = ['Blood test', 'Urine test', 'X-ray'];
const allocationKey = 'hms.medicineAllocations.v1';
const emptyAllocation = { medicineId: '', dosage: '', quantity: '', frequency: '', duration: '', time: '', labTest: '' };
const allocationSelectClass = 'w-full rounded-md border border-white/20 bg-bg-dark px-3 py-2.5 text-sm text-white focus:outline-2 focus:outline-text-highlight';
const allocationFields = [
  ['dosage', 'Dosage', 'text'], ['quantity', 'Quantity', 'number'],
  ['frequency', 'Frequency', ['Morning', 'Afternoon', 'Evening', 'Night']],
  ['duration', 'Duration (days)', 'number'],
  ['time', 'Time', 'time'],
];

function validAllocationState(value) {
  const textFields = ['id', 'doctorId', 'doctorName', 'patientId', 'patientName', 'department', 'medicineId', 'medicineName', 'dosage', 'frequency', 'time', 'labTest', 'createdAt'];
  return value?.version === 1 && Array.isArray(value.medicines) && Array.isArray(value.labTests) && Array.isArray(value.records)
    && value.medicines.every((medicine) => medicine && ['id', 'name'].every((key) => typeof medicine[key] === 'string' && medicine[key].trim()) && Number.isSafeInteger(medicine.stock) && medicine.stock >= 0)
    && new Set(value.medicines.map((medicine) => medicine.id)).size === value.medicines.length
    && value.labTests.every((test) => typeof test === 'string' && test.trim())
    && value.records.every((record) => record && textFields.every((key) => typeof record[key] === 'string')
      && Number.isSafeInteger(record.quantity) && record.quantity > 0
      && Number.isSafeInteger(record.duration) && record.duration > 0
      && Number.isFinite(Date.parse(record.createdAt))
      && value.medicines.some((medicine) => medicine.id === record.medicineId))
    && new Set(value.records.map((record) => record.id)).size === value.records.length;
}

function readAllocations() {
  const fallback = { version: 1, medicines: initialMedicines, labTests: initialLabTests, records: [] };
  try {
    const raw = globalThis.localStorage.getItem(allocationKey);
    if (raw === null) return { data: fallback, error: '' };
    const parsed = JSON.parse(raw);
    if (!validAllocationState(parsed)) throw new Error('Invalid saved data');
    return { data: parsed, error: '' };
  } catch {
    return { data: fallback, error: 'Saved allocations could not be read. Check browser storage before saving; existing data will not be overwritten.' };
  }
}

function writeAllocations(data) {
  if (!validAllocationState(data)) return 'The allocation information is invalid.';
  try {
    globalThis.localStorage.setItem(allocationKey, JSON.stringify(data));
    return '';
  } catch {
    return 'Unable to save. Browser storage may be full or disabled. Your form has been kept; please try again.';
  }
}

function availableStock(data, medicineId) {
  const medicine = data.medicines.find((item) => item.id === medicineId);
  return Math.max(0, (medicine?.stock || 0) - data.records.filter((record) => record.medicineId === medicineId).reduce((sum, record) => sum + record.quantity, 0));
}

function MedicineAllocation({ id }) {
  const location = useLocation();
  const doctor = useDoctors().find((record) => record.id === id);
  const [saved, setSaved] = useState(readAllocations);
  const [patientId, setPatientId] = useState('');
  const [query, setQuery] = useState('');
  const [values, setValues] = useState(emptyAllocation);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [saveError, setSaveError] = useState('');
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState('');
  const [catalogName, setCatalogName] = useState('');
  const [catalogStock, setCatalogStock] = useState('');
  const [catalogError, setCatalogError] = useState('');
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
    const refresh = (event) => { if (!event || event.key === allocationKey || event.key === null) setSaved(readAllocations()); };
    const onFocus = () => refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', onFocus);
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('focus', onFocus); };
  }, []);
  const returnTo = location.state?.returnTo?.match(/^\/doctors(?:\?|$)/) ? location.state.returnTo : '/doctors';
  const patient = allocationPatients.find((record) => record.id === patientId);
  const matchingPatients = allocationPatients.filter((record) => (record.name + ' ' + record.id).toLowerCase().includes(query.trim().toLowerCase()));
  const medicine = saved.data.medicines.find((record) => record.id === values.medicineId);
  const remainingStock = availableStock(saved.data, values.medicineId);
  const history = saved.data.records.filter((record) => record.doctorId === id && (!patientId || record.patientId === patientId)
    && (record.patientName + ' ' + record.patientId).toLowerCase().includes(query.trim().toLowerCase())).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const currentPage = Math.min(page, Math.max(1, Math.ceil(history.length / 5)));

  function change(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setNotice('');
    setSaveError('');
  }

  function selectPatient(value) {
    setPatientId(value);
    setValues(emptyAllocation);
    setErrors({});
    setNotice('');
    setSaveError('');
    setShowPatientDetails(false);
    setPage(1);
  }

  function allocate(event) {
    event.preventDefault();
    setNotice('');
    const latest = readAllocations();
    setSaved(latest);
    if (latest.error) return;
    const nextErrors = {};
    if (!patient) nextErrors.patientId = 'Select a patient before allocating medicine.';
    if (!latest.data.medicines.some((item) => item.id === values.medicineId)) nextErrors.medicineId = 'Select a medicine.';
    if (!values.dosage.trim()) nextErrors.dosage = 'Enter a dosage.';
    const quantity = Number(values.quantity);
    const duration = Number(values.duration);
    if (!Number.isSafeInteger(quantity) || quantity < 1) nextErrors.quantity = 'Enter a whole quantity of at least 1.';
    else if (quantity > availableStock(latest.data, values.medicineId)) nextErrors.quantity = 'Quantity exceeds the available stock.';
    if (!Number.isSafeInteger(duration) || duration < 1 || duration > 365) nextErrors.duration = 'Enter a duration between 1 and 365 days.';
    if (!['Morning', 'Afternoon', 'Evening', 'Night'].includes(values.frequency)) nextErrors.frequency = 'Select a frequency.';
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(values.time)) nextErrors.time = 'Choose a valid time.';
    if (values.labTest && !latest.data.labTests.includes(values.labTest)) nextErrors.labTest = 'Choose an available lab test.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const currentDoctor = loadDoctors().find((record) => record.id === id);
    if (!currentDoctor || currentDoctor.status !== 'Active') { setSaveError('Medicine can only be allocated by an active doctor.'); return; }
    const selectedMedicine = latest.data.medicines.find((item) => item.id === values.medicineId);
    const record = {
      id: crypto.randomUUID(), doctorId: id, doctorName: currentDoctor.name,
      patientId: patient.id, patientName: patient.name, department: patient.department,
      medicineId: selectedMedicine.id, medicineName: selectedMedicine.name, dosage: values.dosage.trim(),
      quantity, duration, frequency: values.frequency, time: values.time, labTest: values.labTest,
      createdAt: new Date().toISOString(),
    };
    const data = { ...latest.data, records: [record, ...latest.data.records] };
    const error = writeAllocations(data);
    setSaveError(error);
    if (error) return;
    setSaved({ data, error: '' });
    setValues(emptyAllocation);
    setPage(1);
    setNotice('Medicine allocated successfully to ' + patient.name + '.');
    formRef.current?.scrollIntoView({ block: 'start' });
  }

  function openCatalog(kind) {
    setCatalogName('');
    setCatalogStock('');
    setCatalogError('');
    setDialog(kind);
  }

  function addCatalogItem(event) {
    event.preventDefault();
    const name = catalogName.trim();
    const stock = Number(catalogStock);
    if (!name) { setCatalogError('Enter a name.'); return; }
    if (dialog === 'medicine' && (!catalogStock || !Number.isSafeInteger(stock) || stock < 0 || stock > 100000)) { setCatalogError('Enter available stock as a whole number between 0 and 100000.'); return; }
    const latest = readAllocations();
    if (latest.error) { setCatalogError(latest.error); return; }
    const names = dialog === 'medicine' ? latest.data.medicines.map((item) => item.name) : latest.data.labTests;
    if (names.some((item) => item.toLowerCase() === name.toLowerCase())) { setCatalogError('This name already exists. Select the existing option.'); return; }
    const newMedicine = { id: crypto.randomUUID(), name, stock };
    const data = dialog === 'medicine' ? { ...latest.data, medicines: [...latest.data.medicines, newMedicine] } : { ...latest.data, labTests: [...latest.data.labTests, name] };
    const error = writeAllocations(data);
    if (error) { setCatalogError(error); return; }
    setSaved({ data, error: '' });
    change(dialog === 'medicine' ? 'medicineId' : 'labTest', dialog === 'medicine' ? newMedicine.id : name);
    setDialog('');
  }

  const historyColumns = [
    { key: 'patientName', label: 'Patient name' }, { key: 'patientId', label: 'Patient ID' },
    { key: 'department', label: 'Department' }, { key: 'doctorName', label: 'Doctor', render: (value) => 'Dr. ' + value },
    { key: 'createdAt', label: 'Date', render: (value) => new Date(value).toLocaleDateString('en-GB') },
    { key: 'medicineName', label: 'Medicine' }, { key: 'dosage', label: 'Dosage' },
    { key: 'duration', label: 'Duration', render: (value) => value + ' days' }, { key: 'quantity', label: 'Quantity' },
    { key: 'frequency', label: 'Frequency' }, { key: 'time', label: 'Time' }, { key: 'labTest', label: 'Lab test', render: (value) => value || 'None' },
  ];

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1400px] text-white" aria-labelledby="allocation-title">
      <Button as={Link} to={doctor ? '/doctors/' + id : returnTo} state={{ returnTo }} className="mb-5 bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:arrow-left-linear" width="18" />{doctor ? 'Back to Doctor Profile' : 'Back to Doctors'}</Button>
      <h1 ref={headingRef} tabIndex={-1} id="allocation-title" className="text-xl font-medium outline-none">{doctor ? 'Medicine Allocation' : 'Doctor not found'}</h1>
      {!doctor ? <p className="mt-4 text-white/60">Choose an existing doctor from the list.</p> : <>
        <p className="mt-2 text-sm text-white/55">Dr. {doctor.name} · Demo only — fictional patients and medicine stock.</p>
        {doctor.status !== 'Active' && <p role="status" className="mt-4 text-amber-300">This doctor is {doctor.status.toLowerCase()}. Allocation is unavailable; history remains visible.</p>}
        {(saved.error || saveError) && <p role="alert" className="mt-4 rounded-lg border border-red-300/30 p-3 text-sm text-red-300">{saved.error || saveError}</p>}
        <div className="my-7 grid items-end gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <Search aria-label="Search patient name or ID" placeholder="Search patient name or ID" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
          <Select label="Patient name" value={patientId} onChange={(event) => selectPatient(event.target.value)} error={errors.patientId} className={allocationSelectClass}>
            <option value="">Select patient</option>
            {matchingPatients.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            {patient && !matchingPatients.some((item) => item.id === patient.id) && <option value={patient.id}>{patient.name} (selected)</option>}
          </Select>
          <Select label="Patient ID" value={patientId} onChange={(event) => selectPatient(event.target.value)} className={allocationSelectClass}>
            <option value="">All patients</option>
            {matchingPatients.map((item) => <option key={item.id} value={item.id}>{item.id}</option>)}
            {patient && !matchingPatients.some((item) => item.id === patient.id) && <option value={patient.id}>{patient.id} (selected)</option>}
          </Select>
        </div>
        {query && <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-white/55"><span role="status">{matchingPatients.length} matching patients</span><Button onClick={() => { setQuery(''); setPage(1); }} className="text-text-highlight underline">Clear search</Button></div>}
        {patient && <Card className="mb-7 !border-white/10 !bg-transparent !py-5">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
            <div className="min-w-0"><Icon icon="solar:user-circle-bold" width="64" className="mb-3 text-text-accent" /><h2 className="text-base text-text-highlight">{patient.name}</h2><p className="mt-2 text-xs text-white/60">ID: {patient.id}</p>{patient.email && <p className="mt-2 break-words text-xs">{patient.email}</p>}</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{[['Gender', patient.gender], ['Age', patient.age], ['Blood group', patient.bloodGroup], ['Department', patient.department], ['Bed number', patient.bed], ['Consultation type', patient.consultation]].map(([label, value]) => <div key={label}><p className="text-xs text-text-accent">{label}</p><p className="mt-2 break-words text-sm">{value || 'Not specified'}</p></div>)}</div>
            <div className="grid grid-cols-2 gap-4 lg:border-l lg:border-text-accent/40 lg:pl-5">{[['Blood pressure', patient.pressure], ['Temperature', patient.temperature], ['Heart rate', patient.heartRate]].map(([label, value]) => <div key={label}><p className="text-xs text-white/60">{label}</p><p className="mt-2 text-sm text-text-highlight">{value || 'Not recorded'}</p></div>)}</div>
          </div>
          <Button aria-expanded={showPatientDetails} onClick={() => setShowPatientDetails((current) => !current)} className="mt-5 text-xs text-text-highlight">{showPatientDetails ? 'Hide information' : 'View more information'}<Icon icon="solar:arrow-right-linear" width="16" /></Button>
          {showPatientDetails && <p className="mt-3 text-sm leading-relaxed text-white/60">This is a fictional patient record for the allocation demo. No additional medical records are available. Saved allocations for {patient.name} appear in the history below.</p>}
        </Card>}
        <Card className="!border-white/10 !bg-transparent !py-5">
          <h2 className="mb-5 text-base">Medicine allocation</h2>
          <form ref={formRef} onSubmit={allocate} noValidate>
            <div className="grid gap-5 md:grid-cols-3">
              <Input label="Selected patient name" value={patient?.name || ''} readOnly placeholder="Select a patient above" />
              <Input label="Selected patient ID" value={patient?.id || ''} readOnly />
              <Input label="Department" value={patient?.department || ''} readOnly />
              <div>
                <div className="mb-2 flex items-center justify-between gap-2"><label htmlFor="allocation-medicine" className="text-sm text-white/75">Medicine name *</label><Button aria-label="Add medicine" onClick={() => openCatalog('medicine')} className="text-text-highlight"><Icon icon="solar:add-circle-linear" width="18" /></Button></div>
                <Select id="allocation-medicine" required value={values.medicineId} error={errors.medicineId} onChange={(event) => change('medicineId', event.target.value)} className={allocationSelectClass}>
                  <option value="">Select medicine</option>{saved.data.medicines.map((item) => <option key={item.id} value={item.id}>{item.name} ({availableStock(saved.data, item.id)} available)</option>)}
                </Select>
                {medicine && <p role="status" className={'mt-2 text-xs ' + (remainingStock ? 'text-text-accent' : 'text-red-300')}>{remainingStock ? 'Available stock: ' + remainingStock : 'Out of stock'}</p>}
              </div>
              {allocationFields.map(([name, label, type]) => Array.isArray(type)
                ? <Select key={name} label={label} required value={values[name]} error={errors[name]} onChange={(event) => change(name, event.target.value)} className={allocationSelectClass}><option value="">Select {label.toLowerCase()}</option>{type.map((option) => <option key={option}>{option}</option>)}</Select>
                : <Input key={name} name={name} label={label} type={type} required value={values[name]} min={type === 'number' ? 1 : undefined} max={name === 'quantity' ? remainingStock : name === 'duration' ? 365 : undefined} step={type === 'number' ? 1 : undefined} maxLength={name === 'dosage' ? 40 : undefined} error={errors[name]} onChange={(event) => change(name, event.target.value)} className={type === 'time' ? '[color-scheme:dark]' : ''} />)}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2"><label htmlFor="allocation-lab" className="text-sm text-white/75">Lab test (optional)</label><Button aria-label="Add lab test" onClick={() => openCatalog('lab')} className="text-text-highlight"><Icon icon="solar:add-circle-linear" width="18" /></Button></div>
                <Select id="allocation-lab" value={values.labTest} error={errors.labTest} onChange={(event) => change('labTest', event.target.value)} className={allocationSelectClass}><option value="">None</option>{saved.data.labTests.map((test) => <option key={test}>{test}</option>)}</Select>
              </div>
            </div>
            {notice && <p role="status" className="mt-5 rounded-lg border border-text-accent/40 bg-btn-solid/30 p-3 text-sm text-text-highlight">{notice}</p>}
            <div className="mt-6 flex flex-wrap justify-end gap-3"><Button onClick={() => { setValues(emptyAllocation); setErrors({}); setNotice(''); setSaveError(''); }} className="border border-white/20 px-6 py-2 text-sm">Clear</Button><Button type="submit" disabled={doctor.status !== 'Active' || !!saved.error} className="bg-btn-solid px-6 py-2 text-sm">Allocate medicine</Button></div>
          </form>
        </Card>
        <section className="mt-7 min-w-0" aria-labelledby="allocation-history-title">
          <h2 id="allocation-history-title" className="mb-4 text-base">Medicine allocation history</h2>
          <Table columns={historyColumns} data={history.slice((currentPage - 1) * 5, currentPage * 5)} selectable={false} showActions={false} showControls={false} caption="Medicine allocation history" emptyMessage={query || patientId ? 'No allocations match this patient selection or search.' : 'No medicines allocated by this doctor yet.'} />
          <Pagination page={currentPage} pageSize={5} totalItems={history.length} itemLabel="allocations" onPageChange={setPage} />
        </section>
        <Modal open={!!dialog} title={dialog === 'medicine' ? 'Add medicine' : 'Add lab test'} onClose={() => setDialog('')}>
          <form onSubmit={addCatalogItem} noValidate className="space-y-5">
            <Input label={dialog === 'medicine' ? 'Medicine name' : 'Lab test name'} value={catalogName} maxLength={80} required onChange={(event) => { setCatalogName(event.target.value); setCatalogError(''); }} />
            {dialog === 'medicine' && <Input label="Available stock" type="number" min="0" max="100000" step="1" value={catalogStock} required onChange={(event) => { setCatalogStock(event.target.value); setCatalogError(''); }} />}
            {catalogError && <p role="alert" className="text-sm text-red-300">{catalogError}</p>}
            <div className="flex justify-end gap-3"><Button onClick={() => setDialog('')} className="border border-white/20 px-4 py-2 text-sm">Cancel</Button><Button type="submit" className="bg-btn-solid px-4 py-2 text-sm">Save {dialog === 'medicine' ? 'medicine' : 'lab test'}</Button></div>
          </form>
        </Modal>
      </>}
    </section>
  );
}
