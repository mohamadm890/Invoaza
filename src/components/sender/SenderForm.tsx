"use client";

import React from "react";
import InputCustom from "@/components/InputCustom";
import { ChevronDown } from "lucide-react";

type SenderFormProps = {
  register: any;
  onSave?: () => void;
  errors?: any;
  showOptional: boolean;
  setShowOptional: (val: boolean) => void;
};

export default function SenderForm({
  register,
  errors,
  showOptional,
  setShowOptional,
  onSave,
}: SenderFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputCustom
        label="Business Name *"
        {...register("sender.businessName", { required: true })}
        error={errors?.sender?.businessName?.message}
      />

      <InputCustom
        label="Email"
        type="email"
        {...register("sender.email", { required: true })}
        error={errors?.sender?.email?.message}
      />

      {showOptional ? (
        <>
          <InputCustom
            label="Address"
            {...register("sender.address")}
            error={errors?.sender?.address?.message}
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600">Currency</label>
            <div className="relative">
              <select
                {...register("sender.currency")}
                className="mt-1 w-full h-[48px] rounded-md border border-gray-100 px-3 pr-10 bg-[#FAFAFA]"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="text-blue-500 text-[13px] md:col-span-2 text-left"
          onClick={() => setShowOptional(true)}
        >
          + Add Additional detail
        </button>
      )}

      <div className="md:col-span-2 flex justify-end mt-2">
        <button
          type="button"
          onClick={onSave}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Save Sender
        </button>
      </div>
    </div>
  );
}
