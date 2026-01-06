"use client";

import React from "react";
import { BottomSheet as SpringBottomSheet } from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <SpringBottomSheet
      open={open}
      onDismiss={onClose}
      snapPoints={({ maxHeight }) => [
        maxHeight * 0.2,
        maxHeight * 0.4,
      ]}
      defaultSnap={({ maxHeight }) => maxHeight * 0.4}
      blocking={true}
    >
      <div className="p-4">
        {children}
      </div>
    </SpringBottomSheet>
  );
};

export default BottomSheet;
