import React from 'react';
import Button from '../../components/Button/Button';
import TotalBillGeneratedToday from './TotalBillGeneratedToday';
import InsuranceClaims from './InsuranceClaims';
import ValidationControl from './ValidationControl';
import Invoices from './Invoices';

export default function Billing() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 text-white">
      {/* Title & Action Button Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[20px] font-medium tracking-tight text-white">Billing Management</h1>

        {/* Reusing existing project Button component */}
        <Button className="rounded-md border border-text-highlight/40 bg-btn-solid px-12 py-3 text-xs font-bold text-white hover:bg-btn-solid/90 transition-colors shadow-[0_0_12px_#00a04830]">
          Generate bill
        </Button>
      </div>

      {/* Top 3 Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 items-start">
        <TotalBillGeneratedToday count={125} />
        <InsuranceClaims count={7} />
        <ValidationControl />
      </div>

      {/* Invoices Table Section */}
      <Invoices />
    </div>
  );
}
