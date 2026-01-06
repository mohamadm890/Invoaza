"use client";

import React, { useState, useEffect } from "react";
import SenderForm from "./SenderForm";
import SenderCard from "./SenderCard";
import BottomSheet from "@/components/BottomSheetMobile"; // Mobile bottom sheet
import { useFormContext } from "react-hook-form";
import { useSetting } from "@/hooks/useSetting";

type Sender = {
  businessName: string;
  email: string;
  address: string;
  currency: string;
};

// Define your full form type
type FormValues = {
  sender: Sender;
 
};

export default function SenderBasicsSection() {
  // Fetch saved item from settings
  const { item } = useSetting() as { item?: Sender };;

  // React Hook Form context
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  // Local state
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [senderData, setSenderData] = useState<Sender | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  const senderValues = watch("sender");

  // Helper to check if sender has any real data
  const hasRealSenderData = (data: Partial<Sender> | null) => {
    return Object.values(data || {}).some(
      (value) => typeof value === "string" && value.trim() !== ""
    );
  };

  // Map settings item → form & state
  useEffect(() => {
    if (!item) return;

    setValue("sender.businessName", item.businessName || "");
    setValue("sender.email", item.email || "");
    setValue("sender.address", item.address || "");
    setValue("sender.currency", item.currency || "");

    setSenderData({
      businessName: item.businessName,
      email: item.email,
      address: item.address,
      currency: item.currency,
    });

    setSaved(true);
    setShowForm(false);
  }, [item, setValue]);

  // Detect mobile layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Watch for manual form changes
  useEffect(() => {
    if (hasRealSenderData(senderValues)) {
      setSenderData(senderValues);
      setSaved(true);
      setShowForm(false);
    }
  }, [senderValues]);

  // Save form manually
  const handleSave = () => {
    setSenderData(senderValues);
    setSaved(true);
    setShowForm(false);
    setShowOptional(false);
  };

  // Clear sender
  const onClear = () => {
    setSenderData(null);
    setSaved(false);
    setShowForm(true);
  };

  // Form component
  const formContent = (
    <SenderForm
      register={register}
      showOptional={showOptional}
      setShowOptional={setShowOptional}
      onSave={handleSave}
      errors={errors}
    />
  );

  return (
    <div className="space-y-4 p-4 md:p-8 rounded-[16px] bg-white">
      <h2 className="text-[#494949] mb-2 text-lg md:text-xl lg:text-2xl font-[400]">
        Sender Info
      </h2>
      <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-8">
        Fill in the required information about the sender.
      </p>

      {!showForm && !saved && (
        <button
          type="button"
          className="text-blue-500 text-[13px] px-2 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          + Add Sender
        </button>
      )}

      {/* Mobile Bottom Sheet */}
      {isMobile && showForm && (
        <BottomSheet
          open={showForm}
          onClose={() => setShowForm(false)}
        >
          {formContent}
        </BottomSheet>
      )}

      {/* Desktop Inline Form */}
      {!isMobile && showForm && <div className="mt-4">{formContent}</div>}

      {/* Saved Sender Card */}
      {saved && senderData && (
      <SenderCard
      senderData={senderData}
      onEdit={() => {
        setShowForm(true);  // open BottomSheet on mobile
        setShowOptional(false); // optional: hide extra fields initially
      }}
      onDelete={() => {
        setSenderData(null);
        setSaved(false);
      }}
    />

    
      )}





    </div>
  );
}
