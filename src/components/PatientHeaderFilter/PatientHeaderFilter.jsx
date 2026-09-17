import React from 'react';
import { Icon } from '@iconify/react';

export default function PatientHeaderFilter({
  title = 'Bill Generation',
  subtitle = 'This is the information related to billing department',
  searchValue = '',
  onSearchChange = () => {},
  patientName = 'Watson',
  onPatientNameChange = () => {},
  patientId = 'SAH257384',
  onPatientIdChange = () => {},
  patientNameOptions = ['Watson', 'Matthew', 'Anita', 'Jeo Darlington'],
  patientIdOptions = ['SAH257384', 'SAH257385'],
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-medium text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-white/60">{subtitle}</p>}
      </div>

      <div className="flex flex-wrap items-end gap-4">
        {/* Search patient name or ID */}
        <div className="relative flex items-center">
          <Icon icon="lucide:search" width="14" className="absolute left-3 text-text-accent" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search patient name or ID"
            className="w-64 rounded-md border border-text-accent/50 bg-[#052315] py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/40 focus:border-text-highlight focus:outline-none"
          />
        </div>

        {/* Patient name select */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-normal text-white/80">Patient name</label>
          <select
            value={patientName}
            onChange={(e) => onPatientNameChange(e.target.value)}
            className="w-40 rounded-md border border-text-accent/50 bg-[#040f08] px-3 py-2 text-xs text-text-highlight focus:outline-none cursor-pointer"
          >
            {patientNameOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Patient ID select */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-normal text-white/80">Patient ID</label>
          <select
            value={patientId}
            onChange={(e) => onPatientIdChange(e.target.value)}
            className="w-36 rounded-md border border-text-accent/50 bg-[#040f08] px-3 py-2 text-xs text-text-highlight focus:outline-none cursor-pointer"
          >
            {patientIdOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
