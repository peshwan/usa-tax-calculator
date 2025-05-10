import React from 'react';

interface InputFieldProps {
  label: string;
  type: 'text' | 'number' | 'checkbox';
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  placeholder?: string;
  tooltip?: string;
  prefix?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  min,
  max,
  step,
  name,
  placeholder,
  tooltip,
  prefix,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(type === 'number' ? Number(newValue) : newValue);
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
      <div className={`${prefix ? 'relative' : ''}`}>
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="text-gray-500 text-lg">{prefix}</span>
          </div>
        )}
        {type === 'checkbox' ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value as boolean}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-base text-gray-600">{placeholder}</span>
          </div>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={type === 'number' && Number(value) === 0 ? '' : (value as string | number)}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            className={`block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base py-3 ${
              prefix ? 'pl-10 pr-4' : 'px-4'
            } bg-white/90 backdrop-blur-sm hover:border-gray-400 transition-colors`}
          />
        )}
      </div>
    </div>
  );
};