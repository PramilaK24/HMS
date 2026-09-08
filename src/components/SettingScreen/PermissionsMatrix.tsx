import React, { useState } from "react";
import { Toggle } from "../../components/Toggle/Toggle";
// --- CUSTOM PIXEL-PERFECT TOGGLE ---
const MatrixToggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-[20px] w-[38px] shrink-0 items-center rounded-full border transition-all duration-300 ${
      enabled 
        ? "border-emerald-500/50 bg-transparent" 
        : "border-zinc-700 bg-transparent"
    }`}
  >
    <span
      className={`h-[12px] w-[12px] rounded-full transition-all duration-300 ${
        enabled 
          ? "translate-x-[20px] bg-[#10FF8D] shadow-[0_0_10px_#10FF8D]" 
          : "translate-x-1.5 bg-zinc-500"
      }`}
    />
  </button>
);

const initialModules = [
  { name: "View Patients records", roles: [true, true, true, true] },
  { name: "Edit Patients records", roles: [true, false, false, false] },
  { name: "Generate patients bill", roles: [true, true, true, true] },
  { name: "Approve insurance claims", roles: [true, false, false, true] },
  { name: "Manage Appointments", roles: [true, true, false, true] },
  { name: "Manage Inventory and pharmacy", roles: [false, false, false, true] },
  { name: "Ambulance dispatch & Transport Logs", roles: [false, false, false, true] },
];

const PermissionsMatrix = () => {
  const [modules, setModules] = useState(initialModules);

  const togglePermission = (mIdx: number, rIdx: number) => {
    setModules(prev => prev.map((m, i) => i === mIdx 
      ? { ...m, roles: m.roles.map((r, j) => j === rIdx ? !r : r) } 
      : m));
  };

  return (
    <section className="mt-12 w-full font-sans">
      <header className="mb-2">
        <h2 className="text-base font-medium text-zinc-100 tracking-tight">
          Access & Permissions
        </h2>
        <p className="mt-1 text-[11px] text-zinc-500">
          Manage role-based access with permission controls
        </p>
      </header>

      <div className="overflow-hidden rounded-md">
        {/* Header Grid */}
        <div className="grid grid-cols-[2fr_repeat(4,1fr)] bg-[#041d14] py-3 px-4 items-center">
          <span className="text-[11px] font-medium text-[#10B981] text-left">Modules</span>
          <span className="text-[11px] font-medium text-[#10B981] text-center">Receptionist</span>
          <span className="text-[11px] font-medium text-[#10B981] text-center">Doctor</span>
          <span className="text-[11px] font-medium text-[#10B981] text-center">Billing staff</span>
          <span className="text-[11px] font-medium text-[#10B981] text-center">Admin</span>
        </div>

        {/* Matrix Rows */}
        <div className="divide-y divide-white/[0.04]">
          {modules.map((module, mIdx) => (
            <div 
              key={mIdx} 
              className="grid grid-cols-[2fr_repeat(4,1fr)] px-4 py-3 items-center group"
            >
              <span className="text-[11px] text-zinc-300 font-normal pr-4 group-hover:text-white transition-colors">
                {module.name}
              </span>
              
              {module.roles.map((enabled, rIdx) => (
                <div key={rIdx} className="flex justify-center">
                  <Toggle
                                           size="sm"
                                           enabled={enabled}
                                           onChange={() =>
                                             togglePermission(mIdx, rIdx)
                                           }
                                           label={`${module.name}, role ${rIdx + 1}`}
                                         >
                                           <Toggle.Track enabled={enabled}>
                                             <Toggle.Thumb enabled={enabled} size="sm" />
                                           </Toggle.Track>
                                         </Toggle>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PermissionsMatrix;