import React from "react";

interface ToggleRootProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  children: React.ReactNode;
  size?: "sm" | "md";
}

interface ToggleTrackProps {
  enabled: boolean;
  children: React.ReactNode;
}

interface ToggleThumbProps {
  enabled: boolean;
  size?: "sm" | "md";
}

const ToggleRoot = ({
  enabled,
  onChange,
  label,
  children,
  size = "sm",
}: ToggleRootProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={enabled}
      onClick={onChange}
      className={`relative inline-flex shrink-0 items-center rounded-full border transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 ${
        size === "md" ? "h-6 w-11" : "h-[15px] w-[27px]"
      } ${
        enabled
          ? "border-emerald-500 bg-emerald-500/25"
          : "border-emerald-700 bg-[#101513]"
      }`}
    >
      {children}
    </button>
  );
};

const ToggleTrack = ({ enabled, children }: ToggleTrackProps) => {
  return (
    <span className="absolute inset-0 flex items-center">
      {children}
    </span>
  );
};

const ToggleThumb = ({ enabled, size = "sm" }: ToggleThumbProps) => {
  return (
    <span
      className={`rounded-full transition-transform duration-200 ${
        size === "md" ? "h-5 w-5" : "h-[11px] w-[11px]"
      } ${
        enabled
          ? size === "md"
            ? "translate-x-5 bg-emerald-400 shadow-[0_0_7px_#00ff88]"
            : "translate-x-[13px] bg-emerald-400 shadow-[0_0_7px_#00ff88]"
          : "translate-x-[2px] bg-zinc-400"
      }`}
    />
  );
};

export const Toggle = Object.assign(ToggleRoot, {
  Track: ToggleTrack,
  Thumb: ToggleThumb,
});
