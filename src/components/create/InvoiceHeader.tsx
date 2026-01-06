"use client";

import { Download } from "lucide-react";
import { useFormContext } from "react-hook-form";

type InvoiceHeaderProps = {
  onDownload: () => void;
};

export default function InvoiceHeader({ onDownload }: InvoiceHeaderProps) {
  const { register, watch} = useFormContext(); // useFormContext provides register, setValue, watch, errors, etc.
  const invoiceId = watch("invoiceId");


 


  



  return (
    <div className="relative rounded-[16px] sticky h-[60px] top-0 z-50 bg-white flex items-center justify-between p-2 border-b border-gray-100">
      
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-5 ml-2 sm:h-6 md:h-7 lg:h-8 w-auto select-none"
        />
      </div>

      {/* CENTER — Invoice ID */}
      <div className="absolute left-1/2 -translate-x-1/2 w-40 sm:w-48 md:w-56">
        <div className="relative">
          <input
            type="text"
            defaultValue={invoiceId}
            {...register("invoiceId")}
            className="
              font-medium text-black text-sm w-full pr-6 
              border-b border-transparent 
              hover:border-gray-300 
              focus:border-blue-500 
              focus:outline-none 
              text-center 
              transition
            "
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center">
        <button
          onClick={onDownload}
          className="flex bg-[#3668FB] p-3 rounded-[12px] text-white items-center justify-center sm:justify-start md:space-x-2 hover:bg-[#2752c7] transition text-sm font-medium"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Download Invoice</span>
        </button>
      </div>
    </div>
  );
}
