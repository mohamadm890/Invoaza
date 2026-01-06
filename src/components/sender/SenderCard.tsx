"use client";

import React, { useState, useRef, useEffect } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import BottomSheet from "@/components/BottomSheetMobile"; // Mobile bottom sheet
import {Avatar} from "@/components/avator";
import { Building2 } from "lucide-react";
import { useMediaQuery } from "react-responsive";

interface SenderCardProps {
  senderData: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SenderCard({ senderData, onEdit, onDelete }: SenderCardProps) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });




  return (
    <div className="p-2 rounded-[16px] border border-gray-100 flex items-center justify-between relative">
      <div className="flex flex-row gap-4 items-center">
        <Avatar name={senderData.name} content={<Building2 />} size={36} />
        <div className="flex flex-col">
          <p className="text-[14px] text-gray-700">{senderData.name}</p>
          <p className="text-[13px] text-gray-400">{senderData.email}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="relative" ref={menuRef}>
      <button
  type="button"
  onClick={() => setOpen((prev) => !prev)}
  className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
>
  <Ellipsis size={18} />
</button>



{isMobile ? (
  // Mobile: BottomSheet
  open && (
    <BottomSheet
      open={open}
      onClose={() => setOpen(false)}
    >
       <button
        onClick={() => {
          setOpen(false);
          onEdit();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        onClick={() => {
          setOpen(false);
          onDelete();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </BottomSheet>
  )
) : (
  // Desktop: small dropdown next to card
  open && (
    <div className="absolute right-0 mt-2 w-32 rounded-[12px] bg-white border border-gray-100 shadow-md z-10">
      <button
        onClick={() => {
          setOpen(false);
          onEdit();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        onClick={() => {
          setOpen(false);
          onDelete();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  )
)}

      </div>
    </div>
  );
}
