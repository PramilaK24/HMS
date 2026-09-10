import { useId } from 'react';

export default function Input({ label, id, error, className = '', ...props }) {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <div className="min-w-0">
      {label && <label htmlFor={inputId} className="mb-2 block text-sm text-white/75">{label}{props.required && <span aria-hidden="true"> *</span>}</label>}
      <input id={inputId} aria-invalid={error ? true : undefined} aria-describedby={error ? `${inputId}-error` : undefined} className={`w-full rounded-md border border-white/20 bg-bg-dark px-3 py-2.5 text-sm text-white focus:outline-2 focus:outline-text-highlight ${className}`} {...props} />
      {error && <p id={`${inputId}-error`} className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
