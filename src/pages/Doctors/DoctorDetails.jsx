import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { loadDoctors } from './Doctors';

export default function DoctorDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [doctors] = useState(loadDoctors);
  const doctor = doctors.find((record) => record.id === id);
  const returnTo = location.state?.returnTo?.match(/^\/doctors(?:\?|$)/) ? location.state.returnTo : '/doctors';
  return (
    <section className="mx-auto max-w-[1200px]">
      <Button as={Link} to={returnTo} className="mb-5 bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:arrow-left-linear" width="18" /> Back to Doctors</Button>
      {!doctor ? <Card><h1 className="text-xl">Doctor not found</h1><p className="mt-2 text-white/60">This profile is unavailable. Choose a doctor from the list.</p></Card> : (
        <Card>
          {location.state?.saved && <p role="status" className="mb-5 rounded-md border border-text-accent/50 bg-btn-solid/30 px-4 py-3 text-sm text-text-highlight">Doctor information saved successfully.</p>}
          <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-xl font-medium">Doctor Profile</h1><Button as={Link} to={`/doctors/${doctor.id}/edit`} state={{ returnTo }} className="border border-text-accent/60 bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:pen-linear" width="16" /> Edit Doctor</Button></div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-full border-2 border-text-highlight bg-[#d8e8de] text-[#6f8678]">{doctor.photo ? <img src={doctor.photo} alt={doctor.name} className="size-full object-cover" /> : <Icon icon="solar:user-rounded-bold" width="52" />}</div>
            <div><span className="rounded-full border border-text-accent/50 px-2 py-1 text-xs text-text-highlight">{doctor.status}</span><h2 className="mt-3 text-xl text-text-highlight">Dr. {doctor.name}</h2><p className="mt-1 text-sm text-white/60">{doctor.qualification}</p></div>
          </div>
          <h3 className="mt-8 font-medium">Basic Information</h3>
          <dl className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Doctor ID', doctor.id], ['Department', doctor.department], ['Specialist', doctor.specialist],
              ['Email ID', doctor.email], ['Contact', doctor.phone], ['Date of joining', doctor.joiningDate],
              ['Date of birth', doctor.dateOfBirth], ['Gender', doctor.gender], ['Marital status', doctor.maritalStatus],
              ['Address', doctor.address], ['City', doctor.city], ['Country', doctor.country],
              ['Designation', doctor.designation], ['Shift timing', doctor.shiftTiming],
              ['National ID file', doctor.nationalId?.name], ['Certificate files', doctor.certificates?.map((file) => file.name).join(', ')],
            ].map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-white/50">{label}</dt><dd className="mt-2 break-words text-sm text-white/85">{value || 'Not specified'}</dd></div>)}
          </dl>
        </Card>
      )}
    </section>
  );
}
