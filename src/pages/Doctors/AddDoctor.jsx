import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { loadDoctors, saveDoctors } from './Doctors';

const emptyDoctor = {
  name: '', dateOfBirth: '', gender: '', maritalStatus: '', address: '', phone: '', email: '',
  city: '', country: '', joiningDate: '', designation: '', qualification: '', department: '',
  specialist: '', status: 'Active', shiftTiming: '', photo: '', nationalId: null, certificates: [],
  bloodGroup: '', experience: '', licenseNumber: '', boardCertifications: '', memberships: '', languages: '', awards: '', biography: '',
};
const professionalFields = [
  ['bloodGroup', 'Blood group'], ['experience', 'Experience (years)'], ['licenseNumber', 'License number'],
  ['boardCertifications', 'Board certifications'], ['memberships', 'Professional memberships'],
  ['languages', 'Languages spoken'], ['awards', 'Awards & recognitions'], ['biography', 'About the doctor'],
];
const departments = ['Cardiology', 'Anesthesiology', 'Dermatology', 'Gastroenterology', 'Gynaecology', 'Orthopaedics', 'Neurology', 'Paediatrics', 'General Surgery', 'Urology'];
const selectClass = 'w-full rounded-md border border-white/20 bg-bg-dark px-3 py-2.5 text-sm text-white focus:outline-2 focus:outline-text-highlight';
const fields = [
  ['name', 'Full name'], ['dateOfBirth', 'Date of birth', 'date'],
  ['gender', 'Gender', ['Male', 'Female', 'Other', 'Prefer not to say']],
  ['age', 'Age'], ['maritalStatus', 'Marital status', ['Single', 'Married', 'Divorced', 'Widowed', 'Prefer not to say']],
  ['address', 'Address'], ['phone', 'Phone', 'tel'], ['email', 'Email ID', 'email'],
  ['nationalId', 'National ID', 'file'], ['city', 'City'], ['country', 'Country'],
  ['joiningDate', 'Date of joining', 'date'],
  ['designation', 'Designation', ['Doctor', 'Consultant', 'Senior Consultant', 'Resident', 'Head of Department']],
  ['department', 'Department', departments], ['specialist', 'Specialist'],
  ['status', 'Status', ['Active', 'Inactive', 'On leave']],
  ['shiftTiming', 'Shift timing', ['Morning', 'Afternoon', 'Evening', 'Night', 'Rotational']],
  ['certificates', 'Certificates', 'file'], ['qualification', 'Qualification'],
];

function ageFromDate(value) {
  if (!value) return '';
  const birth = new Date(value + 'T00:00:00');
  if (Number.isNaN(birth.getTime())) return '';
  const today = new Date();
  return today.getFullYear() - birth.getFullYear() - (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) ? 1 : 0);
}

export default function AddDoctor() {
  const { id } = useParams();
  return <DoctorForm key={id || 'new'} id={id} />;
}

function DoctorForm({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [records] = useState(loadDoctors);
  const original = records.find((doctor) => doctor.id === id);
  const [values, setValues] = useState(() => ({ ...emptyDoctor, ...original }));
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [photoPending, setPhotoPending] = useState(false);
  const photoRequest = useRef(0);
  const formRef = useRef(null);
  const returnTo = location.state?.returnTo?.match(/^\/doctors(?:\?|$)/) ? location.state.returnTo : '/doctors';

  function change(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setError('');
  }

  async function selectPhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const request = ++photoRequest.current;
    setPhotoPending(false);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 512 * 1024) {
      setErrors((current) => ({ ...current, photo: 'Choose a JPG, PNG or WebP image up to 512 KB.' }));
      return;
    }
    setPhotoPending(true);
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Unable to read image'));
        reader.readAsDataURL(file);
      });
      const preview = new Image();
      preview.src = data;
      await preview.decode();
      if (photoRequest.current === request) change('photo', data);
    } catch {
      if (photoRequest.current === request) setErrors((current) => ({ ...current, photo: 'This image could not be opened. Please choose another image.' }));
    } finally {
      if (photoRequest.current === request) setPhotoPending(false);
    }
  }

  function selectDocuments(name, event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;
    if (files.length > 5 || files.some((file) => !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setErrors((current) => ({ ...current, [name]: 'Choose PDF, JPG or PNG files, up to 5 MB each (maximum 5 certificates).' }));
      return;
    }
    // This frontend demo retains metadata only, never document contents.
    const metadata = files.map(({ name: filename, size, type }) => ({ name: filename, size, type }));
    change(name, name === 'nationalId' ? metadata[0] : metadata);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (photoPending) return;
    const cleaned = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    const nextErrors = Object.fromEntries(['photo', 'nationalId', 'certificates'].filter((name) => errors[name]).map((name) => [name, errors[name]]));
    fields.forEach(([name, label, type]) => {
      if (name !== 'age' && type !== 'file' && !cleaned[name]) nextErrors[name] = label + ' is required.';
    });
    if (cleaned.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) nextErrors.email = 'Enter a valid email address.';
    if (cleaned.phone && (!/^[+\d\s()-]+$/.test(cleaned.phone) || cleaned.phone.replace(/\D/g, '').length < 7 || cleaned.phone.replace(/\D/g, '').length > 15)) nextErrors.phone = 'Enter a valid phone number with 7–15 digits.';
    const age = ageFromDate(cleaned.dateOfBirth);
    if (cleaned.dateOfBirth && (age === '' || age < 18 || age > 100)) nextErrors.dateOfBirth = 'Enter a date of birth for an adult aged 18–100.';
    if (cleaned.joiningDate && cleaned.dateOfBirth && cleaned.joiningDate < cleaned.dateOfBirth) nextErrors.joiningDate = 'Joining date must be after the date of birth.';
    if (cleaned.experience && (!/^\d{1,2}$/.test(cleaned.experience) || Number(cleaned.experience) > 80 || (age !== '' && Number(cleaned.experience) > age - 18))) nextErrors.experience = 'Enter valid experience in whole years, consistent with the date of birth.';
    const current = loadDoctors();
    if (current.some((doctor) => doctor.id !== id && doctor.email.toLowerCase() === cleaned.email.toLowerCase())) nextErrors.email = 'A doctor with this email already exists.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setError('Please correct the highlighted fields.');
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    if (id && !current.some((doctor) => doctor.id === id)) {
      setError('This doctor is no longer available. Return to the doctor list.');
      return;
    }
    const doctor = { ...cleaned, id: id || crypto.randomUUID() };
    const result = saveDoctors(id ? current.map((record) => record.id === id ? doctor : record) : [...current, doctor]);
    if (!result.success) { setError(result.message); return; }
    navigate('/doctors/' + doctor.id, { replace: true, state: { returnTo, saved: true } });
  }

  return (
    <section className="mx-auto max-w-[1200px]">
      <Button as={Link} to={returnTo} className="mb-5 bg-btn-solid px-4 py-2 text-sm"><Icon icon="solar:arrow-left-linear" width="18" /> Back to Doctors</Button>
      {id && !original ? <Card><h1 className="text-xl">Doctor not found</h1><p className="mt-2 text-white/60">Choose an existing doctor from the list.</p></Card> : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <div><h1 className="text-xl font-medium">{id ? 'Edit Doctor' : 'Add Doctor'}</h1><p className="mt-2 text-sm text-white/55">Fields marked * are required. Photo and documents are optional.</p></div>
            <div className="max-w-64">
              <label className="relative flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/40 bg-white/5 focus-within:outline-2 focus-within:outline-text-highlight">
                {values.photo ? <img src={values.photo} alt="Doctor preview" className="size-full object-cover" /> : <span className="flex flex-col items-center gap-2 text-sm text-white/60"><Icon icon="solar:camera-add-linear" width="28" /> Add photo</span>}
                <input type="file" aria-label="Doctor photo" aria-invalid={!!errors.photo} aria-describedby="doctor-photo-help" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} className="absolute inset-0 size-full cursor-pointer opacity-0" />
              </label>
              <p id="doctor-photo-help" className="mt-2 text-xs text-white/55">JPG, PNG or WebP · Maximum 512 KB</p>
              {photoPending && <p role="status" className="mt-2 text-xs">Preparing photo…</p>}
              {errors.photo && <p role="alert" className="mt-2 text-xs text-red-300">{errors.photo}</p>}
              {(values.photo || errors.photo) && <Button onClick={() => { photoRequest.current++; setPhotoPending(false); change('photo', ''); }} className="mt-2 text-xs text-text-highlight">Remove photo</Button>}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {fields.map(([name, label, type = 'text']) => {
              if (type === 'file') {
                const selected = name === 'nationalId' ? (values.nationalId ? [values.nationalId] : []) : values.certificates;
                return <div key={name}><Input label={label} name={name} type="file" accept=".pdf,.jpg,.jpeg,.png" multiple={name === 'certificates'} error={errors[name]} onChange={(event) => selectDocuments(name, event)} className="file:mr-3 file:rounded file:border-0 file:bg-btn-solid file:px-2 file:py-1 file:text-white" /><p className="mt-2 text-xs text-white/45">PDF, JPG, PNG · 5 MB each. Only file details are saved for this demo.</p>{selected.map((file, index) => <div key={file.name + index} className="mt-2 flex items-center gap-2 text-xs"><span className="min-w-0 flex-1 break-words">{file.name}</span><Button aria-label={'Remove ' + file.name} onClick={() => change(name, name === 'nationalId' ? null : selected.filter((_, position) => position !== index))} className="shrink-0 p-1"><Icon icon="solar:close-circle-linear" width="18" /></Button></div>)}{errors[name] && !selected.length && <Button className="mt-2 text-xs text-text-highlight" onClick={() => change(name, name === 'nationalId' ? null : [])}>Clear selection error</Button>}</div>;
              }
              if (Array.isArray(type)) {
                const options = [...new Set([...type, ...(values[name] ? [values[name]] : [])])];
                return <Select key={name} label={label} name={name} required error={errors[name]} value={values[name]} onChange={(event) => change(name, event.target.value)} className={selectClass}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option}>{option}</option>)}</Select>;
              }
              return <Input key={name} label={label} name={name} type={name === 'age' ? 'text' : type} required={name !== 'age'} readOnly={name === 'age'} maxLength={type === 'date' ? undefined : name === 'address' ? 300 : 120} error={errors[name]} value={name === 'age' ? ageFromDate(values.dateOfBirth) : values[name]} onChange={name === 'age' ? undefined : (event) => change(name, event.target.value)} placeholder={name === 'age' ? 'Calculated from date of birth' : undefined} />;
            })}
          </div>
          <fieldset className="mt-8 border-t border-white/10 pt-6">
            <legend className="px-2 text-base font-medium">Professional profile (optional)</legend>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {professionalFields.map(([name, label]) => (
                <Input key={name} label={label} name={name} type={name === 'experience' ? 'number' : 'text'} min={name === 'experience' ? 0 : undefined} max={name === 'experience' ? 80 : undefined} step={name === 'experience' ? 1 : undefined} maxLength={name === 'biography' ? 500 : 160} value={values[name]} error={errors[name]} onChange={(event) => change(name, event.target.value)} />
              ))}
            </div>
          </fieldset>
          {error && <p role="alert" className="mt-5 text-sm text-red-300">{error}</p>}
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <Button onClick={() => { photoRequest.current++; setPhotoPending(false); setValues({ ...emptyDoctor, ...original }); setErrors({}); setError(''); }} className="border border-white/20 px-5 py-2 text-sm">{id ? 'Reset changes' : 'Clear'}</Button>
            <Button type="submit" disabled={photoPending} className="bg-btn-solid px-5 py-2 text-sm hover:bg-text-accent/60"><Icon icon="solar:check-circle-linear" width="18" />{id ? 'Save Changes' : 'Add Doctor'}</Button>
          </div>
        </form>
      )}
    </section>
  );
}
