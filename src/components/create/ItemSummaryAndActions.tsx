"use client";
import { Plus } from "lucide-react";
import { useInvoiceCalculator } from "@/hooks/useInvoiceCalculator";


export const InvoiceActionsPanel = ({
    tax,
    handleAddRow,
    setModalType,
    watch,
  }: any) => {

    const items = watch("items") || [];
    const currency = watch("sender.currency");

    console.log("currency", currency)

    const formatCurrency = (amount: any) => {
      if (!currency) return amount;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);
    };
    
    const { subtotal, taxDisplay, total } = useInvoiceCalculator(items, tax ?? 0);
    
    console.log("item", items);
  console.log("this ", subtotal);
  console.log("this ", total);

    return (
      <div className="flex flex-col md:flex-row gap-3 mt-4">
  
        <div className="md:hidden mt-8 border-t border-b p-2 border-dashed border-gray-300 flex flex-col gap-2">
          <div className="mt-2">
            <div className="w-full flex justify-between mb-2">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-gray-600">{formatCurrency(subtotal)}</span>
            </div>
  
            {tax?.value > 0 && (
              <div className="w-full flex justify-between mb-2">
                <span className="text-gray-400">Tax</span>
                <span className="text-gray-600">{taxDisplay}</span>
              </div>
            )}
  
            <div className="w-full flex justify-between mb-2">
              <span className="text-gray-600">Total</span>
              <span className="text-gray-800">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
  
        {/* Add Item Button */}
        <button
          onClick={handleAddRow}
          className="flex items-center justify-center text-[14px] gap-2 w-full md:w-[150px] px-4 py-2 rounded-[12px] text-[#3668FB] hover:bg-[#E9F0FF]"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
  
        {/* Add Tax Button */}
        <button
          onClick={() => setModalType("tax")}
          className="flex items-center justify-center gap-1 w-full md:w-[150px] px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
        >
          <Plus className="w-4 h-4" />
          Add Tax
        </button>
  
      </div>
    );
  };
  