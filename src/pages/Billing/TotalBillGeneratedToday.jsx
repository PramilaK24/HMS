import React from 'react';
import { Icon } from '@iconify/react';

export default function TotalBillGeneratedToday({ count = 125 }) {
  return (
    <div className="h-fit flex flex-col rounded-lg border border-text-accent/60 bg-[#08170f] p-5 shadow-[inset_0_0_14px_#00a04812]">
      <div className="flex size-8 items-center justify-center rounded-3xl border border-text-accent/40 bg-[#0b2919] text-text-highlight shadow-[0_0_10px_#0eff7b20]">
        <Icon icon="lucide:sliders-horizontal" width="18" aria-hidden="true" />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-white/80">Total Bills Generated Today</h3>
        <p className="mt-1.5 text-3xl tracking-tight text-text-highlight">{count}</p>
      </div>
    </div>
  );
}
