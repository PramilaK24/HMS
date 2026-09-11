import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/Button/Button';

export default function BillingInformation({ onCancel, onGenerate }) {
  const [items, setItems] = useState([
    { id: 1, sNo: '1.', itemCode: 'TAB6789', nameOfDrugs: 'Glimepiride', rackNo: '27', shelfNo: '3', quantity: '10', unitPrice: '100', discount: '10%', tax: '20.00', total: '1200.00' },
    { id: 2, sNo: '2.', itemCode: 'TAB5432', nameOfDrugs: 'Progesterone', rackNo: '6', shelfNo: '7', quantity: '5', unitPrice: '1500', discount: '10%', tax: '80.00', total: '4500.00' },
    { id: 3, sNo: '3.', itemCode: 'SYP6789', nameOfDrugs: 'Amoxilin', rackNo: '10', shelfNo: '10', quantity: '20', unitPrice: '50', discount: '0%', tax: '5.00', total: '3500.00' },
    { id: 4, sNo: '4.', itemCode: 'SYB6543', nameOfDrugs: 'Alprazolam', rackNo: '3', shelfNo: '2', quantity: '10', unitPrice: '20', discount: '10%', tax: '8.90', total: '4000.00' },
    { id: 5, sNo: '5.', itemCode: 'TAB9789', nameOfDrugs: 'Actinomycin - D', rackNo: '9', shelfNo: '15', quantity: '15', unitPrice: '30', discount: '10%', tax: '25.00', total: '1250.00' },
  ]);

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const inputCellClass = 'w-full bg-[#040f08] border border-text-accent/40 rounded px-2 py-1 text-xs text-white focus:outline-none';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Billing Information</h3>

      {/* Table Container */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full text-left text-xs text-white">
          <thead className="text-text-highlight bg-[#040f08] font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">S No.</th>
              <th className="py-2.5 px-3">Item code</th>
              <th className="py-2.5 px-3 min-w-[150px]">Name of drugs</th>
              <th className="py-2.5 px-3">Rack no</th>
              <th className="py-2.5 px-3">Shelf no</th>
              <th className="py-2.5 px-3">Quantity</th>
              <th className="py-2.5 px-3">Unit price</th>
              <th className="py-2.5 px-3">Discount</th>
              <th className="py-2.5 px-3">Tax</th>
              <th className="py-2.5 px-3 relative">
                <span className="inline-block border-l-2 border-text-highlight h-3.5 mr-1 align-middle"></span>
                <span>Tota</span>
              </th>
              <th className="py-2.5 px-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-accent/20">
            {items.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-3">{row.sNo}</td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.itemCode} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.nameOfDrugs} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.rackNo} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.shelfNo} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.quantity} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.unitPrice} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.discount} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.tax} className={inputCellClass} />
                </td>
                <td className="py-2 px-2">
                  <input type="text" defaultValue={row.total} className={inputCellClass} />
                </td>
                <td className="py-2 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(row.id)}
                    className="text-text-highlight hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Icon icon="lucide:trash-2" width="16" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Full-width Green Divider Line under the table */}
        <div className="mt-3 w-full border-b-2 border-text-accent/70"></div>
      </div>

      {/* Summary Block Cards Row (Right Aligned matching screenshot) */}
      <div className="flex flex-wrap items-center justify-end gap-3.5 pt-4">
        
        {/* Card 1: Sub total */}
        <div className="w-32 sm:w-36 overflow-hidden rounded-md border border-text-accent/40 bg-[#025126] text-center shadow-md">
          <div className="bg-[#6B7280] py-2 text-xs font-bold text-white tracking-wide">
            Sub total
          </div>
          <div className="py-3 text-base font-extrabold text-[#00E5FF]">
            22500.00
          </div>
        </div>

        {/* Card 2: CGST (6%) */}
        <div className="w-28 sm:w-32 overflow-hidden rounded-md border border-text-accent/40 bg-[#025126] text-center shadow-md">
          <div className="bg-[#6B7280] py-2 text-xs font-bold text-white tracking-wide">
            CGST (6%)
          </div>
          <div className="py-3 text-base font-extrabold text-[#60A5FA]">
            80.00
          </div>
        </div>

        {/* Card 3: SGST (6%) */}
        <div className="w-28 sm:w-32 overflow-hidden rounded-md border border-text-accent/40 bg-[#025126] text-center shadow-md">
          <div className="bg-[#6B7280] py-2 text-xs font-bold text-white tracking-wide">
            SGST (6%)
          </div>
          <div className="py-3 text-base font-extrabold text-[#60A5FA]">
            80.00
          </div>
        </div>

        {/* Card 4: Discount amount */}
        <div className="w-36 sm:w-44 overflow-hidden rounded-md border border-text-accent/40 bg-[#025126] text-center shadow-md">
          <div className="bg-[#6B7280] py-2 text-xs font-bold text-white tracking-wide">
            Discount amount
          </div>
          <div className="py-3 text-base font-extrabold text-[#FFB800]">
            -250.00
          </div>
        </div>

        {/* Card 5: Net Amount */}
        <div className="w-44 sm:w-52 overflow-hidden rounded-md border border-text-accent/40 bg-[#025126] text-center shadow-md">
          <div className="bg-[#6B7280] py-2 text-xs font-bold text-white tracking-wide">
            Net Amount
          </div>
          <div className="py-2.5 text-xl font-extrabold text-[#0EFF7B]">
            22410.00
          </div>
        </div>

      </div>

      {/* Bottom Page Action Buttons (Right Aligned) */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          onClick={onCancel}
          className="rounded-lg border border-text-accent/60 bg-[#082012] px-10 py-2.5 text-xs font-bold text-white hover:bg-[#0c2f1b] transition-colors"
        >
          Cancel
        </Button>

        <Button
          onClick={onGenerate}
          className="rounded-lg border border-text-highlight/40 bg-[#025126] px-10 py-2.5 text-xs font-bold text-white hover:bg-[#025126]/90 transition-colors shadow-[0_0_12px_#00a04830]"
        >
          Generate bill
        </Button>
      </div>
    </div>
  );
}
