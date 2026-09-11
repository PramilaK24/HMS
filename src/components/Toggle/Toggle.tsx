import React from "react";
import { motion } from "framer-motion";

interface ToggleRootProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  size?: "sm" | "md";
}

interface ToggleThumbProps {
  enabled: boolean;
  size?: "sm" | "md";
}

const ToggleRoot = ({
  enabled,
  onChange,
  label,
  size = "md",
}: ToggleRootProps) => {
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-pressed={enabled}
      onClick={onChange}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`
        relative inline-flex shrink-0 cursor-pointer items-center rounded-full
        border
        focus:outline-none
        focus-visible:ring-1 focus-visible:ring-[var(--text-highlight)]
        ${
          size === "md"
            ? "h-12 w-[104px]"
            : "h-7 w-[58px]"
        }
        ${
          enabled
            ? `
              border-[var(--text-highlight)]
              bg-[var(--bg-dark)]
              shadow-[0_0_6px_rgba(14,255,123,0.8),inset_0_0_8px_rgba(14,255,123,0.12)]
            `
            : `
              border-[var(--text-accent)]
              bg-[var(--bg-dark)]
            `
        }
      `}
    >
      <ToggleThumb enabled={enabled} size={size} />
    </motion.button>
  );
};

const ToggleThumb = ({
  enabled,
  size = "md",
}: ToggleThumbProps) => {
  return (
    <motion.span
      className={`
        absolute rounded-full
        ${
          size === "md"
            ? "h-7 w-7"
            : "h-4 w-4"
        }
        ${
          enabled
            ? `
              bg-[var(--text-highlight)]
              shadow-[0_0_10px_var(--text-highlight)]
            `
            : "bg-[var(--btn-toggle-disabled)]"
        }
      `}
      animate={{
        x:
          size === "md"
            ? enabled
              ? 64
              : 12
            : enabled
              ? 35
              : 6,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.6,
      }}
    />
  );
};

export const Toggle = ToggleRoot;