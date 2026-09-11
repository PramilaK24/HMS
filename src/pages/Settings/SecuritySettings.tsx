import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toggle } from "../../components/Toggle/Toggle";
import { StatusBadge } from "../../components/Badge/StatusBadge";
import BackButton from "../../components/Button/BackButton";
import PermissionsMatrix from "../../components/SettingScreen/PermissionsMatrix";

const ActionButton = ({
  label,
  subtext,
  onClick,
}: {
  label: string;
  subtext?: string;
  onClick?: () => void;
}) => (
  <div className="flex flex-col items-center gap-0.5">
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(14,255,123,0.25)" }}
      whileTap={{ scale: 0.95 }}
      className="h-7 w-[90px] cursor-pointer rounded-full border border-[var(--text-highlight)] text-[9px] font-medium text-[var(--text-primary)] shadow-[0_0_8px_rgba(14,255,123,0.12)] transition-colors hover:bg-[var(--text-highlight)]/10"
    >
      {label}
    </motion.button>
    {subtext && (
      <span className="text-[7px] text-[var(--btn-toggle-disabled)]">{subtext}</span>
    )}
  </div>
);

const AccessPermissionsModules = [
  { name: "View Patients records", roles: [true, true, true, true] },
  { name: "Edit Patients records", roles: [true, false, false, false] },
  { name: "Generate patients bill", roles: [true, true, true, true] },
  { name: "Approve insurance claims", roles: [true, false, false, true] },
  { name: "Manage Appointments", roles: [true, true, false, true] },
  { name: "Manage Inventory and pharmacy", roles: [false, false, false, true] },
  {
    name: "Ambulance dispatch & Transport Logs",
    roles: [false, false, false, true],
  },
];

const SecuritySettings = () => {
  const [saveLogs, setSaveLogs] = useState(true);
  const [twoFA, setTwoFA] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [modules, setModules] = useState(AccessPermissionsModules);

  const togglePermission = (moduleIndex: number, roleIndex: number) =>
    setModules((current) =>
      current.map((module, index) =>
        index === moduleIndex
          ? { ...module, roles: module.roles.map((role, number) => number === roleIndex ? !role : role) }
          : module,
      ),
    );

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.08 } }),
  };

  return (
    <main className="min-h-full w-full bg-[#101211] p-3 font-sans sm:p-5 lg:p-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative isolate mx-auto min-h-full w-full max-w-7xl overflow-hidden rounded-md
          bg-[radial-gradient(circle_at_top,#052317_0%,#020604_42%,#050505_100%)]
          px-4 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]
          sm:px-7 sm:py-7 lg:px-5 lg:py-4"
      >
        <BackButton label="Back" />
        <motion.header
          className="mt-3 sm:mt-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <h1 className="text-sm font-semibold leading-none text-[var(--text-primary)] sm:text-base lg:text-lg">
            Security Settings
          </h1>
          <p className="mt-1.5 text-[10px] leading-none text-[var(--btn-toggle-disabled)] sm:text-xs">
            These settings are helps you keep your account secure
          </p>
        </motion.header>
        <section className="mt-6 divide-y divide-white/[0.07] sm:mt-12">
          <motion.div custom={0} variants={rowVariants} initial="hidden" animate="visible" className="flex items-center justify-between gap-4 pb-4 sm:pb-5">
            <div>
              <h2 className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                Save my activity logs
              </h2>
              <p className="mt-1.5 text-[10px] leading-snug text-[var(--text-primary)] sm:text-xs">
                You can save your all activity logs including unusual activity detected
              </p>
            </div>
            <Toggle size="md" enabled={saveLogs} onChange={() => setSaveLogs((c) => !c)} label="Save activity logs" />
          </motion.div>
          <motion.div custom={1} variants={rowVariants} initial="hidden" animate="visible" className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <div>
              <h2 className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                Change password
              </h2>
              <p className="mt-1.5 text-[10px] leading-snug text-[var(--text-primary)] sm:text-xs">
                set a unique password to protect your account
              </p>
            </div>
            <ActionButton label="Change Password" subtext="Last changed: mar 2, 2025" />
          </motion.div>
          <motion.div custom={2} variants={rowVariants} initial="hidden" animate="visible" className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <div className="max-w-[70%]">
              <div className="flex items-center gap-1">
                <h2 className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                  2 Factor Authentication
                </h2>
                <StatusBadge status={twoFA ? "enabled" : "disabled"} />
              </div>
              <p className="mt-1.5 text-[10px] leading-snug text-[var(--text-primary)] sm:text-xs">
                Secure your account with 2FA security. when it is activated you will need <br/> to enter not only your password, but also a special code using app. you  <br/> will receive this code by in mobile app.
              </p>
            </div>
            <ActionButton label={twoFA ? "Disable" : "Enable"} onClick={() => setTwoFA((c) => !c)} />
          </motion.div>
          <motion.div custom={3} variants={rowVariants} initial="hidden" animate="visible" className="flex items-center justify-between gap-4 pt-4 sm:pt-5">
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                  Turn on login alerts
                </h2>
                <StatusBadge status={loginAlerts ? "enabled" : "disabled"} />
              </div>
              <p className="mt-1.5 text-[10px] leading-snug text-[var(--text-primary)] sm:text-xs">
                Be notified if anyone logs in account from unknown or new device.
              </p>
            </div>
            <ActionButton label={loginAlerts ? "Disable" : "Enable"} onClick={() => setLoginAlerts((c) => !c)} />
          </motion.div>
        </section>
        <PermissionsMatrix modules={modules} onToggle={togglePermission} />
      </motion.div>
    </main>
  );
};

export default SecuritySettings;
