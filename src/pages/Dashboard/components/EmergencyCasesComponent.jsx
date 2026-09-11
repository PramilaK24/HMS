import React from 'react';
import { Icon } from '@iconify/react';
import { dashboardSummary } from '../dashboardUtils';

const EmergencyCasesComponent = () => (
  <section className="w-full rounded-[18px] border border-[#0EFF7B1F] bg-[#0B120F]/90 p-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.01)]">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="m-0 text-[1.1rem] font-semibold text-white">Emergency cases</h2>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0EFF7B4D] bg-[#0EFF7B14] text-[#0EFF7B]" aria-label="Open emergency cases">
        <Icon icon="akar-icons:arrow-up-right" width={18} height={18} />
      </span>
    </div>

    <div className="mb-5 flex items-center gap-2.5 text-sm text-white/70">
      <span className="mr-2">{dashboardSummary.emergencyDate}</span>
      <button type="button" className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#0EFF7B4D] bg-[#0EFF7B14] text-[#0EFF7B]" aria-label="Open emergency cases">
        <Icon icon="akar-icons:chevron-down" width={12} height={12} />
      </button>
    </div>

    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#0EFF7B4D] bg-[#0EFF7B14] text-[#0EFF7B]" aria-hidden="true">
          <Icon icon="boxicons:hospital" width={24} height={24} />
        </span>
        <span className="text-[42px] font-normal leading-none tracking-[-0.06em] text-[#ff5d5d]">
          {dashboardSummary.emergencyCases}
        </span>
      </div>

      <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-[#0EFF7B] bg-[#0eff7b]/90" aria-label="Emergency cases progress">
        <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-gradient-to-r from-[#ff5d5d] to-[#ff5d5d]" />
      </div>
    </div>
  </section>
);

export default EmergencyCasesComponent;
