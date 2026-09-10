import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/Button/Button';
import TotalBillGeneratedToday from './components/TotalBillGeneratedToday';
import InsuranceClaims from './components/InsuranceClaims';
import ValidationControl from './components/ValidationControl';
import Invoices from './components/Invoices';

export default function Billing() {
  const [headerQuery, setHeaderQuery] = useState('');

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 text-white">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Breadcrumb Left */}
        <nav aria-label="Breadcrumb" className="text-xs text-white/60">
          <span>Billing</span>
          <span className="mx-1.5">&gt;</span>
          <span className="text-text-highlight font-medium">Billing management</span>
        </nav>

        {/* Search & Header Icons Right */}
        <div className="flex items-center gap-3">
          {/* Header Search Input */}
          <div className="relative flex items-center">
            <Icon icon="lucide:search" width="14" className="absolute left-3 text-text-accent" />
            <input
              type="search"
              placeholder="Search patient name or ID"
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              className="w-56 sm:w-72 rounded-full border border-text-accent/40 bg-[#040f08] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-white/40 focus:border-text-highlight focus:outline-none"
            />
          </div>

          {/* Quick Action Icons */}
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full border border-text-accent/30 bg-[#0b2919] text-white/80 hover:text-text-highlight hover:border-text-highlight/50 transition-colors"
            title="Dark mode"
          >
            <Icon icon="lucide:moon" width="16" />
          </button>

          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full border border-text-accent/30 bg-[#0b2919] text-white/80 hover:text-text-highlight hover:border-text-highlight/50 transition-colors"
            title="Settings"
          >
            <Icon icon="lucide:settings" width="16" />
          </button>

          <button
            type="button"
            className="relative flex size-8 items-center justify-center rounded-full border border-text-accent/30 bg-[#0b2919] text-white/80 hover:text-text-highlight hover:border-text-highlight/50 transition-colors"
            title="Notifications"
          >
            <Icon icon="lucide:bell" width="16" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-text-highlight"></span>
          </button>
        </div>
      </div>

      {/* Title & Action Button Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">Billing Management</h1>

        {/* Reusing existing project Button component */}
        <Button className="rounded-md border border-text-highlight/40 bg-btn-solid px-6 py-2 text-xs font-semibold text-white hover:bg-btn-solid/90 transition-colors shadow-[0_0_12px_#00a04830]">
          Generate bill
        </Button>
      </div>

      {/* Top 3 Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <TotalBillGeneratedToday count={125} />
        <InsuranceClaims count={7} />
        <ValidationControl />
      </div>

      {/* Invoices Table Section */}
      <Invoices />
    </div>
  );
}
