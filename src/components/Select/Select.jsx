import { useId } from 'react';

export default function Select({ children, label, id, error, className = '', ...props }) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const select = <select id={inputId} aria-invalid={error ? true : undefined} aria-describedby={error ? `${inputId}-error` : undefined} className={className} {...props}>{children}</select>;
  if (!label && !error) return select;
  return <div className="min-w-0">
    {label && <label htmlFor={inputId} className="mb-2 block text-sm text-white/75">{label}{props.required && <span aria-hidden="true"> *</span>}</label>}
    {select}
    {error && <p id={`${inputId}-error`} className="mt-1 text-xs text-red-300">{error}</p>}
  </div>;
}
