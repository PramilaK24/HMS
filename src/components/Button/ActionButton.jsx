import { motion } from "framer-motion";

const ActionButton = ({ label, subtext, onClick }) => (
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

export default ActionButton;
