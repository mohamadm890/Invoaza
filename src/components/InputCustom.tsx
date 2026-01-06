import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputCustomProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  id,
  error,
  className,
  multiline = false,
  rows = 4,
  ...props
}) => {
  return (
    <div className={`${className || ''}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[0.875rem] sm:text-[0.9rem] md:text-[1rem] font-[100] text-[#4B5563] mb-1"
        >
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
        id={id}
        rows={rows}
        className={`mt-1 bg-[#FAFAFA] block w-full px-3 py-2 border-[#EBEBEB] rounded-[12px] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-[0.9rem] md:text-[1rem] lg:min-h-[120px] ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      
      ) : (
        <input
          id={id}
          className={`mt-1 border-1 border-gray-100 bg-[#FAFAFA] block w-full px-3 py-2 h-[48px] border-[#EBEBEB] rounded-[8px] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-[0.9rem] md:text-[1rem] ${
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
          }`}
          {...props}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputCustom;
