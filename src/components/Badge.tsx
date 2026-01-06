import React from "react";

// Map status to colors
const STATUS_COLORS = {
  draft:   { color: "#3182CE" },
  pending: { color: "#D97706" },
  paid:    { color: "#1DA16F" },
  overdue: { color: "#E53E3E" },
} as const;

// Define type from the keys of STATUS_COLORS
type StatusType = keyof typeof STATUS_COLORS;

interface BadgeProps {
  status: StatusType;
}

export default function Badge({ status }: BadgeProps) {
  const { color } = STATUS_COLORS[status] || { color: "#6B7280" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontSize: "13px",
        fontWeight: 400,
        color, // text color
        textTransform: "capitalize",
      }}
    >
      {/* Circle */}
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      {status}
    </span>
  );
}
