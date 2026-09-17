import { Icon } from '@iconify/react';

export default function Search({ className = '', onSearch, 'aria-label': ariaLabel = 'Search', ...props }) {
  return (
    <div className={`flex items-center gap-2 rounded-full border border-text-accent/30 bg-[#0b2919] px-3 py-2 focus-within:outline-2 focus-within:outline-text-highlight ${className}`}>
      {onSearch ? <button type="button" aria-label="Search patients" onClick={onSearch} className="shrink-0 rounded p-1 text-text-accent focus-visible:outline-2 focus-visible:outline-text-highlight"><Icon icon="solar:magnifer-linear" width="16" aria-hidden="true" /></button> : <Icon icon="solar:magnifer-linear" width="16" className="shrink-0 text-text-accent" aria-hidden="true" />}
      <input type="search" aria-label={ariaLabel} className="min-w-0 w-full bg-transparent text-xs placeholder:text-white/45 focus:outline-none" {...props} onKeyDown={(event) => { props.onKeyDown?.(event); if (onSearch && event.key === 'Enter') { event.preventDefault(); onSearch(); } }} />
    </div>
  );
}
