"use client";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export default function CustomDrawer({
  isOpen,
  onClose,
  title = "Drawer Title",
  children,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false); // <-- mount guard

  



  useEffect(() => {
    setMounted(true); // only render after client mount

    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔑 if not mounted, don’t render anything
  if (!mounted) return <div>Waiting for client...</div>;

  /* =========================
     MOBILE → Bottom Sheet
     ========================= */
  if (isMobile) {
    return (
      <BottomSheet
        open={isOpen}
        onDismiss={onClose}
        snapPoints={({ maxHeight }) => [maxHeight * 0.85]}
      >
        <div className="flex flex-col h-full">
          

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {children}
          </div>
        </div>
      </BottomSheet>
    );
  }

  /* =========================
     DESKTOP → Drawer
     ========================= */
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="sm"
      backdrop="opaque"
      classNames={{ base: "z-50" }}


      hideCloseButton
    >
      {isOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
)}

      <DrawerContent className="h-screen max-w-md bg-white flex flex-col">
        <DrawerHeader className="flex items-center justify-between border-b border-gray-50 ">
          <h2 className="text-lg font-[400] text-gray-800 px-4">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </DrawerHeader>

        <DrawerBody className="flex-1 overflow-y-auto p-4 space-y-4">
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
