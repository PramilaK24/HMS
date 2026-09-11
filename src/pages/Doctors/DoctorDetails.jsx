import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { loadDoctors } from './Doctors';

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

export default function DoctorDetails() {
  const { id } = useParams();
  // Reset schedule controls when navigating directly between doctor profiles.
  return <DoctorProfile key={id} id={id} />;
}

function DoctorProfile({ id }) {
  const location = useLocation();
  const titleRef = useRef(null);
  useEffect(() => { titleRef.current?.focus(); }, []);
  const [doctors] = useState(loadDoctors);
  const [visitType, setVisitType] = useState('All');
  const [dayOffset, setDayOffset] = useState(0);
  const doctor = doctors.find((record) => record.id === id);
  const returnTo = location.state?.returnTo?.match(/^\/doctors(?:\?|$)/) ? location.state.returnTo : '/doctors';
  const selectedDate = new Date();
  selectedDate.setDate(selectedDate.getDate() + dayOffset);
  const weekday = selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6;
  const hasDemoSchedule = doctor?.profileDemo === true;
  const isActive = doctor?.status === 'Active';
  const visits = hasDemoSchedule && isActive && weekday ? demoVisits.filter((visit) => visitType === 'All' || visit.type === visitType) : [];
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
              <Button disabled aria-describedby="medicine-availability" className="bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:add-circle-linear" width="18" /> Medicine Allocation</Button>
              <p id="medicine-availability" className="mt-1 text-xs text-white/45">Coming soon</p>
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
                ) : <div role="status" className="rounded-lg border border-white/10 px-5 py-10 text-center text-sm text-white/55">{!isActive ? 'No visits scheduled while this doctor is inactive or on leave.' : !hasDemoSchedule ? 'No patient visits scheduled for this doctor.' : !weekday ? 'No visits scheduled on weekends.' : 'No visits match this filter.'}</div>}
              </section>
              <section className="mt-7" aria-labelledby="availability-title">
                <h2 id="availability-title" className="text-base">Availability</h2>
                {hasDemoSchedule && isActive ? <><p className="mb-3 mt-4 text-sm text-white/50">Weekdays only (Mon–Fri)</p><div className="flex flex-wrap gap-3">{['9:00 AM – 12:00 PM', '4:00 PM – 7:00 PM'].map((time) => <span key={time} className="rounded-full border border-text-accent/50 px-3 py-2 text-xs text-white/80 shadow-[0_0_12px_#00a04820]">{time}</span>)}</div></> : <p className="mt-4 text-sm text-white/55">{!isActive ? 'Currently unavailable' : 'Availability has not been configured.'}</p>}
              </section>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
