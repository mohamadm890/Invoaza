"use client";
import React, { useState } from "react";
import { File, User, Box, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Avvvatars from "avvvatars-react";

const SidebarHeader = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Invoices");

  const tabs = [
    { name: "Invoices", icon: <File size={20} />, path: "/Dashboard/invoices" },
    { name: "Clients", icon: <User size={20} />, path: "/Dashboard/clients" },
    { name: "Setting", icon: <Settings size={20} />, path: "/Dashboard/setting" },
  ];

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    router.push(path);
  };

  return (
    <>
      {/* Sidebar for md+ */}
      <aside className="hidden md:flex flex-col items-start w-64 p-4 bg-[#FAFAFA] border border-[#ECE8E8] h-screen">
        <img src="/logo.svg" alt="Logo" className="h-6 mb-8 object-contain" />
        <nav className="flex flex-col gap-2 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name, tab.path)}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${
                activeTab === tab.name
                  ? "bg-[#F1F1F1] text-gray-600"
                  : "text-gray-200 hover:bg-white hover:text-blue-500"
              }`}
            >
              {tab.icon}
              <span className="font-[400]">{tab.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Tabs */}
      <div className="fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-sm border-t border-gray-50 flex justify-around md:hidden h-16 z-30">
  {tabs.map((tab) => (
    <button
      key={tab.name}
      onClick={() => handleTabClick(tab.name, tab.path)}
      className="flex flex-col items-center justify-center text-gray-500"
    >
      {React.cloneElement(tab.icon, {
        className: activeTab === tab.name ? "text-blue-500" : "text-gray-200",
      })}
      <span
        className={`text-xs mt-1 ${
          activeTab === tab.name ? "text-blue-500 font-medium" : "text-gray-200"
        }`}
      >
        {tab.name}
      </span>
    </button>
  ))}
</div>

    </>
  );
};

export default SidebarHeader;
