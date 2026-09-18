import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import PatientHeaderFilter from '../../components/PatientHeaderFilter/PatientHeaderFilter';
import { PATIENT_PROFILES } from '../../constants/billingConstants';

export default function PharmacyBillHeader({ formData: externalData, setFormData: externalSetData }) {
  const [internalData, setInternalData] = useState(PATIENT_PROFILES['Jeo Darlington']);

  const formData = externalData || internalData;
  const setFormData = externalSetData || setInternalData;

  const handleChange = (field, value) => {
    if (field === 'name' && PATIENT_PROFILES[value]) {
      setFormData(PATIENT_PROFILES[value]);
    } else if (field === 'patientId') {
      const match = Object.values(PATIENT_PROFILES).find((p) => p.patientId === value);
      if (match) {
        setFormData(match);
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
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

  const inputClass = 'w-full  bg-[#0EFF7B0D] px-3 py-1.5 text-[14px] font-medium text-text-highlight focus:border-text-highlight focus:outline-none';
  const labelClass = 'w-32 shrink-0 text-[16px] font-medium text-white/80';

  return (
    <div className="space-y-4">
      {/* Top Title & Filters Row */}
      <PatientHeaderFilter
        title="Pharmacy bill generation"
        subtitle="This is the information only related to pharmacy department"
        patientName={formData.name || formData.patientName || 'Jeo Darlington'}
        onPatientNameChange={(val) => handleChange('name', val)}
        patientId={formData.patientId || 'SAH257384'}
        onPatientIdChange={(val) => handleChange('patientId', val)}
      />

      {/* 3-Column Card Form Container */}
      <div className="rounded-[12px] border border-[#0EFF7B0D] p-6 shadow-[inset_0_0_14px_#00a04812]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-3">
          
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className={labelClass}>Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Patient ID</label>
              <input
                type="text"
                value={formData.patientId || ''}
                onChange={(e) => handleChange('patientId', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Age</label>
              <input
                type="text"
                value={formData.age || ''}
                onChange={(e) => handleChange('age', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Pharmacy Bill ID</label>
              <input
                type="text"
                value={formData.pharmacyBillId || ''}
                onChange={(e) => handleChange('pharmacyBillId', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Date</label>
              <input
                type="text"
                value={formData.date || ''}
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
                value={formData.billingStaff || formData.staffName || ''}
                onChange={(e) => handleChange('billingStaff', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Staff ID</label>
              <input
                type="text"
                value={formData.staffId || formData.billingStaffId || ''}
                onChange={(e) => handleChange('staffId', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Patient Type</label>
              <select
                value={formData.patientType || 'Outpatient'}
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
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className={labelClass}>Doctor name</label>
              <input
                type="text"
                value={formData.doctorName || ''}
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
                  value={formData.paymentType || 'Full Payment'}
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
                  value={formData.paymentStatus || 'Paid'}
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
                  value={formData.paymentMode || 'Cash'}
                  onChange={(e) => handleChange('paymentMode', e.target.value)}
                  className={inputClass}
                >
                  <option value="Cash">Cash</option>
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
