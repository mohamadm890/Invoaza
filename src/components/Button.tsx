'use client';
import React from "react";
import { Archive } from 'lucide-react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-[4px] w-full font-medium text-[14px] transition-all duration-200";

  const variantStyles =
    variant === "primary"
      ? "bg-[#F2F5FF] text-[#3668FB] hover:bg-[#3668FB] hover:text-white flex flex-row gap-2 items-center justify-center h-[44px]"
      : "bg-[#F5F5F5] text-[#262626] hover:bg-[#E9E9E9]";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
            <Archive size={16}/>

      {label}
    </button>
  );
};

export default Button;
