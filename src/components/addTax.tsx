"use client";
import { useState, useEffect } from "react";
import InputCustom from "./InputCustom";
import { ChevronDown, X } from "lucide-react";

interface TaxModalProps {
  isOpen: boolean;
  onClose: () => void;
  register: any;
  watch: any;
  onSave: (tax: { value: number; type: "Percentage" | "Fixed" }) => void;
}

export default function TaxModal({
  isOpen: propIsOpen,
  onClose,
  register,
  watch,
  onSave,
}: TaxModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Sync modal open state
  useEffect(() => {
    setIsOpen(propIsOpen);
  }, [propIsOpen]);

  const tax = watch("tax");

  
  
  

  const handleSave = () => {
    if (!tax.value) return alert("Please enter a tax value!");
    onSave(tax);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-[405px] max-w-[95%] rounded-[24px] shadow-lg overflow-auto max-h-[80vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-[16px] font-semibold">Add Tax</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 p-4">

          {/* Type Selector */}
          <div className="relative w-full">
            <select
              className="w-full p-2 bg-gray-50 appearance-none pr-10 border border-gray-100 rounded-md"
              {...register("tax.type", { required: true })}

            >
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </select>

            <ChevronDown 
              size={20} 
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" 
            />
          </div>

          {/* Value Input */}
          <InputCustom
            type="number"
            {...register("tax.value", { required: true, min: 0 })}
            label="Tax Value *"
            placeholder="10"

          />

          {/* Footer */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-[24px] hover:bg-blue-700 transition"
            >
              Save Tax
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
