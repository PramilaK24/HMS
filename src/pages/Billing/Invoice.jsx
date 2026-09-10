import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { SAMPLE_INVOICES } from './data/invoicesData';

export default function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = SAMPLE_INVOICES.find((inv) => inv.id === id) || {
    id: id || 'INV-2011',
    date: '09/01/2025',
    patientName: 'Matthew Scott',
    patientId: 'SAH257384',
    department: 'Cardiology',
    amount: 1800.00,
    paymentMethod: 'Insurance',
    status: 'Paid'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-[900px] space-y-6 text-white pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-text-accent/40 bg-[#09130d] p-4 print:hidden">
        <button
          type="button"
          onClick={() => navigate('/billing')}
          className="flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Icon icon="lucide:arrow-left" width="16" /> Back to Billing
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-md border border-text-highlight/40 bg-btn-solid px-4 py-2 text-xs font-bold text-white hover:bg-btn-solid/90 transition-colors"
          >
            <Icon icon="lucide:printer" width="16" /> Print Invoice
          </button>
        </div>
      </div>

      {/* Printable Invoice Card */}
      <div className="rounded-2xl border border-text-accent/50 bg-[#08170f] p-8 shadow-2xl print:border-none print:bg-white print:text-black print:p-0">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-text-accent/30 pb-6 print:border-gray-300">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-btn-solid text-text-highlight print:bg-green-700 print:text-white">
              <Icon icon="lucide:receipt" width="24" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-highlight print:text-green-800">
                SAH HEALTHCARE HOSPITAL
              </h1>
              <p className="text-xs text-white/60 print:text-gray-600">Billing & Invoice Document</p>
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold uppercase ${invoice.status === 'Paid' ? 'bg-emerald-950 text-text-highlight border border-emerald-500/40 print:bg-green-100 print:text-green-800' : 'bg-amber-950 text-[#FFB800] border border-amber-500/40'}`}>
              {invoice.status}
            </span>
            <h2 className="mt-2 text-lg font-bold text-white print:text-black">{invoice.id}</h2>
            <p className="text-xs text-white/60 print:text-gray-600">Date: {invoice.date}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="my-6 grid grid-cols-2 gap-4 rounded-xl border border-text-accent/30 bg-[#040f08] p-4 print:border-gray-300 print:bg-gray-50">
          <div>
            <h3 className="text-xs font-bold uppercase text-text-highlight print:text-green-800">Patient Details</h3>
            <p className="mt-1 text-sm font-semibold text-white print:text-black">{invoice.patientName}</p>
            <p className="text-xs text-white/60 print:text-gray-600">Patient ID: {invoice.patientId}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-text-highlight print:text-green-800">Department & Payment</h3>
            <p className="mt-1 text-xs text-white/90 print:text-gray-800">Department: <span className="font-medium text-white print:text-black">{invoice.department}</span></p>
            <p className="text-xs text-white/90 print:text-gray-800">Payment Method: <span className="font-medium text-white print:text-black">{invoice.paymentMethod}</span></p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-left text-xs my-6">
          <thead className="border-b border-text-accent/30 bg-[#040f08] text-text-highlight font-semibold print:bg-gray-200 print:text-black">
            <tr>
              <th className="p-3">Description</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-accent/20 print:divide-gray-300">
            <tr>
              <td className="p-3 text-white print:text-black">{invoice.department} Medical Procedure & Consultation</td>
              <td className="p-3 text-right font-semibold text-white print:text-black">${invoice.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-text-accent/30 pt-4 text-sm font-bold text-text-highlight print:text-black print:border-gray-300">
          <span>Total Amount:</span>
          <span>${invoice.amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
