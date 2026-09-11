import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Search from '../../components/Search/Search';
import Select from '../../components/Select/Select';
import Pagination from '../../components/Pagination/Pagination';

export default function Doctors() {
  const [doctors] = useState(loadDoctors);
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const department = params.get('department') || '';
  const specialist = params.get('specialist') || '';
  const requestedPage = Number(params.get('page'));
  const pageSize = 9;
  const updateFilter = (key, value) => {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value); else next.delete(key);
      next.delete('page');
      return next;
    }, { replace: true });
  };
  const departments = [...new Set(doctors.map((doctor) => doctor.department))].sort();
  const specialists = [...new Set(doctors.map((doctor) => doctor.specialist))].sort();
  const visibleDoctors = doctors.filter((doctor) => (
    (!department || doctor.department === department)
    && (!specialist || doctor.specialist === specialist)
    && `${doctor.name} ${doctor.id} ${doctor.email}`.toLowerCase().includes(query.trim().toLowerCase())
  ));
  const page = Math.min(Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1, Math.max(1, Math.ceil(visibleDoctors.length / pageSize)));
  const pageDoctors = visibleDoctors.slice((page - 1) * pageSize, page * pageSize);
  const returnTo = `/doctors${params.size ? `?${params}` : ''}`;
  const selectClass = 'max-w-full rounded-md border border-text-accent/60 bg-[#08170f] px-3 py-2 text-xs text-white/85 focus:outline-2 focus:outline-text-highlight';

  return (
    <section aria-labelledby="doctors-title" className="mx-auto w-full max-w-[1200px] rounded-xl bg-[#09130d] p-4 text-white sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 id="doctors-title" className="text-xl font-medium">Doctor Profiles</h1>
          <p className="mt-3 flex items-center gap-2 text-xs text-white/65">
            Total Doctors <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-btn-solid px-2 py-1 text-text-highlight">{doctors.length}</span>
          </p>
        </div>
        <Button as={Link} to="/doctors/add" state={{ returnTo }} className="border border-text-accent/60 bg-btn-solid px-5 py-2 text-sm text-white hover:bg-text-accent/60">
          <Icon icon="solar:user-plus-linear" width="18" aria-hidden="true" /> Add Doctor
        </Button>
      </div>

      <div className="my-5 flex flex-wrap items-center gap-3">
        <Select aria-label="Filter by department" value={department} onChange={(event) => updateFilter('department', event.target.value)} className={selectClass}>
          <option value="">All departments</option>
          {departments.map((value) => <option key={value}>{value}</option>)}
        </Select>
        <Select aria-label="Filter by specialist" value={specialist} onChange={(event) => updateFilter('specialist', event.target.value)} className={selectClass}>
          <option value="">All specialists</option>
          {specialists.map((value) => <option key={value}>{value}</option>)}
        </Select>
        <Search aria-label="Search doctors by name, ID or email" placeholder="Search doctor name or ID" value={query} onChange={(event) => updateFilter('q', event.target.value)} className="w-full sm:ml-auto sm:w-64" />
        {(query || department || specialist) && visibleDoctors.length > 0 && (
          <Button onClick={() => setParams({}, { replace: true })} className="text-xs text-text-highlight underline underline-offset-4">Clear filters</Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pageDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} returnTo={returnTo} />)}
      </div>
      {visibleDoctors.length === 0 && (
        <div className="rounded-lg border border-text-accent/30 py-12 text-center">
          <p>No doctors found.</p>
          <Button onClick={() => setParams({}, { replace: true })} className="mt-3 text-sm text-text-highlight underline">Clear filters</Button>
        </div>
      )}
      <Pagination page={page} pageSize={pageSize} totalItems={visibleDoctors.length} itemLabel="doctors" onPageChange={(nextPage) => setParams((current) => { const next = new URLSearchParams(current); next.set('page', String(nextPage)); return next; })} />
    </section>
  );
}

function DoctorCard({ doctor, returnTo }) {
  const joiningDate = new Date(`${doctor.joiningDate}T00:00:00`);
  const formattedDate = Number.isNaN(joiningDate.getTime()) ? 'Not specified' : joiningDate.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <Card as="article">
      <div className="mb-2 flex justify-end">
        <Button as={Link} to={`/doctors/${doctor.id}/edit`} state={{ returnTo }} aria-label={`Edit Dr. ${doctor.name}`} className="text-xs text-white/70 hover:text-text-highlight">
          <Icon icon="solar:pen-linear" width="14" aria-hidden="true" /> Edit
        </Button>
      </div>
      <div className="mx-auto mb-3 flex size-14 items-center justify-center overflow-hidden rounded-full border-2 border-text-highlight bg-[#d8e8de] text-[#6f8678] shadow-[0_0_14px_#0eff7b35]">
        {doctor.photo ? <img src={doctor.photo} alt={doctor.name} className="size-full object-cover" /> : <Icon icon="solar:user-rounded-bold" width="38" aria-hidden="true" />}
      </div>
      <h2 className="text-center text-base font-medium text-text-highlight">Dr. {doctor.name}</h2>
      <p className="mt-1 min-h-8 text-center text-xs text-white/65">{doctor.qualification}</p>
      <dl className="mt-5 space-y-3 text-xs">
        {[
          ['Department', doctor.department],
          ['Join Date', formattedDate],
          ['Contact', doctor.phone],
          ['Email ID', doctor.email],
        ].map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <dt className="shrink-0 text-white/50">{label}</dt>
            <dd className="min-w-0 break-words text-right text-white/75">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 text-center">
        <Button as={Link} to={`/doctors/${doctor.id}`} state={{ returnTo }} aria-label={`View Dr. ${doctor.name} profile`} className="border border-text-accent/40 bg-btn-solid/50 px-4 py-1.5 text-xs text-white hover:bg-btn-solid">
          View Profile
        </Button>
      </div>
    </Card>
  );
}

const profiles = [
  ['david-miller', 'David Miller', 'MBBS, FCPS', 'Orthopaedics', 'Orthopaedic Surgery', '2015-06-24'],
  ['abishek', 'Abishek', 'MBBS, MD, DNB', 'Cardiology', 'Cardiology', '2015-06-23'],
  ['chris', 'Chris', 'MBBS, MD (Anesthesiology)', 'Anesthesiology', 'Anesthesiology', '2015-06-22'],
  ['michael-johnson', 'Michael Johnson', 'MBBS, DNB', 'Dermatology', 'Dermatology', '2015-06-21'],
  ['sarah-williams', 'Sarah Williams', 'MBBS, DNB', 'Dermatology', 'Dermatology', '2015-06-22'],
  ['emily-davis', 'Emily Davis', 'MBBS, FCPS', 'Orthopaedics', 'Orthopaedic Surgery', '2015-06-24'],
  ['robert-thompson', 'Robert Thompson', 'MBBS, MD, DNB (Neurology)', 'Neurology', 'Neurology', '2015-06-20'],
  ['christopher-wilson', 'Christopher Wilson', 'MBBS, MD, DNB', 'Cardiology', 'Cardiology', '2015-06-19'],
  ['michael-anderson', 'Michael Anderson', 'MBBS, MS (General Surgery)', 'General Surgery', 'General Surgery', '2015-06-18'],
  ['ananya-rao', 'Ananya Rao', 'MBBS, MD', 'Cardiology', 'Cardiology', '2019-08-12'],
  ['arjun-mehta', 'Arjun Mehta', 'MBBS, MD', 'Dermatology', 'Dermatology', '2020-03-16'],
  ['priya-sharma', 'Priya Sharma', 'MBBS, MS', 'Orthopaedics', 'Orthopaedic Surgery', '2021-01-04'],
];

// Fictional records for the frontend demonstration only.
const sampleDoctors = profiles.map(([id, name, qualification, department, specialist, joiningDate], index) => ({
  id,
  name,
  qualification,
  department,
  specialist,
  joiningDate,
  email: `${id}@example.com`,
  phone: `+91 90000 ${String(index + 1).padStart(5, '0')}`,
  status: 'Active',
  photo: '',
}));

const DOCTOR_STORAGE_KEY = 'hms.doctors.v1';

function getStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

function isDoctor(record) {
  return record && ['id', 'name', 'qualification', 'department', 'specialist', 'joiningDate', 'email', 'phone', 'status', 'photo']
    .every((field) => typeof record[field] === 'string');
}

// Kept in the existing module file for use by the Doctor pages.
// oxlint-disable-next-line react/only-export-components
export function loadDoctors(storage = getStorage()) {
  try {
    const saved = storage?.getItem(DOCTOR_STORAGE_KEY);
    if (saved !== null && saved !== undefined) {
      const records = JSON.parse(saved);
      if (Array.isArray(records) && records.every(isDoctor)
        && new Set(records.map(({ id }) => id)).size === records.length) {
        return records;
      }
    }
  } catch {
    // Browsers may block storage; the sample listing remains available.
  }
  return sampleDoctors.map((doctor) => ({ ...doctor }));
}

// Shared with Add/Edit; kept here to use the existing file structure.
// oxlint-disable-next-line react/only-export-components
export function saveDoctors(doctors, storage = getStorage()) {
  if (!Array.isArray(doctors) || !doctors.every(isDoctor)
    || new Set(doctors.map(({ id }) => id)).size !== doctors.length) {
    return { success: false, message: 'Doctor information is invalid.' };
  }
  try {
    if (!storage) throw new Error('Storage unavailable');
    storage.setItem(DOCTOR_STORAGE_KEY, JSON.stringify(doctors));
    return { success: true };
  } catch {
    return { success: false, message: 'Unable to save in this browser. Please allow browser storage and try again.' };
  }
}
