"use client";

import React from "react";

interface HeaderWithCreateActionProps {
  title: string;
  onCreate: () => void;
  actionName: string;
}

export default function HeaderWithCreateAction({
  title,
  onCreate,
  actionName,
}: HeaderWithCreateActionProps) {

  return (
    <div className="w-full border-b border-[#EEEEEE] p-2 px-4 flex justify-between items-center">
      <h1 className="tracking-tight md:text-[24px] sm:text-3xl font-[500]">
        {title}
      </h1>

      {/* Desktop button */}
      {actionName && (
  <button
    onClick={onCreate}
    className="
      hidden md:inline-block
      w-[140px] h-[44px]
      rounded-[12px]
      bg-[#EAF4FF]
      text-[#3668FB]
      text-[14px]
      font-medium
      hover:bg-[#3668FB]
      hover:text-white
      focus:outline-none
      focus:ring-2
      focus:ring-[#007AFF]/50
      transition-colors
    "
  >
    {actionName}
  </button>
)}


      {/* Mobile floating button */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75"></span>

        <button
          onClick={onCreate}
          className="
            relative
            w-12 h-12
            rounded-full
            bg-[#4372FB]
            text-white text-3xl
            flex items-center justify-center
            shadow-xl
          "
          aria-label="Create Invoice"
        >
          +
        </button>
      </div>

      
    </div>
  );
}
