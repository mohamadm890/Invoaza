"use client";
import { MoreVertical } from "lucide-react";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

// Define the type for an individual action
type Action<RowType = any> = {
  label: string;
  onClick: (row: RowType) => void | Promise<void>;
  className?: string;
};

// Props for ActionMenu
interface ActionMenuProps<RowType = any> {
  row: RowType;
  actions: Action<RowType>[];
}

export default function ActionMenu<RowType = any>({
  row,
  actions,
}: ActionMenuProps<RowType>) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleAction = async (action: Action<RowType>) => {
    if (action?.onClick) await action.onClick(row);
    setOpen(false);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <MoreVertical size={18} />
      </button>

      {open &&
        buttonRef.current &&
        createPortal(
          <div
            style={{
              padding: "2px",
              position: "absolute",
              top:
                buttonRef.current.getBoundingClientRect().bottom + window.scrollY,
              left:
                buttonRef.current.getBoundingClientRect().right - 160,
              width: 160,
              zIndex: 9999,
            }}
            className="bg-white shadow-lg border border-gray-100 rounded-md"
          >
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleAction(action)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  action.className || ""
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
