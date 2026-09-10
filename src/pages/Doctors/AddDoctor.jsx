import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { loadDoctors, saveDoctors } from './Doctors';

export default function AddDoctor() {
  const { id } = useParams();
  // Remount when navigating between records or between Add and Edit.
  return <DoctorForm key={id || 'new'} id={id} />;
}

function DoctorForm({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [records] = useState(loadDoctors);
  const original = records.find((doctor) => doctor.id === id);
  const empty = { name: '', qualification: '', department: '', specialist: '', joiningDate: '', phone: '', email: '', status: 'Active', photo: '' };
  const [values, setValues] = useState(() => original ? { ...original } : empty);
  const [error, setError] = useState('');
  const returnTo = location.state?.returnTo?.match(/^\/doctors(?:\?|$)/) ? location.state.returnTo : '/doctors';
  const fields = [
    ['name', 'Full name', 'text'], ['qualification', 'Qualification', 'text'], ['email', 'Email ID', 'email'],
    ['phone', 'Phone', 'tel'], ['department', 'Department', 'text'], ['specialist', 'Specialist', 'text'],
    ['joiningDate', 'Date of joining', 'date'],
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    if (fields.some(([key]) => !cleaned[key])) {
      setError('Please complete all required fields.');
      return;
    }
    const current = loadDoctors();
    if (id && !current.some((doctor) => doctor.id === id)) {
      setError('This doctor is no longer available. Return to the doctor list.');
      return;
    }
    if (current.some((doctor) => doctor.id !== id && doctor.email.toLowerCase() === cleaned.email.toLowerCase())) {
      setError('A doctor with this email already exists.');
      return;
    }
    const doctor = { ...cleaned, id: id || crypto.randomUUID() };
    const result = saveDoctors(id ? current.map((record) => record.id === id ? doctor : record) : [...current, doctor]);
    if (!result.success) { setError(result.message); return; }
    navigate(`/doctors/${doctor.id}`, { replace: true, state: { returnTo, saved: true } });
  };

  return (
    <section className="mx-auto max-w-[1200px]">
      <Button as={Link} to={returnTo} className="mb-5 bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:arrow-left-linear" width="18" /> Back to Doctors</Button>
      {id && !original ? <Card><h1 className="text-xl">Doctor not found</h1><p className="mt-2 text-white/60">Choose an existing doctor from the list.</p></Card> : (
        <Card>
          <h1 className="text-xl font-medium">{id ? 'Edit Doctor' : 'Add Doctor'}</h1>
          <p className="mt-2 text-sm text-white/55">Fields marked * are required.</p>
          <form onSubmit={handleSubmit} className="mt-7">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {fields.map(([name, label, type]) => <Input key={name} label={label} name={name} type={type} required maxLength={type === 'date' ? undefined : 120} value={values[name]} onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))} />)}
              <div><label htmlFor="doctor-status" className="mb-2 block text-sm text-white/75">Status</label><Select id="doctor-status" value={values.status} onChange={(event) => setValues((current) => ({ ...current, status: event.target.value }))} className="w-full rounded-md border border-white/20 bg-bg-dark px-3 py-2.5 text-sm focus:outline-2 focus:outline-text-highlight"><option>Active</option><option>Inactive</option><option>On leave</option></Select></div>
            </div>
            {error && <p role="alert" className="mt-5 text-sm text-red-300">{error}</p>}
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <Button onClick={() => { setValues(original ? { ...original } : empty); setError(''); }} className="border border-white/20 px-5 py-2 text-sm">{id ? 'Reset changes' : 'Clear'}</Button>
              <Button type="submit" className="bg-btn-solid px-5 py-2 text-sm hover:bg-text-accent/60"><Icon icon="solar:check-circle-linear" width="18" />{id ? 'Save Changes' : 'Add Doctor'}</Button>
            </div>
          </form>
        </Card>
      )}
    </section>
  );
}
