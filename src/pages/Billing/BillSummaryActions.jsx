import React from 'react';
import Button from '../../components/Button/Button';

export default function BillSummaryActions({ subtotal, taxAmount, grandTotal, onCancel, onGenerate }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
      {/* Left Subtotal/Tax/Grand Total Card */}
      <div className="flex items-center gap-4 rounded-xl border border-text-accent/50 bg-[#031d10] px-6 py-4 shadow-lg min-w-[340px]">
        <div className="space-y-1 text-xs">
          <p className="text-white/90">
            Subtotal: <span className="font-bold text-yellow-400">${subtotal.toLocaleString()}</span>
          </p>
          <p className="text-white/90">
            Tax (18%): <span className="font-bold text-yellow-400">${taxAmount.toLocaleString()}</span>
          </p>
        </div>

        {/* Diagonal Slash Separator */}
        <div className="text-3xl font-extralight text-text-accent/50 select-none">/</div>

        <div>
          <p className="text-xs font-bold text-white tracking-wide">Grand total</p>
          <p className="text-2xl font-black text-text-highlight">
            ${grandTotal.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          onClick={onCancel}
          className="rounded-full border border-text-accent/60 bg-[#082012] px-8 py-2.5 text-xs font-semibold text-white hover:bg-[#0c2f1b] transition-colors"
        >
          Print
        </Button>

        <Button
          onClick={onCancel}
          className="rounded-full border border-text-accent/60 bg-[#082012] px-8 py-2.5 text-xs font-semibold text-white hover:bg-[#0c2f1b] transition-colors"
        >
          Export PDF
        </Button>

        <Button
          onClick={onGenerate}
          className="rounded-full border border-text-highlight/40 bg-[#025126] px-9 py-2.5 text-xs font-bold text-white hover:bg-[#025126]/90 transition-colors shadow-[0_0_12px_#00a04830]"
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
