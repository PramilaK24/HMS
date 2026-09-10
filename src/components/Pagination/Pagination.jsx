import { Icon } from '@iconify/react';
import Button from '../Button/Button';

export default function Pagination({ page, pageSize, totalItems, onPageChange, itemLabel = 'items' }) {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/65">
      <p role="status">Page {currentPage} of {pageCount} · {start}–{end} of {totalItems} {itemLabel}</p>
      <nav aria-label={`${itemLabel} pagination`} className="flex gap-2">
        <Button aria-label="Previous page" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className="size-8 border border-text-accent/50 bg-btn-solid">
          <Icon icon="solar:alt-arrow-left-linear" width="18" aria-hidden="true" />
        </Button>
        <span aria-current="page" aria-label={`Page ${currentPage}`} className="flex size-8 items-center justify-center rounded-full bg-text-highlight text-black">{currentPage}</span>
        <Button aria-label="Next page" disabled={currentPage >= pageCount} onClick={() => onPageChange(currentPage + 1)} className="size-8 border border-text-accent/50 bg-btn-solid">
          <Icon icon="solar:alt-arrow-right-linear" width="18" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
}
