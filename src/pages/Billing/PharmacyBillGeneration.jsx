import React from 'react';
import PharmacyBillHeader from './PharmacyBillHeader';
import AddExtraMedicine from './AddExtraMedicine';
import BillingInformation from './BillingInformation';

export default function PharmacyBillGeneration({ onCancel, onGenerate, patientData, setPatientData }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-white">
      {/* Top Header Section */}
      <PharmacyBillHeader formData={patientData} setFormData={setPatientData} />

      {/* Add Extra Medicine Section */}
      <AddExtraMedicine />

      {/* Billing Information Section */}
      <BillingInformation onCancel={onCancel} onGenerate={onGenerate} />
    </div>
  );
}
