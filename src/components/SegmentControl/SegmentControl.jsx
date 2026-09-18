import { useState } from "react";

const SegmentControl = ({ options = [], defaultValue, value, onChange }) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue || options[0]?.value,
  );

  const activeValue = value ?? internalValue;

  const handleChange = (option) => {
    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);
  };

  return (
    <div
      role="tablist"
      aria-label="Staff role"
      className="flex w-full items-center gap-1 overflow-x-auto bg-[#050706] px-2 py-1"
    >
      {options.map((option) => {
        const isActive = activeValue === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleChange(option)}
            className={`
              relative h-6 flex-1 rounded-[3px] px-6
              text-[12px] font-normal leading-5 whitespace-nowrap
              transition-colors duration-200 rounded-lg
              ${
                isActive
                  ? "bg-[var(--btn-bg-solid)]/60 text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(89,255,164,0.04)] after:[background-image:var(--btn-bg-gradient)]"
                  : "text-[#b8c0bb] after:bg-gradient-to-r after:from-transparent after:via-[#0a4328] after:to-transparent hover:bg-[#071b11] hover:text-[#e7f7ed]"
              }
              after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:content-['']
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentControl;
