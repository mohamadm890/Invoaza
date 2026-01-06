import React from "react";

interface WaveDotsProps {
  size?: number;       // size of each dot
  color?: string;      // color of dots
  label?: string;      // optional text below
}

export default function WaveDots({
  size = 14,
  color = "#3668FB",
  label = "Preparing your invoice..."
}: WaveDotsProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Dots */}
      <div style={{
        display: "flex",
        gap: `${size / 1.5}px`,
        alignItems: "flex-end",
        height: `${size * 2}px`
      }}>
        <span style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          animation: "pulse 1s infinite ease-in-out",
          animationDelay: "0s"
        }} />
        <span style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          animation: "pulse 1s infinite ease-in-out",
          animationDelay: "0.3s"
        }} />
        <span style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          animation: "pulse 1s infinite ease-in-out",
          animationDelay: "0s"
        }} />
      </div>

      {/* Label */}
      {label && (
        <div style={{
          marginTop: 8,
          fontSize: "0.9rem",
          color: "#555",
          fontFamily: "sans-serif",
          textAlign: "center"
        }}>
          {label}
        </div>
      )}

      {/* Keyframes */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(0.5); opacity: 0.5; }
            50% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
