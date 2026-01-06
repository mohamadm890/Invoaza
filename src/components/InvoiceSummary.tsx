import React from "react";

interface InvoiceSummaryProps {
  subTotal: string | number;
  total: string | number;
}

export default function InvoiceSummary({
  subTotal,
  total,
}: InvoiceSummaryProps) {
  return (
    <div className="w-full  p-4 ">
      {/* Subtotal */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[12px]  text-[#7E7E7E]">SubTotal</span>
        <span className="text-[12px]  text-[#7E7E7E]">${subTotal}</span>
      </div>


      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-[16px] font-medium text-gray-600">Total</span>
        <span className="text-[16px] font-medium text-gray-900">${total}</span>
      </div>
    </div>
  );
}
