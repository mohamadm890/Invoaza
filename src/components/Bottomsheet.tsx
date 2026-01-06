import React, { ReactNode, useState, useEffect } from "react";

interface BottomsheetCompProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;

}

export default function BottomsheetComp({
  open,
  onClose,
  title = "",
  children,

}: BottomsheetCompProps) {
  const [visible, setVisible] = useState(open);

  // Handle open/close transitions
  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300); // match transition duration
  };

  return (
    <>
      {/* Overlay */}
      {visible && (
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
        />
      )}

      {/* Bottom Sheet */}
      <div
  className={`fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-[16px] shadow-lg p-4 transition-transform duration-300 ${
    open ? "translate-y-0" : "translate-y-full"
  } h-[50vh]`}
>

        {/* Header */}
        <div className="flex justify-between items-center  pb-2 mb-4">
          <h2 className="text-[14px] font-[600]">{title}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">

        {children}
        </div>

      </div>
    </>
  );
}
