import React from 'react';
import { Icon } from '@iconify/react';
import { PATIENT_PROFILES } from '../../constants/billingConstants';

export default function PatientVisitDetails({ patientData, setPatientData }) {
  const currentData = patientData || PATIENT_PROFILES['Jeo Darlington'];

  const handleInputChange = (field, value) => {
    if (setPatientData) {
      if (field === 'patientName' && PATIENT_PROFILES[value]) {
        setPatientData(PATIENT_PROFILES[value]);
      } else if (field === 'patientId') {
        const match = Object.values(PATIENT_PROFILES).find((p) => p.patientId === value);
        if (match) {
          setPatientData(match);
        } else {
          setPatientData((prev) => ({ ...prev, [field]: value }));
        }
      } else {
        setPatientData((prev) => ({ ...prev, [field]: value }));
      }
    }
  };

  const inputClass =
    'w-full rounded-md bg-[#052315] border border-text-accent/50 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-text-highlight focus:outline-none focus:ring-1 focus:ring-text-highlight/50 transition-colors';
  const selectClass =
    'w-full rounded-md bg-[#040f08] border border-text-accent/50 px-3 py-2 text-xs text-text-highlight focus:border-text-highlight focus:outline-none cursor-pointer focus:ring-1 focus:ring-text-highlight/50 transition-colors';
  const labelClass = 'w-32 shrink-0 text-xs font-medium text-white/80';

  const patientNameVal = currentData.name || currentData.patientName || 'Jeo Darlington';
  const patientIdVal = currentData.patientId || 'SAH257384';
  const ageGenderVal = currentData.ageGender || (currentData.age ? `${currentData.age} / Male` : '45 / Male');
  const admissionDateFromVal = currentData.admissionDateFrom || '01-01-2024';
  const admissionDateToVal = currentData.admissionDateTo || '11-01-2024';
  const dobVal = currentData.dob || '04-04-1980';
  const addressVal = currentData.address || 'Newyork, USA';
  const roomTypeVal = currentData.roomType || 'General';
  const doctorNameVal = currentData.doctorName || 'Mrs. Keerthana';
  const departmentVal = currentData.department || 'Cardiology';
  const patientTypeVal = currentData.patientType || 'Inpatient';
  const wardNumberVal = currentData.wardNumber || '101';
  const bedNumberVal = currentData.bedNumber || '44';
  const billingStaffIdVal = currentData.billingStaffId || currentData.staffId || 'SATC567889';
  const staffNameVal = currentData.staffName || currentData.billingStaff || 'Anithaa';
  const paymentModeVal = currentData.paymentMode === 'Cash in hand' ? 'Cash' : (currentData.paymentMode || 'Cash');
  const isInsuranceVal = currentData.isInsurance || false;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-white">Patient & visit details</h3>

      <div className="grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-3">
        {/* Column 1 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <label className={labelClass}>Patient ID</label>
            <input
              type="text"
              value={patientIdVal}
              readOnly
              className={`${inputClass} text-text-highlight font-medium`}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Patient Name</label>
            <input
              type="text"
              value={patientNameVal}
              readOnly
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Age/Gender</label>
            <input
              type="text"
              value={ageGenderVal}
              readOnly
              className={inputClass}
            />
          </div>

          {/* Admission Date (From - To) */}
          <div className="flex items-center gap-2">
            <label className={labelClass}>Admission Date</label>
            <div className="flex w-full items-center gap-1.5">
              <input
                type="text"
                value={admissionDateFromVal}
                onChange={(e) => handleInputChange('admissionDateFrom', e.target.value)}
                className="w-full rounded-md bg-[#052315] border border-text-accent/50 px-2 py-2 text-xs text-text-highlight text-center focus:border-text-highlight focus:outline-none focus:ring-1 focus:ring-text-highlight/50 transition-colors cursor-text"
              />
              <span className="text-xs text-white/60">To</span>
              <input
                type="text"
                value={admissionDateToVal}
                onChange={(e) => handleInputChange('admissionDateTo', e.target.value)}
                className="w-full rounded-md bg-[#052315] border border-text-accent/50 px-2 py-2 text-xs text-text-highlight text-center focus:border-text-highlight focus:outline-none focus:ring-1 focus:ring-text-highlight/50 transition-colors cursor-text"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Date of birth</label>
            <input
              type="text"
              value={dobVal}
              readOnly
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Address</label>
            <input
              type="text"
              value={addressVal}
              readOnly
              className={inputClass}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <label className={labelClass}>Room Type</label>
            <select
              value={roomTypeVal}
              onChange={(e) => handleInputChange('roomType', e.target.value)}
              className={selectClass}
            >
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Special">Special</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Doctor Name</label>
            <input
              type="text"
              value={doctorNameVal}
              readOnly
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Department</label>
            <input
              type="text"
              value={departmentVal}
              readOnly
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Patient type</label>
            <select
              value={patientTypeVal}
              onChange={(e) => handleInputChange('patientType', e.target.value)}
              className={selectClass}
            >
              <option value="Inpatient">Inpatient</option>
              <option value="Outpatient">Outpatient</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Ward number</label>
            <input
              type="text"
              value={wardNumberVal}
              readOnly
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Bed number</label>
            <input
              type="text"
              value={bedNumberVal}
              readOnly
              className={inputClass}
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <label className={labelClass}>Billing staff ID</label>
            <select
              value={billingStaffIdVal}
              onChange={(e) => handleInputChange('billingStaffId', e.target.value)}
              className={selectClass}
            >
              <option value="SATC567889">SATC567889</option>
              <option value="STAC5678">STAC5678</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Staff Name</label>
            <input
              type="text"
              value={staffNameVal}
              readOnly
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className={labelClass}>Payment mode</label>
            <select
              value={paymentModeVal}
              onChange={(e) => handleInputChange('paymentMode', e.target.value)}
              className={selectClass}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          {/* Insurance Processing Card */}
          <div className="rounded-lg border border-text-accent/40 bg-[#040f08] p-3 space-y-2">
            <p className="text-xs text-white/90 font-medium">
              Is this bill being processed with the Insurance?
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Yes Button */}
                <button
                  type="button"
                  onClick={() => handleInputChange('isInsurance', true)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors ${
                    isInsuranceVal
                      ? 'bg-btn-solid text-white font-semibold'
                      : 'bg-gray-700/80 text-white/80 hover:bg-gray-600'
                  }`}
                >
                  <span>Yes</span>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      isInsuranceVal ? 'bg-white flex items-center justify-center text-[#00A048]' : 'bg-gray-400'
                    }`}
                  >
                    {isInsuranceVal && <Icon icon="lucide:check" width="10" className="stroke-[3]" />}
                  </span>
                </button>

                {/* No Button */}
                <button
                  type="button"
                  onClick={() => handleInputChange('isInsurance', false)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors ${
                    !isInsuranceVal
                      ? 'bg-btn-solid text-white font-semibold'
                      : 'bg-gray-700/80 text-white/80 hover:bg-gray-600'
                  }`}
                >
                  <span>No</span>
                  <span
                    className={`h-3.5 w-3.5 rounded-full ${
                      !isInsuranceVal ? 'bg-white flex items-center justify-center text-[#00A048]' : 'bg-gray-400'
                    }`}
                  >
                    {!isInsuranceVal && <Icon icon="lucide:check" width="10" className="stroke-[3]" />}
                  </span>
                </button>
              </div>

              <div className="text-xs text-white/80">
                If Yes{' '}
                <span className="text-text-highlight font-bold border-b border-text-highlight cursor-pointer ml-1">
                  Add insurance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
