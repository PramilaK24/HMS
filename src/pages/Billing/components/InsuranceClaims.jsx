import React from 'react';
import { Icon } from '@iconify/react';

export default function InsuranceClaims({ count = 7 }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-text-accent/60 bg-[#08170f] p-5 shadow-[inset_0_0_14px_#00a04812]">
      <div className="flex size-10 items-center justify-center rounded-lg border border-text-accent/40 bg-[#0b2919] text-text-highlight shadow-[0_0_10px_#0eff7b20]">
        <Icon icon="lucide:sliders-horizontal" width="18" aria-hidden="true" />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-white/80">Insurance Claims</h3>
        <p className="mt-2 text-4xl font-bold tracking-tight text-text-highlight">{count}</p>
      </div>
    </div>
  );
}
