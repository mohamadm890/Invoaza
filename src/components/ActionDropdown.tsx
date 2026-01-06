"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Ellipsis } from 'lucide-react';
import React from "react";

type DropdownAction = {
    key: string;
    label: string;
    color?: string;      
    hoverBg?: string;    
    onClick?: () => void;
  };
  
  interface ActionDropdownProps {
    actions: DropdownAction[];      // array of actions
    iconColor?: string;             // optional icon color
    menuWidth?: string;             // optional menu width
  }


export default function ActionDropdown({ actions = [], iconColor = "#939393", menuWidth = "w-48" }: ActionDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Ellipsis color={iconColor} className="cursor-pointer" />
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Actions Menu"
        className={`bg-white rounded-[16px] shadow-lg border border-[#DEE7FF] py-2 ${menuWidth}`}
      >
       {actions.map(({ key, label, color = "text-gray-700", hoverBg = "hover:bg-gray-100", onClick }) => (
  <DropdownItem
     key={key}
    onClick={onClick}   // <-- use the specific action's onClick
    className={`px-4 py-2 text-sm ${color} ${hoverBg} rounded-[8px] cursor-pointer`}
  >
    {label}
  </DropdownItem>
))}

      </DropdownMenu>
    </Dropdown>
  );
}
