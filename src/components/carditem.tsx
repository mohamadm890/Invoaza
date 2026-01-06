import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import BottomSheetMobile from "./BottomSheetMobile"; // reusable bottom sheet

interface Action {
  label: string;
  onClick: (item: any) => void;
  className?: string;
}

interface CardItemSimpleProps {
  item: any;
  actions?: Action[];
}

export default function CardItemSimple({ item, actions }: CardItemSimpleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)" }}
      className="w-full relative px-2 p-2 flex items-center justify-between shadow-sm gap-3 bg-[#fdfdfd] border-1 border-white rounded-[12px]"
    >
      {/* Left: Icon + Item Name */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-[400] text-[14px] text-[#1C1C1C]">{item.name || "Unknown"}</span>
          <span className="text-[13px] text-[#929292]">{item.quantity} * ${item.Price}</span>
        </div>
      </div>

      {/* Right: Total + More Button */}
      <div className="flex flex-col items-end gap-2">
        <button onClick={() => setOpen(true)} className="p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={20} color="#818181" />
        </button>
        <span className="text-[14px] text-[#606060] font-[200]">${item.total}</span>
      </div>

      {/* Bottom Sheet */}
      {open && (
        <BottomSheetMobile open={open} onClose={() => setOpen(false)}>
          {actions?.map((action, i) => (
            <button
              key={i}
              className={`w-full text-left px-4 py-3 text-sm ${action.className || ""}`}
              onClick={() => {
                action.onClick(item); // call the action for this item
                setOpen(false);       // close the bottom sheet
              }}
            >
              {action.label}
            </button>
          ))}
        </BottomSheetMobile>
      )}
    </div>
  );
}
