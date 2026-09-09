import React from 'react';
import { Icon } from '@iconify/react';

export default function Pagination({
  currentPage = 1,
  totalPages = 2,
  startIndex = 1,
  endIndex = 7,
  roomsCount = 5,
  onPageChange
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
      <div>
        Page <span className="font-semibold text-text-highlight">{currentPage}</span> of {totalPages} ({startIndex} to {endIndex} from {roomsCount} rooms)
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="flex size-7 items-center justify-center rounded-full border border-text-accent/30 bg-[#05110a] text-white/70 transition-colors hover:border-text-highlight/50 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          <Icon icon="lucide:chevron-left" width="16" />
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="flex size-7 items-center justify-center rounded-full bg-text-highlight text-[#08170f] transition-all hover:bg-text-highlight/90 font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_10px_#0eff7b40]"
          aria-label="Next Page"
        >
          <Icon icon="lucide:chevron-right" width="16" />
        </button>
      </div>
    </div>
  );
}
