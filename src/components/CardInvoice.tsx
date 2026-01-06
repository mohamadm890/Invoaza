import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Badge from "./Badge";
import BottomSheetMobile from "./BottomSheetMobile"; // reusable bottom sheet
import {Avatar} from "@/components/avator";

export default function CardInvoice({ item, actions }: { item: any; actions?: any[] }) {
  const [open, setOpen] = useState(false);
  const hasClient = Boolean(item.client);

  return (
    <div className="w-full relative">
      {/* Main Card */}
      <div className="w-full p-4 bg-white rounded-[16px] flex items-center justify-between gap-3">
        
        {/* LEFT */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-[14px] text-[#929292]">{item.invoice}</span>
            <Badge status={item.status} />
          </div>

          {/* Client section */}
          <div className="flex items-center gap-3">
            {hasClient ? (
              <Avatar name={item.client} size={24} />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">?</div>
            )}
            <span
              className={`text-[14px] max-w-[120px] truncate ${hasClient ? "text-[#141414]" : "text-[#929292]"}`}
              title={hasClient ? item.client : "No client yet"}
            >
              {hasClient ? item.client : "No client yet"}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-2 items-end">
          <button onClick={() => setOpen(true)} className="p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontal size={20} color="#818181" />
          </button>
          <span className="text-[14px] text-[#929292]">{item.total || "0"}</span>
        </div>
      </div>

      {/* Reusable Bottom Sheet */}
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
}
