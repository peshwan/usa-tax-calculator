import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  tooltip?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  tooltip,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-base font-medium text-gray-700 mb-2" htmlFor={name}>
        {label}
        {tooltip && (
          <span className="ml-2 group relative">
            <span className="cursor-help text-gray-400 hover:text-gray-600">ⓘ</span>
            <span className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg -top-1 left-6">
              {tooltip}
            </span>
          </span>
        )}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-3 px-4 bg-white/90 backdrop-blur-sm hover:border-gray-400 transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};