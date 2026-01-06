"use client";
import React from "react";
import { FiPlus } from "react-icons/fi";

interface EmptyStateProps {
  title: string;
  description: string;
  onAction?: () => void;
  actionLabel?: string;
}

export default function EmptyState({
  title,
  description,
  onAction,
  actionLabel = "+",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500 space-y-4">
      <h2 className="text-xl font-medium text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
