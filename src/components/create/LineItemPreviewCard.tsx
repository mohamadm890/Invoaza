"use client";

import React, { useState, useRef, useEffect } from "react";
import { Edit2, Trash2, Box, Ellipsis } from "lucide-react";

export type LineItem = {
  description: string;
  quantity: number;
  price: number;
  total?: number;
};

type LineItemPreviewCardProps = {
  item: LineItem;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export const LineItemPreviewCard = ({
  item,
  index,
  onEdit,
  onDelete,
}: LineItemPreviewCardProps) => {
  if (!item?.description) return null;

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

 

  return (
    <div className="px-2 py-2 flex justify-between items-center border border-gray-50 rounded relative">
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative bg-blue-50 p-2 rounded-[12px] shrink-0">
          <Box className="w-5 h-5 text-[#3668FB]" />
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-[12px] text-[#3668FB]">
            ×{item.quantity || 0}
          </span>
        </div>

        <h3 className="text-[14px] text-gray-800 truncate max-w-[180px]">
          {item.description}
        </h3>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <h3 className="text-[14px] text-gray-800">
          ${(item.quantity || 0) * (item.price || 0)}
        </h3>

        {/* MENU */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Ellipsis size={18} className="text-gray-400" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => {
                  onEdit(index);
                  setOpen(false);
                }}
              >
                <Edit2 size={14} /> Edit
              </button>

              {onDelete && (
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    onDelete(index);
                    setOpen(false);
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
