import React, { useState } from 'react';
import Button from '../../components/Button/Button';

export default function AddExtraMedicine({ onAddMedicine }) {
  const [medicine, setMedicine] = useState({
    sNo: '6',
    itemCode: 'TAB5432',
    nameOfDrugs: 'Citricine',
    expireDate: '12/09/2028',
    quantity: '10',
    unitPrice: '10',
    discount: '10',
    tax: '18',
    taxAmount: '20',
    total: '10'
  });

  const handleChange = (field, value) => {
    setMedicine((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setMedicine({
      sNo: '6',
      itemCode: 'TAB5432',
      nameOfDrugs: 'Citricine',
      expireDate: '',
      quantity: '',
      unitPrice: '',
      discount: '',
      tax: '',
      taxAmount: '',
      total: ''
    });
  };

  const handleAdd = () => {
    if (onAddMedicine) {
      onAddMedicine(medicine);
    }
  };

  const tableInputClass = 'w-full bg-transparent px-2 py-1.5 text-center text-xs text-white focus:outline-none';

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-white">Add extra medicine</h3>

      <div className="rounded-2xl border border-text-accent/60 p-5 shadow-[inset_0_0_14px_#00a04812]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-white">
            <thead className="bg-[#040f08] text-text-highlight font-semibold">
              <tr className="border border-text-accent/40">
                <th className="p-2.5 text-center border-r border-text-accent/30 w-12">S No.</th>
                <th className="p-2.5 text-left border-r border-text-accent/30 min-w-[120px]">Item code</th>
                <th className="p-2.5 text-left border-r border-text-accent/30 min-w-[140px]">Name of drugs</th>
                <th className="p-2.5 text-center border-r border-text-accent/30 min-w-[110px]">Expire Date</th>
                <th className="p-2.5 text-center border-r border-text-accent/30 w-20">Quantity</th>
                <th className="p-2.5 text-center border-r border-text-accent/30 w-20">Unit price</th>
                <th className="p-2.5 text-center border-r border-text-accent/30 w-24">Discount(%)</th>
                <th className="p-2.5 text-center border-r border-text-accent/30 w-20">Tax(%)</th>
                <th className="p-2.5 text-center border-r border-text-accent/30 w-24">Tax amount</th>
                <th className="p-2.5 text-center w-20">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-text-accent/40 bg-[#040f08]/60">
                <td className="p-1 text-center border-r border-text-accent/30">{medicine.sNo}</td>
                
                <td className="p-1 border-r border-text-accent/30">
                  <select
                    value={medicine.itemCode}
                    onChange={(e) => handleChange('itemCode', e.target.value)}
                    className="w-full bg-transparent px-2 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="TAB5432" className="bg-[#08170f]">TAB5432</option>
                    <option value="TAB6789" className="bg-[#08170f]">TAB6789</option>
                    <option value="SYP6789" className="bg-[#08170f]">SYP6789</option>
                  </select>
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <select
                    value={medicine.nameOfDrugs}
                    onChange={(e) => handleChange('nameOfDrugs', e.target.value)}
                    className="w-full bg-transparent px-2 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Citricine" className="bg-[#08170f]">Citricine</option>
                    <option value="Glimepiride" className="bg-[#08170f]">Glimepiride</option>
                    <option value="Amoxilin" className="bg-[#08170f]">Amoxilin</option>
                  </select>
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <input
                    type="text"
                    value={medicine.expireDate}
                    onChange={(e) => handleChange('expireDate', e.target.value)}
                    className={tableInputClass}
                  />
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <input
                    type="text"
                    value={medicine.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    className={tableInputClass}
                  />
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <input
                    type="text"
                    value={medicine.unitPrice}
                    onChange={(e) => handleChange('unitPrice', e.target.value)}
                    className={tableInputClass}
                  />
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <input
                    type="text"
                    value={medicine.discount}
                    onChange={(e) => handleChange('discount', e.target.value)}
                    className={tableInputClass}
                  />
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <input
                    type="text"
                    value={medicine.tax}
                    onChange={(e) => handleChange('tax', e.target.value)}
                    className={tableInputClass}
                  />
                </td>

                <td className="p-1 border-r border-text-accent/30">
                  <input
                    type="text"
                    value={medicine.taxAmount}
                    onChange={(e) => handleChange('taxAmount', e.target.value)}
                    className={tableInputClass}
                  />
                </td>

                <td className="p-1">
                  <input
                    type="text"
                    value={medicine.total}
                    onChange={(e) => handleChange('total', e.target.value)}
                    className={tableInputClass}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Clear & Add Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            onClick={handleClear}
            className="rounded-md border border-white/30 bg-transparent px-8 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Clear
          </Button>

          <Button
            onClick={handleAdd}
            className="rounded-md border border-text-highlight/40 bg-btn-solid px-8 py-2 text-xs font-bold text-white hover:bg-btn-solid/90 transition-colors shadow-[0_0_12px_#00a04830]"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
