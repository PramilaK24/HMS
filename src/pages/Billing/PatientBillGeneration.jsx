import React, { useState, useCallback } from 'react';
import PatientHeaderFilter from '../../components/PatientHeaderFilter/PatientHeaderFilter';
import PatientVisitDetails from './PatientVisitDetails';
import TreatmentAndCharges from './TreatmentAndCharges';
import BillSummaryActions from './BillSummaryActions';
import { PATIENT_PROFILES } from '../../constants/billingConstants';

export default function PatientBillGeneration({ onCancel, onGenerate, patientData, setPatientData }) {
  const [totals, setTotals] = useState({ subtotal: 36000, taxAmount: 6480, grandTotal: 42480 });

  const handleTotalsChange = useCallback((newTotals) => {
    setTotals(newTotals);
  }, []);

  const patientNameVal = patientData?.name || patientData?.patientName || 'Jeo Darlington';
  const patientIdVal = patientData?.patientId || 'SAH257384';

  const handlePatientChange = (nameOrId) => {
    if (setPatientData) {
      if (PATIENT_PROFILES[nameOrId]) {
        setPatientData(PATIENT_PROFILES[nameOrId]);
      } else {
        const match = Object.values(PATIENT_PROFILES).find((p) => p.patientId === nameOrId);
        if (match) {
          setPatientData(match);
        }
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 text-white pb-10">
      {/* Top Header & Filters Row */}
      <PatientHeaderFilter
        title="Patient bill generation"
        subtitle="This is the information for generation of patient bill"
        patientName={patientNameVal}
        onPatientNameChange={handlePatientChange}
        patientId={patientIdVal}
        onPatientIdChange={handlePatientChange}
      />

      {/* Section 1: Patient & visit details */}
      <PatientVisitDetails
        patientData={patientData}
        setPatientData={setPatientData}
      />

      {/* Section 2: Treatment & charges */}
      {/* <TreatmentAndCharges
        onTotalsChange={handleTotalsChange}
      /> */}

      {/* Section 3: Subtotal Card & Action Buttons */}
      {/* <BillSummaryActions
        subtotal={totals.subtotal}
        taxAmount={totals.taxAmount}
        grandTotal={totals.grandTotal}
        onCancel={onCancel}
        onGenerate={onGenerate}
      /> */}
    </div>
  );
}
