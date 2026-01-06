'use client';
import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Input from './Input';

interface InvoiceCardSectionProps {
  title: string;
  children: ReactNode;
  headerColor?: string; 
  removeTopRadius?: boolean; 
  openColor?: string;
  className?: string; 
}

const InvoiceCardSection: React.FC<InvoiceCardSectionProps> = ({
  title,
  children,
  headerColor = "white",
  removeTopRadius = false,
  openColor,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-2">
      {/* Header */}
      <div
        className={`w-full h-[50px] flex items-center justify-between px-4 cursor-pointer ${
          isOpen ? "rounded-t-[12px] rounded-b-none" : "rounded-[12px]"
        }`}
        style={{
          backgroundColor: isOpen ? openColor : headerColor,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[14px] text-[#262626]">{title}</p>
        {isOpen ? (
          <ChevronUp size={14} color="#8A8A8A" />
        ) : (
          <ChevronDown size={14} color="#8A8A8A" />
        )}
      </div>

      {/* Content appears below header */}
      {isOpen && (
        <div className={`bg-white ${className} p-[16px] rounded-b-[12px] w-full`}>
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceCardSection;
