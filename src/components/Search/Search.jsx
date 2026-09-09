import { Icon } from '@iconify/react';

export default function Search({ className = '', 'aria-label': ariaLabel = 'Search', ...props }) {
  return (
    <label className={`flex items-center gap-2 rounded-full border border-text-accent/30 bg-[#0b2919] px-3 py-2 focus-within:outline-2 focus-within:outline-text-highlight ${className}`}>
      <Icon icon="solar:magnifer-linear" width="16" className="shrink-0 text-text-accent" aria-hidden="true" />
      <input type="search" aria-label={ariaLabel} className="min-w-0 w-full bg-transparent text-xs placeholder:text-white/45 focus:outline-none" {...props} />
    </label>
  );
}
