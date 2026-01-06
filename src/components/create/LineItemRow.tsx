"use client";

import { useState, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import {LineItemPreviewCard} from "./LineItemPreviewCard";
import {LineItemSearchCard} from "./LineItemSearchCard";
import {LineItemEditorCard} from "./LineItemEditorCard"

import { UseFormRegister, FieldErrors, UseFormWatch, UseFieldArrayRemove } from "react-hook-form";

type LineItemRowProps = {
  filteredItems: any[]; // or type your item array properly
  index: number;
  register: UseFormRegister<any>; // replace `any` with your form type if you have it
  error?: any; // or FieldErrors if from react-hook-form
  watch: UseFormWatch<any>; // same, replace any with your form type
  search: string;
  setSearch: (value: string) => void;
  handleAddNewItem: (description: any) => void;
  activeRow: number | null;
  setActiveRow: (index: number | null) => void;
  remove: UseFieldArrayRemove;
};

export default function LineItemRow({
  filteredItems,
  index,
  register,
  error,
  watch,
  search,
  setSearch,
  handleAddNewItem,
  activeRow,
  setActiveRow,
  remove,
}: LineItemRowProps) {
  const item = watch(`items.${index}`);
  const isActive = activeRow === index;
  const saved = !isActive;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
    <div className="w-full border border-gray-100 md:bg-white rounded-[12px] mt-2 relative ">
     
     {saved && item && (
  <LineItemPreviewCard
    item={item}
    index={index}
    onEdit={setActiveRow}
    onDelete={remove}
  />
)}


    {saved && isActive && !item?.description && (
  <LineItemSearchCard
    search={search}
    setSearch={setSearch}
    filteredItems={filteredItems}
    index={index}
    setActiveRow={setActiveRow}
    handleAddNewItem={handleAddNewItem}
  />
)}

      {/* ===============================
          EDIT MODE
      =============================== */}
     
    </div>

    {!saved &&
  (isMobile ? (
    <BottomSheet open onDismiss={() => setActiveRow(null)} snapPoints={({ maxHeight }) => [maxHeight * 0.9]} blocking>

      <div className="px-4 pt-2">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
        <h3 className="text-lg font-medium mb-4">Item Detail</h3>
      </div>

      <LineItemEditorCard
        item={item}
        index={index}
        register={register}
        error={error}
        setActiveRow={setActiveRow}
      />

    </BottomSheet>
  ) : (
    <LineItemEditorCard
      item={item}
      index={index}
      register={register}
      error={error}
      setActiveRow={setActiveRow}
    />
  ))}

  </>
  );
}
