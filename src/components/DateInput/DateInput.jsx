import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon } from '@iconify/react';

const DateInput = ({
  label,
  value,
  onChange,
  className = ""
}) => {
  const parsedDate = value ? new Date(value) : null;
  
  const handleChange = (date) => {
    if (onChange) {
      if (date) {
        // preserve local timezone date selection
        const offset = date.getTimezoneOffset()
        const localDate = new Date(date.getTime() - (offset*60*1000))
        onChange(localDate.toISOString().split('T')[0]);
      } else {
        onChange('');
      }
    }
  };

  return (
    <div className={"relative " + className}>
      {label && (
        <label className="block text-sm text-gray-300 mb-2">{label}</label>
      )}
      
      <div className="relative flex items-center">
        <DatePicker
          selected={parsedDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          className={"w-full bg-transparent border border-gray-700 rounded-md p-2.5 transition-colors focus:outline-none focus:border-text-accent custom-datepicker-input " + (!value ? 'text-gray-500' : 'text-gray-300')}
        />
        <span className="absolute right-3 text-text-accent pointer-events-none">
          <Icon icon="lucide:calendar" className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};

export default DateInput;
