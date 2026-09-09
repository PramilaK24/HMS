interface StatusBadgeProps {
  status: "enabled" | "disabled";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isEnabled = status === "enabled";

  return (
    <span
      className={`inline-flex items-center rounded-sm px-1 py-px text-[6px] font-semibold leading-none ${
        isEnabled
          ? "bg-emerald-500 text-[#042514]"
          : "bg-zinc-600 text-zinc-200"
      }`}
    >
      {isEnabled ? "Enabled" : "Disabled"}
    </span>
  );
};