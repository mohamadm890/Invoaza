"use client";

import React, { useState, useEffect } from "react";
import InputCustom from "@/components/InputCustom";
import { ChevronDown } from "lucide-react";

type BusinessSettings = {
  businessName: string;
  email?: string;
  address?: string;
  currency: string;
};

interface Props {
  data: BusinessSettings | null;
  loading: boolean;
  error: string | null;
  onSave: (item: BusinessSettings) => Promise<void>;
}

export default function BusinessInfo({ data, loading, error, onSave }: Props) {
  const [form, setForm] = useState<BusinessSettings>({
    businessName: "",
    email: "",
    address: "",
    currency: "USD",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (field: keyof BusinessSettings, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(form);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-[16px] p-4 space-y-5">
      {error && <p className="text-red-500">{error}</p>}

      <InputCustom
        id="businessName"
        label="Business Name *"
        value={form.businessName}
        onChange={(e) => handleChange("businessName", e.target.value)}
      />

      <InputCustom
       id="businessEmail"
        label="Email (optional)"
        type="email"
        value={form.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <InputCustom
       id="Address"
        label="Address (optional)"
        value={form.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
      />

      <div className="form-group relative w-full md:col-span-2">
        <label htmlFor="currency" className="block text-sm font-[400] text-gray-600">
          Currency
        </label>
        <div className="relative">
          <select
            id="currency"
            className="mt-1 bg-[#FAFAFA] block w-full rounded-md border border-gray-100 px-3 pr-10 sm:text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 h-[48px] appearance-none"
            value={form.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <button
        disabled={isSaving || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSave}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
