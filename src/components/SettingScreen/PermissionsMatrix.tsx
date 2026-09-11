import React from "react";
import { motion } from "framer-motion";

const MatrixToggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <motion.button
    type="button"
    onClick={onChange}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.92 }}
    className={`relative inline-flex h-[20px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-300 ${
      enabled
        ? "border-[var(--text-highlight)]/50"
        : "border-[var(--text-accent)]/40"
    }`}
  >
    <motion.span
      className={`h-[12px] w-[12px] rounded-full ${
        enabled
          ? "bg-[var(--text-highlight)] shadow-[0_0_10px_var(--text-highlight)]"
          : "bg-[var(--btn-toggle-disabled)]"
      }`}
      animate={{ x: enabled ? 20 : 6 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.6 }}
    />
  </motion.button>
);

type Module = { name: string; roles: boolean[] };

interface PermissionsMatrixProps {
  modules: Module[];
  onToggle: (mIdx: number, rIdx: number) => void;
}

const PermissionsMatrix = ({ modules, onToggle }: PermissionsMatrixProps) => {
  return (
    <section className="mt-12 w-full font-sans">
      <motion.header
        className="mb-2"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-base font-medium text-[var(--text-primary)] tracking-tight">
          Access & Permissions
        </h2>
        <p className="mt-1 text-[11px] text-[var(--btn-toggle-disabled)]">
          Manage role-based access with permission controls
        </p>
      </motion.header>

      <div className="overflow-hidden rounded-md">
        <motion.div
          className="grid grid-cols-[2fr_repeat(4,1fr)] bg-[var(--text-highlight)]/10 py-3 px-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-[11px] font-medium text-[var(--text-highlight)] text-left">Modules</span>
          <span className="text-[11px] font-medium text-[var(--text-highlight)] text-center">Receptionist</span>
          <span className="text-[11px] font-medium text-[var(--text-highlight)] text-center">Doctor</span>
          <span className="text-[11px] font-medium text-[var(--text-highlight)] text-center">Billing staff</span>
          <span className="text-[11px] font-medium text-[var(--text-highlight)] text-center">Admin</span>
        </motion.div>

        <div className="divide-y divide-white/[0.04]">
          {modules.map((module, mIdx) => (
            <motion.div
              key={mIdx}
              className="grid grid-cols-[2fr_repeat(4,1fr)] px-4 py-3 items-center group"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + mIdx * 0.05 }}
            >
              <span className="text-[11px] text-[var(--text-primary)] font-normal pr-4 group-hover:text-white transition-colors">
                {module.name}
              </span>
              {module.roles.map((enabled, rIdx) => (
                <div key={rIdx} className="flex justify-center">
                  <MatrixToggle
                    enabled={enabled}
                    onChange={() => onToggle(mIdx, rIdx)}
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PermissionsMatrix;