import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Search from '../../components/Search/Search';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
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
  const [visitType, setVisitType] = useState('');
  const [visitPage, setVisitPage] = useState(0);
  const doctor = doctors.find((record) => record.id === id);
  const returnTo = location.state?.returnTo?.match(/^\/doctor-nurse\/doctor(?:\?|$)/) ? location.state.returnTo : '/doctor-nurse/doctor';
  const hasDemoSchedule = doctor?.profileDemo === true;
  const isActive = doctor?.status === 'Active';
  const sessions = [['09:00', '12:00'], ['16:00', '19:00']];
  const filteredVisits = isActive ? demoVisits.filter((visit) => !visitType || visit.type === visitType) : [];
  const visits = filteredVisits.slice(visitPage * 6, visitPage * 6 + 6);


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
              <Button as={Link} to={`/doctor-nurse/doctor/${doctor.id}/medicine-allocation`} state={{ returnTo }} className="bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:add-circle-linear" width="18" /> Medicine Allocation</Button>
            </div>
          </div>
          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="min-w-0 rounded-xl bg-[#0b100d] p-3">
              <div className="relative flex flex-col items-start gap-5 pr-10 sm:flex-row sm:items-center">
                <div className="flex h-48 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0d281a] text-text-accent">
                  {doctor.photo ? <img src={doctor.photo} alt={'Dr. ' + doctor.name} className="size-full object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <span className={'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ' + (isActive ? 'border-text-accent text-text-highlight' : 'border-white/30 text-white/60')}><span className="size-1.5 rounded-full bg-current" />{isActive ? 'Available' : doctor.status}</span>
                  <h2 className="mt-5 break-words text-xl font-medium">Dr. {doctor.name}</h2>
                  <p className="mt-2 text-sm text-white/55">{doctor.specialist}</p>
                  <div className="mt-5 flex gap-3">
                    <Button as="a" href={'tel:' + doctor.phone.replace(/[^+\d]/g, '')} aria-label={'Call Dr. ' + doctor.name} className="rounded-full bg-white/5 p-2 text-text-accent"><Icon icon="solar:phone-linear" width="22" /></Button>
                    <Button as="a" href={'mailto:' + doctor.email} aria-label={'Email Dr. ' + doctor.name} className="rounded-full bg-white/5 p-2 text-text-accent"><Icon icon="solar:letter-linear" width="22" /></Button>
                  </div>
                </div>
                <Button as={Link} to={'/doctor-nurse/doctor/' + doctor.id + '/edit'} state={{ returnTo }} aria-label="Edit Doctor" title="Edit Doctor" className="absolute right-0 top-0 rounded-full bg-white/5 p-2 text-text-accent"><Icon icon="solar:pen-linear" width="22" /></Button>
              </div>
              <InformationSection title="Basic Information" items={[
                ['Gender', doctor.gender], ['Age', getAge(doctor.dateOfBirth)], ['Blood group', doctor.bloodGroup],
                ['Contact number', doctor.phone], ['Email', doctor.email], ['Education', doctor.qualification],
              ]}>
                {doctor.biography && <p className="mt-4 text-sm italic leading-relaxed text-text-accent">{doctor.biography}</p>}
              </InformationSection>
              <InformationSection title="About the Physician" items={[
                ['Experience', doctor.experience ? doctor.experience + ' years' : ''],
                ['Department', doctor.department],
              ]} />

            </div>
            <div className="min-w-0 rounded-xl bg-[#0b100d] p-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Total patients" icon="solar:users-group-rounded-linear" value={hasDemoSchedule ? '230' : '—'} detail={hasDemoSchedule ? '3.5% Have increased from yesterday' : 'No patient data available'} />
                <MetricCard label="Surgeries" icon="solar:health-linear" value={hasDemoSchedule ? '90' : '—'} detail={hasDemoSchedule ? '95% Success rate' : 'No surgery data available'} />
                <MetricCard label="Reviews" icon="solar:star-linear" value={hasDemoSchedule ? '4.5/5' : '—'} detail={hasDemoSchedule ? 'Based on patient review' : 'No reviews available'} />
              </div>
              <section className="mt-6" aria-labelledby="patient-visits-title">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 id="patient-visits-title" className="text-sm">Patient Visits</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex gap-2" role="group" aria-label="Filter patient visits">
                      {['Check up', 'Urgent visit'].map((type) => <Button key={type} aria-pressed={visitType === type} onClick={() => { setVisitType((current) => current === type ? '' : type); setVisitPage(0); }} className="gap-1 text-[11px] text-white/75"><span className={'size-2 rounded-full border ' + (visitType === type ? 'border-text-highlight bg-text-highlight shadow-[0_0_5px_#0eff7b]' : 'border-white/45')} />{type}</Button>)}
                    </div>
                    <div className="flex gap-1">
                      <Button aria-label="Previous visits" disabled={visitPage === 0} onClick={() => setVisitPage((page) => page - 1)} className="rounded-full bg-btn-solid p-1 text-text-highlight"><Icon icon="solar:alt-arrow-left-linear" width="18" /></Button>
                      <Button aria-label="Next visits" disabled={(visitPage + 1) * 6 >= filteredVisits.length} onClick={() => setVisitPage((page) => page + 1)} className="rounded-full bg-btn-solid p-1 text-text-highlight"><Icon icon="solar:alt-arrow-right-linear" width="18" /></Button>
                    </div>
                  </div>
                </div>
                {visits.length ? <div className="grid gap-2 sm:grid-cols-3">
                  {visits.map((visit) => <Card as="article" key={visit.title} className="flex min-h-32 flex-col !border-0 !bg-[#0d281a] !p-3">
                    <h3 className="text-[11px] leading-snug text-white/85">{visit.title}</h3>
                    <p className="my-3 text-xs text-text-highlight">{visit.time}</p>
                    <p className="text-[10px] italic leading-snug text-white/85">{visit.description}</p>
                  </Card>)}
                </div> : <p role="status" className="py-8 text-center text-sm text-white/55">{!isActive ? 'Currently unavailable' : 'No visits match this filter.'}</p>}
              </section>
              <section className="mt-6" aria-labelledby="availability-title">
                <h2 id="availability-title" className="text-sm">Availability</h2>
                {isActive ? <><p className="mb-3 mt-5 text-xs text-white/50">only on week days (Mon–Fri)</p><div className="flex flex-wrap gap-3">{sessions.map(([start, end]) => <span key={start} className="rounded-full border border-text-accent/50 px-3 py-2 text-[10px] text-white/80 shadow-[0_0_12px_#00a04820]">{formatTime(start)} – {formatTime(end)}</span>)}</div></> : <p className="mt-4 text-sm text-white/55">Currently unavailable</p>}
              </section>
            </div>
          </div>
        </>
      )}
    </section>
  );
}


// Fictional patient and stock data for the local demonstration.
// These fixtures are local to this screen, not shared appointment records.
const allocationPatients = [
  { id: 'SAH257384', name: 'Watson', title: 'Mrs. Watson', department: 'Cardiology', gender: 'Female', age: '28', bloodGroup: 'A+ve', bed: 'RM 325', consultation: 'In-patient', email: 'watson22@example.com', pressure: '133/98', temperature: '98.4 F', heartRate: '102' },
  { id: 'SAH257385', name: 'Anjali', title: 'Ms. Anjali', department: 'Dermatology', gender: 'Female', age: '32', bloodGroup: 'B+ve', bed: 'RM 205', consultation: 'Out-patient', email: 'anjali@example.com' },
  { id: 'SAH257386', name: 'Rahul', title: 'Mr. Rahul', department: 'Neurology', gender: 'Male', age: '40', bloodGroup: 'O+ve', bed: 'RM 309', consultation: 'In-patient', email: 'rahul@example.com' },
];
// Figma sample history is display-only and never consumes current demo stock.
const sampleAllocationHistory = [
  ['2025-07-16', 'Amoxicillin', '500 mg', 5],
  ['2025-05-26', 'Metformin', '10 mg', 15],
  ['2025-04-04', 'Paracetamol', '100 mg', 30],
  ['2024-03-01', 'Paracetamol', '100 mg', 5],
  ['2024-02-02', 'Metformin', '10 mg', 15],
].map(([date, medicineName, dosage, duration], index) => ({ id: 'sample-allocation-' + index, patientId: 'SAH257384', patientName: 'Watson', department: 'Cardiology', doctorName: 'Smith', createdAt: date + 'T08:00:00', medicineName, dosage, duration }));
const initialMedicines = [
  { id: 'amoxicillin', name: 'Amoxicillin', stock: 100 },
  { id: 'paracetamol', name: 'Paracetamol', stock: 200 },
  { id: 'metformin', name: 'Metformin', stock: 0 },
];
const initialLabTests = ['Blood test', 'Urine test', 'X-ray'];
const allocationKey = 'hms.medicineAllocations.v1';
const emptyAllocation = { medicineId: '', dosage: '', quantity: '', frequency: '', duration: '', time: '', labTest: '' };
const allocationSelectClass = 'w-full min-w-0 rounded-md border border-white/20 bg-[#0d0e0d] px-3 py-2 text-xs text-text-highlight focus:outline-2 focus:outline-text-highlight';
const dosageOptions = ['10 mg', '100 mg', '250 mg', '500 mg', '650 mg', '1000 mg'];
const timeOptions = Array.from({ length: 48 }, (_, index) => String(Math.floor(index / 2)).padStart(2, '0') + ':' + (index % 2 ? '30' : '00'));
const initialAllocation = { medicineId: 'amoxicillin', dosage: '500 mg', quantity: '20', frequency: 'Morning', duration: '15', time: '08:00', labTest: 'Blood test' };

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
  const [patientId, setPatientId] = useState('SAH257384');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const setQuery = (text) => setSearchParams((current) => { const next = new URLSearchParams(current); if (text) next.set('q', text); else next.delete('q'); return next; }, { replace: true, state: location.state });
  const [values, setValues] = useState(initialAllocation);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [saveError, setSaveError] = useState('');
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState('');
  const [catalogName, setCatalogName] = useState('');
  const [catalogStock, setCatalogStock] = useState('');
  const [catalogError, setCatalogError] = useState('');
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
  const returnTo = location.state?.returnTo?.match(/^\/doctor-nurse\/doctor(?:\?|$)/) ? location.state.returnTo : '/doctor-nurse/doctor';
  const matchingPatients = allocationPatients.filter((record) => (record.name + ' ' + record.id).toLowerCase().includes(query.trim().toLowerCase()));
  const patient = query.trim() ? (matchingPatients.length === 1 ? matchingPatients[0] : matchingPatients.find((record) => record.id === patientId)) : allocationPatients.find((record) => record.id === patientId);
  const medicine = saved.data.medicines.find((record) => record.id === values.medicineId);
  const remainingStock = availableStock(saved.data, values.medicineId);
  const history = [...saved.data.records.filter((record) => record.doctorId === id), ...sampleAllocationHistory].filter((record) => (!patient || record.patientId === patient.id)
    && (record.patientName + ' ' + record.patientId).toLowerCase().includes(query.trim().toLowerCase())).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const currentPage = Math.min(page, Math.max(1, Math.ceil(history.length / 5)));

  function change(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setNotice('');
    setSaveError('');
  }

  function selectPatient(value) {
    setShowSummary(Boolean(value));
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
    if (!dosageOptions.includes(values.dosage)) nextErrors.dosage = 'Select a dosage.';
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

  function searchPatients(text = query) {
    setQuery(text);
    const matches = allocationPatients.filter((record) => (record.name + ' ' + record.id).toLowerCase().includes(text.trim().toLowerCase()));
    const nextId = text.trim() && matches.length === 1 ? matches[0].id : '';
    if (nextId !== patientId) selectPatient(nextId);
    setShowSummary(Boolean(nextId));
    setPage(1);
  }

  const historyColumns = [
    { key: 'patientName', label: 'Patient Name' }, { key: 'patientId', label: 'Patient ID' },
    { key: 'department', label: 'Department' }, { key: 'doctorName', label: 'Doctor', render: (value) => 'Dr. ' + value },
    { key: 'createdAt', label: 'Date', render: (value) => new Date(value).toLocaleDateString('en-GB').replaceAll('/', '-') },
    { key: 'medicineName', label: 'Medicine' }, { key: 'dosage', label: 'Dosage' },
    { key: 'duration', label: 'Duration', render: (value) => value + (value === 1 ? ' day' : ' days') },
  ];
  const allocationFields = [
    ['dosage', 'Dosage', dosageOptions.map((value) => [value, value])],
    ['quantity', 'Quantity', Array.from({ length: Math.min(remainingStock, 1000) }, (_, index) => [String(index + 1), String(index + 1)])],
    ['frequency', 'Frequency', ['Morning', 'Afternoon', 'Evening', 'Night'].map((value) => [value, value])],
    ['duration', 'Duration', Array.from({ length: 365 }, (_, index) => [String(index + 1), (index + 1) + (index ? ' days' : ' day')])],
    ['time', 'Time', timeOptions.map((value) => [value, formatTime(value)])],
  ];

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1400px] text-white" aria-labelledby="allocation-title">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 ref={headingRef} tabIndex={-1} id="allocation-title" className="text-base font-normal outline-none">{doctor ? 'Medicine Allocation' : 'Doctor not found'}</h1>
        <Button as={Link} to={doctor ? '/doctor-nurse/doctor/' + id : returnTo} state={{ returnTo }} className="text-xs text-text-highlight"><Icon icon="solar:arrow-left-linear" width="16" />{doctor ? 'Back to Doctor Profile' : 'Back to Doctors'}</Button>
      </div>
      {!doctor ? <p className="mt-4 text-white/60">Choose an existing doctor from the list.</p> : <>
        {doctor.status !== 'Active' && <p role="status" className="mb-4 text-sm text-amber-300">This doctor is {doctor.status.toLowerCase()}. Allocation is unavailable; history remains visible.</p>}
        {(saved.error || saveError) && <p role="alert" className="mb-4 rounded-lg border border-red-300/30 p-3 text-sm text-red-300">{saved.error || saveError}</p>}
        <div className="mb-7 grid items-end gap-4 md:ml-auto md:w-[85%] md:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <Search aria-label="Search patient name or ID" placeholder="Search patient name or ID" value={query} onChange={(event) => searchPatients(event.target.value)} onSearch={() => searchPatients()} className="!rounded-none !border-0 !bg-[#0d281a] !py-1.5" />
          <Select label="Patient name" value={patient?.id || ''} onChange={(event) => selectPatient(event.target.value)} error={errors.patientId} className={allocationSelectClass}>
            <option value="">Select patient</option>
            {matchingPatients.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </Select>
          <Select label="Patient ID" value={patient?.id || ''} onChange={(event) => selectPatient(event.target.value)} className={allocationSelectClass}>
            <option value="">All</option>
            {matchingPatients.map((item) => <option key={item.id} value={item.id}>{item.id}</option>)}
          </Select>
        </div>
        {query && !matchingPatients.length && <p role="status" className="mb-5 text-sm text-white/60">No patients found. Try another name or ID.</p>}
        {(showSummary || query.trim()) && patient && <section aria-label="Patient summary" className="mb-8 grid gap-6 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full border-2 border-text-highlight bg-[#c9f0da] text-[#76ae93] shadow-[0_0_24px_#0eff7b55]"><Icon icon="solar:user-rounded-bold" width="48" /></div>
            <h2 className="text-sm text-text-highlight">{patient.title}</h2><p className="mt-2 text-xs text-white/75">ID: {patient.id}</p><p className="mt-2 break-words text-xs text-white/75">{patient.email}</p>
          </div>
          <div className="min-w-0 md:border-l md:border-text-accent/50 md:pl-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">{[['Gender', patient.gender], ['Age', patient.age], ['Blood Group', patient.bloodGroup], ['Department', patient.department], ['Bed Number', patient.bed], ['Consultation type', patient.consultation]].map(([label, value]) => <div key={label}><p className="text-xs text-text-highlight">{label}</p><p className="mt-3 break-words text-xs text-white/75">{value || 'Not specified'}</p></div>)}</div>
            <div className="mt-5 text-right"><Button aria-expanded={showPatientDetails} onClick={() => setShowPatientDetails((current) => !current)} className="bg-btn-solid px-2 py-1 text-[10px]">{showPatientDetails ? 'Hide information' : 'View more information'}<Icon icon="solar:arrow-right-linear" width="14" /></Button></div>
            {showPatientDetails && <p className="mt-3 text-xs text-white/65">{patient.name} · {patient.consultation} · {patient.department}. {history.length} allocation records shown below.</p>}
          </div>
          <div className="grid grid-cols-2 content-start gap-x-4 gap-y-6 md:border-l md:border-text-accent/50 md:pl-6">{[['Blood pressure', patient.pressure, 'mmHg'], ['Temperature', patient.temperature, ''], ['Heart Rate', patient.heartRate, 'bpm']].map(([label, value, unit]) => <div key={label}><p className="text-sm text-white/75">{label}</p><p className="mt-1 text-base text-text-highlight">{value || '—'} {value && <span className="text-xs text-white/70">{unit}</span>}</p></div>)}</div>
        </section>}
        <Card className="!border-[#163421] !bg-[#0c100d] !px-5 !py-4 !shadow-[inset_0_0_18px_#00a04808]">
          <h2 className="mb-5 text-sm">Medicine allocation</h2>
          <form ref={formRef} onSubmit={allocate} noValidate>
            <div className="grid gap-x-8 gap-y-4 md:grid-cols-3 [&_label]:text-xs [&_input]:py-2 [&_input]:text-xs">
              <Input label="Patient Name" value={patient?.name || ''} readOnly placeholder="Select a patient" className="!bg-[#0d0e0d] text-white/55" />
              <Input label="Patient ID" value={patient?.id || ''} readOnly className="!bg-[#0d0e0d] text-white/55" />
              <Input label="Department" value={patient?.department || ''} readOnly className="!bg-[#0d0e0d] text-white/55" />
              <div>
                <div className="mb-2 flex items-center gap-1"><label htmlFor="allocation-medicine" className="text-xs text-white/75">Medicine name</label><Button aria-label="Add medicine" onClick={() => openCatalog('medicine')} className="text-text-highlight"><Icon icon="solar:add-circle-bold" width="16" /></Button></div>
                <Select id="allocation-medicine" aria-required="true" value={values.medicineId} error={errors.medicineId} onChange={(event) => { change('medicineId', event.target.value); if (Number(values.quantity) > availableStock(saved.data, event.target.value)) change('quantity', ''); }} className={allocationSelectClass}>
                  <option value="">Select medicine</option>{saved.data.medicines.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </Select>
                {medicine && <p role="status" className={remainingStock ? 'sr-only' : 'mt-2 text-xs text-red-300'}>{remainingStock ? 'Available stock: ' + remainingStock : 'Out of stock'}</p>}
              </div>
              {allocationFields.map(([name, label, options]) => <Select key={name} name={name} label={label} aria-required="true" value={values[name]} error={errors[name]} onChange={(event) => change(name, event.target.value)} className={allocationSelectClass}>
                <option value="">Select {label.toLowerCase()}</option>
                {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
                {values[name] && !options.some(([value]) => value === values[name]) && <option value={values[name]} disabled>{values[name]} (unavailable)</option>}
              </Select>)}
              <div>
                <div className="mb-2 flex items-center gap-1"><label htmlFor="allocation-lab" className="text-xs text-white/75">Lab test</label><Button aria-label="Add lab test" onClick={() => openCatalog('lab')} className="text-text-highlight"><Icon icon="solar:add-circle-bold" width="16" /></Button></div>
                <Select id="allocation-lab" value={values.labTest} error={errors.labTest} onChange={(event) => change('labTest', event.target.value)} className={allocationSelectClass}><option value="">None</option>{saved.data.labTests.map((test) => <option key={test}>{test}</option>)}</Select>
              </div>
              <div className="flex flex-wrap items-end justify-end gap-3 md:col-span-2"><Button onClick={() => { setValues(emptyAllocation); setErrors({}); setNotice(''); setSaveError(''); }} className="min-w-28 border border-white/20 px-5 py-2 text-xs">Clear</Button><Button type="submit" disabled={doctor.status !== 'Active' || !!saved.error} className="min-w-28 border border-text-accent/40 bg-gradient-to-r from-[#005c2a] to-[#008840] px-5 py-2 text-xs">Allocate medicine</Button></div>
            </div>
            {notice && <p role="status" className="mt-4 text-sm text-text-highlight">{notice}</p>}
          </form>
        </Card>
        <Card as="section" className="mt-3 min-w-0 !border-[#163421] !bg-[#0c100d] !px-5 !py-4" aria-labelledby="allocation-history-title">
          <h2 id="allocation-history-title" className="mb-5 text-sm">Medicine allocation history</h2>
          <Table compact sortable={false} columns={historyColumns} data={history.slice((currentPage - 1) * 5, currentPage * 5)} selectable={false} showActions={false} showControls={false} caption="Medicine allocation history, including local sample records" emptyMessage={query || patientId ? 'No allocations match this patient selection or search.' : 'No medicines allocated by this doctor yet.'} />
          {history.length > 5 && <Pagination page={currentPage} pageSize={5} totalItems={history.length} itemLabel="allocations" onPageChange={setPage} />}
        </Card>
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
