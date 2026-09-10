import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Pagination from '../../../components/Pagination/Pagination';
import { SAMPLE_INVOICES } from '../data/invoicesData';

export default function Invoices({ invoices = SAMPLE_INVOICES, onOpenInvoice }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const filteredInvoices = useMemo(() => {
    if (!query.trim()) return invoices;
    const q = query.toLowerCase().trim();
    return invoices.filter((inv) =>
      inv.id.toLowerCase().includes(q) ||
      inv.patientName.toLowerCase().includes(q) ||
      inv.department.toLowerCase().includes(q) ||
      inv.paymentMethod.toLowerCase().includes(q) ||
      inv.status.toLowerCase().includes(q)
    );
  }, [invoices, query]);

  const totalPages = Math.ceil(filteredInvoices.length / pageSize) || 1;
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInvoices.slice(start, start + pageSize);
  }, [filteredInvoices, currentPage]);

  const handleActionClick = (invId) => {
    if (onOpenInvoice) {
      onOpenInvoice(invId);
    } else {
      navigate(`/billing/invoice/${invId}`);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold text-white">Invoices</h2>

      {/* Outer Card Container */}
      <div className="overflow-hidden rounded-2xl border border-text-accent/50 bg-[#08170f] p-5 shadow-[inset_0_0_14px_#00a04812]">
        
        {/* Card Header Row */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-medium text-white/90">All Invoices</h3>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Icon icon="lucide:search" width="14" className="absolute left-3 text-text-accent" />
              <input
                type="search"
                placeholder="Search Invoices..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                className="w-48 sm:w-64 rounded-full border border-text-accent/40 bg-[#040f08] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-white/40 focus:border-text-highlight focus:outline-none"
              />
            </div>

            {/* Filter Icon Button */}
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full border border-text-accent/40 bg-[#0b2919] text-text-highlight hover:bg-btn-solid transition-colors"
              title="Filter"
            >
              <Icon icon="lucide:sliders-horizontal" width="14" />
            </button>

            {/* Delete/Trash Icon Button */}
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full border border-text-accent/40 bg-[#0b2919] text-text-highlight hover:bg-btn-solid transition-colors"
              title="Delete"
            >
              <Icon icon="lucide:trash-2" width="14" />
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white">
            <thead className="text-text-highlight bg-[#040f08] border-b border-text-accent/30 text-[11px] font-medium tracking-wide">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="size-3.5 rounded accent-text-accent" />
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span>Invoice ID</span>
                    <Icon icon="lucide:chevrons-up-down" width="12" className="text-text-accent" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span>Patient Name</span>
                    <Icon icon="lucide:chevrons-up-down" width="12" className="text-text-accent" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span>Department</span>
                    <Icon icon="lucide:chevrons-up-down" width="12" className="text-text-accent" />
                  </div>
                </th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text-accent/20">
              {paginatedInvoices.map((inv) => (
                <tr key={inv.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3.5">
                    <input type="checkbox" className="size-3.5 rounded accent-text-accent" />
                  </td>

                  {/* Invoice ID & Date */}
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-white">{inv.id}</div>
                    <div className="text-[10px] text-white/50">{inv.date}</div>
                  </td>

                  {/* Patient Name & ID */}
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-white">{inv.patientName}</div>
                    <div className="text-[10px] text-white/50">{inv.patientId}</div>
                  </td>

                  {/* Department */}
                  <td className="px-4 py-3.5 text-white/80">{inv.department}</td>

                  {/* Amount */}
                  <td className="px-4 py-3.5 font-medium text-white">
                    ${inv.amount.toFixed(2)}
                  </td>

                  {/* Payment Method */}
                  <td className="px-4 py-3.5 text-white/70">{inv.paymentMethod}</td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span className={`font-semibold ${inv.status === 'Paid' ? 'text-text-highlight' : 'text-[#FFB800]'}`}>
                      {inv.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleActionClick(inv.id)}
                      className="inline-flex size-7 items-center justify-center rounded-full border border-text-accent/40 bg-[#0b2919] text-text-highlight transition-all hover:bg-btn-solid hover:scale-105"
                      title="View Invoice"
                    >
                      <Icon icon="lucide:external-link" width="14" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer (Outside Card Container) */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={((currentPage - 1) * pageSize) + 1}
        endIndex={Math.min(currentPage * pageSize, filteredInvoices.length)}
        roomsCount={5}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
