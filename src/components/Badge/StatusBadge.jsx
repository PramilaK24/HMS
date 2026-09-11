export const StatusBadge = ({ status }) => {
  const isEnabled = status === "enabled";

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-3 py-1 rounded-sm
        text-xs font-semibold leading-none
        text-[var(--text-primary)]
        ${
          isEnabled
            ? "bg-[var(--text-highlight)]"
            : "bg-zinc-700"
        }
      `}
    >
      {isEnabled ? "Enabled" : "Disabled"}
    </span>
  );
};