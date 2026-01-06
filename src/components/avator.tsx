import React, { ReactNode, isValidElement, cloneElement, ReactElement } from "react";
import { generateColor } from "@marko19907/string-to-color";
import { Icon } from "lucide-react"; // Import Lucide icon type

interface AvatarProps {
  name?: string;
  size?: number;
  content?: string | ReactNode; // text or icon
}

export const Avatar: React.FC<AvatarProps> = ({
  name = "",
  size = 40,
  content,
}) => {
  const bgColor = generateColor(name || "default", {
    saturation: 70,
    lightness: 94,
  });

  const textColor = generateColor(name || "default", {
    saturation: 70,
    lightness: 60,
  });

  const initials = name
    ? name
        .split(" ")
        .map(w => w[0]?.toUpperCase())
        .slice(0, 2)
        .join("")
    : "";

  const renderContent = content
    ? typeof content === "string"
      ? content
      : isValidElement(content)
      ? cloneElement(
          content as ReactElement<React.ComponentProps<typeof Icon>>,
          {
            size: size * 0.5, // auto scale icon
            strokeWidth: 2,   // lucide looks better
          }
        )
      : null
    : initials;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        fontWeight: "600",
        fontSize: size * 0.45,
        userSelect: "none",
      }}
    >
      {renderContent}
    </div>
  );
};
