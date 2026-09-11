import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/Button/Button';

export default function PharmacyBillHeader() {
  const [formData, setFormData] = useState({
    name: 'Watson',
    patientId: 'SAH257384',
    age: '45',
    pharmacyBillId: 'THY567890',
    date: '10-08-2025',
    billingStaff: 'Anitha',
    staffId: 'STAC5678',
    patientType: 'Outpatient',
    address: 'New York, USA',
    doctorName: 'Keerthana',
    paymentType: 'Full Payment',
    paymentStatus: 'Paid',
    paymentMode: 'Cash in hand'
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({
      name: '',
      patientId: '',
      age: '',
      pharmacyBillId: '',
      date: '',
      billingStaff: '',
      staffId: '',
      patientType: 'Outpatient',
      address: '',
      doctorName: '',
      paymentType: 'Full Payment',
      paymentStatus: 'Paid',
      paymentMode: 'Cash in hand'
    });
  };

  const inputClass = 'w-full rounded-md border border-text-accent/40 bg-[#040f08] px-3 py-1.5 text-xs font-medium text-text-highlight focus:border-text-highlight focus:outline-none';
  const labelClass = 'w-32 shrink-0 text-xs font-medium text-white/80';

  return (
    <div className="space-y-4">
      {/* Top Title & Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Pharmacy bill generation</h2>
          <p className="mt-1 text-xs text-white/60">This is the information only related to pharmacy department</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search patient name or ID */}
          <div className="relative flex items-center">
            <Icon icon="lucide:search" width="14" className="absolute left-3 text-text-accent" />
            <input
              type="search"
              placeholder="Search patient name or ID"
              className="w-56 rounded-full border border-text-accent/40 bg-[#040f08] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-white/40 focus:border-text-highlight focus:outline-none"
            />
          </div>

          {/* Patient name select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/70">Patient name</span>
            <select
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="rounded-md border border-text-accent/40 bg-[#040f08] px-3 py-1.5 text-xs text-text-highlight focus:outline-none"
            >
              <option value="Watson">Watson</option>
              <option value="Matthew">Matthew</option>
              <option value="Anita">Anita</option>
            </select>
          </div>

          {/* Patient ID select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/70">Patient ID</span>
            <select
              value={formData.patientId}
              onChange={(e) => handleChange('patientId', e.target.value)}
              className="rounded-md border border-text-accent/40 bg-[#040f08] px-3 py-1.5 text-xs text-text-highlight focus:outline-none"
            >
              <option value="SAH257384">SAH257384</option>
              <option value="SAH257385">SAH257385</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3-Column Card Form Container */}
      <div className="rounded-2xl border border-text-accent/60 p-6 shadow-[inset_0_0_14px_#00a04812]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-3">
          
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className={labelClass}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => handleChange('patientId', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Pharmacy Bill ID</label>
              <input
                type="text"
                value={formData.pharmacyBillId}
                onChange={(e) => handleChange('pharmacyBillId', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className={labelClass}>Billling Staff</label>
              <input
                type="text"
                value={formData.billingStaff}
                onChange={(e) => handleChange('billingStaff', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Staff ID</label>
              <input
                type="text"
                value={formData.staffId}
                onChange={(e) => handleChange('staffId', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Patient Type</label>
              <select
                value={formData.patientType}
                onChange={(e) => handleChange('patientType', e.target.value)}
                className={inputClass}
              >
                <option value="Outpatient">Outpatient</option>
                <option value="Inpatient">Inpatient</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Doctor name</label>
              <input
                type="text"
                value={formData.doctorName}
                onChange={(e) => handleChange('doctorName', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className={labelClass}>Payment Type</label>
                <select
                  value={formData.paymentType}
                  onChange={(e) => handleChange('paymentType', e.target.value)}
                  className={inputClass}
                >
                  <option value="Full Payment">Full Payment</option>
                  <option value="Partial Payment">Partial Payment</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className={labelClass}>Payment Status</label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => handleChange('paymentStatus', e.target.value)}
                  className={inputClass}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className={labelClass}>Payment Mode</label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => handleChange('paymentMode', e.target.value)}
                  className={inputClass}
                >
                  <option value="Cash in hand">Cash in hand</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-red-500 font-medium">** GST is applicable</span>
              </div>
            </div>

            {/* Clear & Save Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                onClick={handleClear}
                className="rounded-md border border-white/30 bg-transparent px-8 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Clear
              </Button>

              <Button
                className="rounded-md border border-text-highlight/40 bg-btn-solid px-8 py-2 text-xs font-bold text-white hover:bg-btn-solid/90 transition-colors shadow-[0_0_12px_#00a04830]"
              >
                Save
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
