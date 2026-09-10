import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const Dropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select an option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => 
    typeof opt === 'object' ? opt.value === value : opt === value
  );
  
  const displayValue = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) 
    : '';

  return (
    <div className={"relative " + className} ref={dropdownRef}>
      {label && (
        <label className="block text-sm text-gray-300 mb-2">{label}</label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={"w-full flex items-center justify-between bg-transparent border rounded-md p-2.5 transition-colors focus:outline-none " + (isOpen ? 'border-text-accent ' : 'border-gray-700 hover:border-gray-500 ') + (!displayValue ? 'text-gray-500' : 'text-gray-300')}
      >
        <span className="truncate">
          {displayValue || placeholder}
        </span>
        <span className={"text-text-accent transition-transform duration-200 " + (isOpen ? 'rotate-180' : '')}>
          <Icon icon="lucide:chevron-down" className="w-4 h-4" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#111] border border-gray-700 rounded-md shadow-xl overflow-hidden">
          <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {options.length > 0 ? (
              options.map((opt, idx) => {
                const optValue = typeof opt === 'object' ? opt.value : opt;
                const optLabel = typeof opt === 'object' ? opt.label : opt;
                const isSelected = value === optValue;

                return (
                  <li
                    key={idx}
                    onClick={() => {
                      if (onChange) onChange(optValue);
                      setIsOpen(false);
                    }}
                    className={"px-4 py-2 cursor-pointer text-sm transition-colors " + (isSelected ? 'bg-[#1a1a1a] text-text-highlight' : 'text-gray-300 hover:bg-gray-800 hover:text-white')}
                  >
                    {optLabel}
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
