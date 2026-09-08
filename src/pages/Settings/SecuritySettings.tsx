import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Toggle } from "../../components/Toggle/Toggle";
import { StatusBadge } from "../../components/Badge/StatusBadge";
import BackButton from "../../components/Button/BackButton";

const ActionButton = ({
  label,
  subtext,
}: {
  label: string;
  subtext?: string;
}) => (
  <div className="flex min-w-[85px] flex-col items-center gap-0.5">
    <button
      type="button"
      className="w-full rounded-full border border-emerald-500/70 py-1 text-[8px] font-medium text-zinc-100 shadow-[0_0_8px_rgba(0,255,136,0.12)] transition hover:bg-emerald-500/10"
    >
      {label}
    </button>
    {subtext && <span className="text-[7px] text-zinc-500">{subtext}</span>}
  </div>
);

const initialModules = [
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
  const navigate = useNavigate();
  const [saveLogs, setSaveLogs] = useState(true);
  const [modules, setModules] = useState(initialModules);
  const togglePermission = (moduleIndex: number, roleIndex: number) =>
    setModules((current) =>
      current.map((module, index) =>
        index === moduleIndex
          ? {
              ...module,
              roles: module.roles.map((role, number) =>
                number === roleIndex ? !role : role,
              ),
            }
          : module,
      ),
    );

  return (
    <main className="min-h-full w-full bg-[#101211] p-3 font-sans text-zinc-200 sm:p-5 lg:p-8">
      <div className="mx-auto min-h-full w-full max-w-7xl rounded-md bg-[radial-gradient(ellipse_at_top,#052317_0%,#020604_48%,#050505_100%)] px-4 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:px-7 sm:py-7 lg:px-10 lg:py-9">
       <BackButton label="Back" />
        <header className="mt-8 sm:mt-2">
          <h1 className="text-sm font-semibold leading-none text-zinc-100 sm:text-base lg:text-lg">
            Security Settings
          </h1>
          <p className="mt-1.5 text-[10px] leading-none text-zinc-500 sm:text-xs">
            These settings are helps you keep your account secure
          </p>
        </header>
        <section className="mt-6 divide-y divide-white/[0.07] sm:mt-8">
          <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5">
            <div>
              <h2 className="text-xs font-medium text-zinc-100 sm:text-sm">
                Save my activity logs
              </h2>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-400 sm:text-xs">
                You can save your all activity logs including unusual activity
                detected
              </p>
            </div>
            <Toggle
              size="md"
              enabled={saveLogs}
              onChange={() => setSaveLogs((current) => !current)}
              label="Save activity logs"
            >
              <Toggle.Track enabled={saveLogs}>
                <Toggle.Thumb enabled={saveLogs} size="md" />
              </Toggle.Track>
            </Toggle>
          </div>
          <div className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <div>
              <h2 className="text-xs font-medium text-zinc-100 sm:text-sm">
                Change password
              </h2>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-400 sm:text-xs">
                set a unique password to protect your account
              </p>
            </div>
            <ActionButton
              label="Change Password"
              subtext="Last changed: mar 2, 2025"
            />
          </div>
          <div className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <div className="max-w-[70%]">
              <div className="flex items-center gap-1">
                <h2 className="text-xs font-medium text-zinc-100 sm:text-sm">
                  2 Factor Authentication
                </h2>
                <StatusBadge status="enabled" />
              </div>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-400 sm:text-xs">
                Secure your account with 2FA security. when it is activated you
                will need to enter not only your password, but also a special
                code using app. you will receive this code by in mobile app.
              </p>
            </div>
            <ActionButton label="Disable" />
          </div>
          <div className="flex items-center justify-between gap-4 pt-4 sm:pt-5">
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-xs font-medium text-zinc-100 sm:text-sm">
                  Turn on login alerts
                </h2>
                <StatusBadge status="enabled" />
              </div>
              <p className="mt-1.5 text-[10px] leading-snug text-zinc-400 sm:text-xs">
                Be notified if anyone logs in account from unknown or new
                device.
              </p>
            </div>
            <ActionButton label="Disable" />
          </div>
        </section>
        <section className="mt-10 sm:mt-16">
          <h2 className="text-sm font-semibold text-zinc-100 sm:text-base">
            Access &amp; Permissions
          </h2>
          <p className="mt-1.5 text-[10px] text-zinc-500 sm:text-xs">
            Manage role-based access with permission controls
          </p>




          
          <div className="mt-4 overflow-x-auto rounded-sm">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-[2.1fr_repeat(4,1fr)] bg-emerald-950/90 px-3 py-2 text-center text-[10px] font-medium text-emerald-400 sm:text-xs">
                <span>Modules</span>
                <span>Receptionist</span>
                <span>Doctor</span>
                <span>Billing staff</span>
                <span>Admin</span>
              </div>
              <div className="space-y-2 px-3 py-3 sm:space-y-3 sm:py-4">
                {modules.map((module, moduleIndex) => (
                  <div
                    key={module.name}
                    className="grid grid-cols-[2.1fr_repeat(4,1fr)] items-center text-center"
                  >
                    <span className="pr-3 text-left text-[10px] leading-snug text-zinc-300 sm:text-xs">
                      {module.name}
                    </span>
                    {module.roles.map((enabled, roleIndex) => (
                      <div key={roleIndex} className="flex justify-center">
                        <Toggle
                          size="sm"
                          enabled={enabled}
                          onChange={() =>
                            togglePermission(moduleIndex, roleIndex)
                          }
                          label={`${module.name}, role ${roleIndex + 1}`}
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
          </div>
        </section>
      </div>
    </main>
  );
};

export default SecuritySettings;
