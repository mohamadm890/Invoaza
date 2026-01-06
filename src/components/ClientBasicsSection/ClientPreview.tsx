"use client";

import React, { useState } from "react";
import { User, Ellipsis, Edit2, Trash2 } from "lucide-react";
import { Avatar } from "@/components/avator";
import BottomSheet from "@/components/BottomSheetMobile"; // Mobile bottom sheet
import { useMediaQuery } from "react-responsive";

type ActionProps = {
  client: any;
  onEdit?: (client: any) => void; // expects client argument
  onDelete?: (client: any) => void; 
};


export default function ClientPreview({ client, onEdit, onDelete }: ActionProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 500 });


  return (
    <div className="relative mt-3 w-full p-3 rounded-[16px] border border-gray-100 flex items-center justify-between">
      {/* Client Info */}
      <div className="flex items-center gap-3">
        <Avatar name={client.name} size={36} content={<User size={20} />} />
        <div className="flex flex-col items-start">
          <p className="font-[400] text-gray-600 text-sm">{client.name}</p>
          <p className="text-gray-500 text-xs">{client.email || "No email"}</p>
        </div>
      </div>

      {/* 3-dot menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
          >
          <Ellipsis size={16} />
        </button>

        {menuOpen && (
          isMobile ? (
            <BottomSheet
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.(client);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 size={14} />
                Edit
              </button>

              <button
                onClick={() => {
                  onDelete?.(client);
                  setMenuOpen(false);

                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </BottomSheet>
          ) : (
            <div className="absolute right-0 mt-2 w-32 rounded-[12px] bg-white border border-gray-100 shadow-md z-10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.(client);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 size={14} />
                Edit
              </button>

              <button
                onClick={() => {
                  console.log("trigg buttton ")
                  onDelete?.(client);
                  setMenuOpen(false);

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
