import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/Button/Button';

export default function TreatmentAndCharges({ onTotalsChange }) {
  const [services, setServices] = useState([
    { id: 1, sNo: '01', description: 'Room charge (3 days)', quantity: 5, unitPrice: 1500, amount: 7500, checked: false },
    { id: 2, sNo: '02', description: 'Doctor consultation fees', quantity: 1, unitPrice: 500, amount: 500, checked: false },
    { id: 3, sNo: '03', description: 'Operation theatre charges', quantity: 1, unitPrice: 1000, amount: 1000, checked: false },
    { id: 4, sNo: '04', description: 'Nurse and wardcare', quantity: 1, unitPrice: 2000, amount: 2000, checked: false },
    { id: 5, sNo: '05', description: 'Surgeon', quantity: 2, unitPrice: 10000, amount: 20000, checked: false },
    { id: 6, sNo: '06', description: 'Medicine and consumables', quantity: 1, unitPrice: 5000, amount: 5000, checked: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const subtotal = services.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const taxRate = 0.18;
    const taxAmount = Math.round(subtotal * taxRate);
    const grandTotal = subtotal + taxAmount;
    if (onTotalsChange) {
      onTotalsChange({ subtotal, taxAmount, grandTotal });
    }
  }, [services, onTotalsChange]);

  const handleToggleSelectAll = () => {
    const nextState = !selectAll;
    setSelectAll(nextState);
    setServices(services.map((s) => ({ ...s, checked: nextState })));
  };

  const handleToggleRow = (id) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleRemoveService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Treatment & charges</h3>
        <Button
          className="flex items-center gap-1.5 rounded-md border border-text-highlight/40 bg-btn-solid px-4 py-2 text-xs font-semibold text-white hover:bg-btn-solid/90 transition-colors shadow-[0_0_12px_#00a04830]"
        >
          <Icon icon="lucide:plus" width="16" />
          <span>Add new services</span>
        </Button>
      </div>

      {/* Treatment & Charges Table */}
      <div className="overflow-x-auto rounded-lg border border-text-accent/20 bg-[#040f08]/60">
        <table className="w-full text-left text-xs text-white">
          <thead className="bg-[#040f08] text-text-highlight font-medium border-b border-text-accent/30">
            <tr>
              <th className="py-3 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleToggleSelectAll}
                  className="rounded border-text-accent bg-[#040f08] accent-text-highlight cursor-pointer"
                />
              </th>
              <th className="py-3 px-3 w-16">S.No</th>
              <th className="py-3 px-3 min-w-[200px]">Description</th>
              <th className="py-3 px-3 text-center">Quantity</th>
              <th className="py-3 px-3 text-center">Unit price ($)</th>
              <th className="py-3 px-3 text-center">Amount ($)</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-accent/20">
            {services.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleRow(item.id)}
                    className="rounded border-text-accent bg-[#040f08] accent-text-highlight cursor-pointer"
                  />
                </td>
                <td className="py-2.5 px-3 text-white/80">{item.sNo}</td>
                <td className="py-2.5 px-3 font-medium text-white">{item.description}</td>
                <td className="py-2.5 px-3 text-center text-white/90">{item.quantity}</td>
                <td className="py-2.5 px-3 text-center text-white/90">{item.unitPrice}</td>
                <td className="py-2.5 px-3 text-center font-medium text-white">{item.amount}</td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Edit service"
                    >
                      <Icon icon="lucide:pencil" width="15" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(item.id)}
                      className="text-text-highlight hover:text-red-400 transition-colors"
                      title="Remove service"
                    >
                      <Icon icon="lucide:trash-2" width="15" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
