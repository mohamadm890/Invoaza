import React, { forwardRef } from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  type?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, type = 'text', className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && (
          <label className="mb-1 text-[12px] font-normal text-[#262626]">{label}</label>
        )}

        {type === 'textarea' ? (
          <textarea
            {...props}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className="w-full p-2 border font-normal bg-[#FBFBFB] border-[#F1F1F1] rounded-[8px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-[12px] resize-none"
          />
        ) : (
          <input
            {...props}
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            className="w-full p-2 border h-[44px] font-normal bg-[#FBFBFB] border-[#F1F1F1] rounded-[8px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-[12px]"
          />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
