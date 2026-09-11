import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const ClinicalServiceDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) =>
    typeof opt === "object" ? opt.value === value : opt === value
  );

  const displayValue = selectedOption
    ? typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption
    : "";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block mb-2 text-sm text-gray-300">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-8 px-3 pr-4 rounded-sm bg-bg-dark border border-[#3C3C3C] shadow-[0px_0px_4px_0px_#0EFF7B] text-white text-[14px] outline-none cursor-pointer flex items-center justify-between"
      >
        <span
          className={`truncate ${
            displayValue ? "text-white" : "text-white"
          }`}
        >
          {displayValue || placeholder}
        </span>

        <Icon
          icon="tabler:chevron-down"
          width="20"
          height="20"
          className={`text-text-highlight transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#111] border border-gray-700 rounded-md shadow-xl overflow-hidden">
          <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {options.length > 0 ? (
              options.map((opt, idx) => {
                const optValue =
                  typeof opt === "object" ? opt.value : opt;

                const optLabel =
                  typeof opt === "object" ? opt.label : opt;

                const isSelected = value === optValue;

                return (
                  <li
                    key={idx}
                    onClick={() => {
                      onChange?.(optValue);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-[14px] transition-colors ${
                      isSelected
                        ? "bg-[#12321F] text-text-highlight"
                        : "text-gray-300 hover:bg-[#1A1A1A] hover:text-white"
                    }`}
                  >
                    {optLabel}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-3 text-sm text-gray-500 text-center">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClinicalServiceDropdown;