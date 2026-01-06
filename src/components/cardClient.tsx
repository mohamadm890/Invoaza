"use client";

import React from 'react';
import {Avatar} from "@/components/avator";
import BottomSheetMobile from "./BottomSheetMobile"; 
import { User, MoreHorizontal } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  className?: string;
}

interface CardClientProps {
  item: any,
  row: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  actions?: Action[];
  total?: number;
}


const CardClient: React.FC<CardClientProps> = ({  actions,   item}) => {
  const [open, setOpen] = React.useState(false);
 

  return (
    <div
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)", // soft, blurry shadow
      }}
      className="w-full relative px-2 py-2 flex items-center justify-between gap-3 bg-[#fdfdfd] border border-white rounded-[24px]"
    >
      {/* LEFT */}
      <div className="flex flex-row gap-3 items-center">
      <Avatar name={item.name} content={<User />} size={34} />
      <div className="flex flex-col">
      <span className="text-gray-800 text-[14px] line-clamp-1">
      {item.name}</span>
          <span className="text-gray-300 text-[12px]">{item.email}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-2 items-end">
        <button onClick={() => setOpen(true)} className="p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={20} color="#818181" />
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheetMobile open={open} onClose={() => setOpen(false)}>
        {actions?.map((action, i) => (
          <button
            key={i}
            className={`w-full text-left px-4 py-3 text-sm ${action.className || ""}`}
            onClick={() => {
              action.onClick(); // call the passed function
              setOpen(false);   // close the bottom sheet
            }}
          >
            {action.label}
          </button>
        ))}
      </BottomSheetMobile>
    </div>
  );
};

export default CardClient;
