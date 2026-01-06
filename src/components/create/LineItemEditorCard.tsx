"use client";
import React from "react";
import InputCustom from "@/components/InputCustom";
import { useFormContext } from "react-hook-form";

interface LineItemEditorCardProps {
  item: {
    description?: string;
    quantity?: number;
    price?: number;
  };
  index: number;
  register: any; // your react-hook-form register
  error?: {
    description?: string;
    quantity?: string;
    price?: string;
  };
  setActiveRow: (value: number | null) => void;
}

export const LineItemEditorCard: React.FC<LineItemEditorCardProps> = ({
  item,
  index,
  register,
  error,
  setActiveRow,
}) => {

  console.log("error", error);
  
  const { trigger, getValues } = useFormContext();
  const handleSave = async () => {
    const isValid = await trigger([
      `items.${index}.description`,
      `items.${index}.quantity`,
      `items.${index}.price`,
    ]);
  
    if (!isValid) return;
  
    const values = getValues(`items.${index}`);
  
    // safety guard: don't count empty rows
    if (!values.description || values.price <= 0) return;
  
    // commit row → trigger recalculation
    setActiveRow(null);
  };
  
      
  return (
    <div className="p-4 border border-gray-50 rounded mt-2 bg-white">
      <div className="mt-4 flex flex-col md:flex-row gap-4 w-full">
        {/* Description */}
        <div className="flex-1">
          <InputCustom
            label="Description"
            type="text"
            defaultValue={item?.description?.trim()}
            {...register(`items.${index}.description`, { required: true })}
            error={error?.description}
          />
        </div>

        {/* Quantity */}
        <div className="w-full md:w-24">
          <InputCustom
            label="Quantity"
            type="number"
            defaultValue={item?.quantity || 1}
            {...register(`items.${index}.quantity`, {
              required: true,
              min: 1,
            })}
            error={error?.quantity}
          />
        </div>

        {/* Price */}
        <div className="w-full md:w-32">
          <InputCustom
            label="Price"
            type="number"
            defaultValue={item?.price || 0}
            {...register(`items.${index}.price`, {
              valueAsNumber: true,
            })}
            error={error?.price}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-8">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 text-[#3668FB] text-[14px] rounded-[12px] border border-[#3668FB] hover:bg-[#F0F4FF]"
          onClick={() => setActiveRow(null)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-[#3668FB] text-white rounded-[12px] text-[14px] hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
