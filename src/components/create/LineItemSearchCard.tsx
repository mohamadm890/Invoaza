import React from "react";
import InputCustom from "@/components/InputCustom";

interface LineItemInputCardProps {
  search: string;
  setSearch: (value: string) => void;
  filteredItems: { id: string | number; description: string }[];
  index: number;
  setActiveRow: (index: number) => void;
  handleAddNewItem: (description: string) => void;
}

export const LineItemSearchCard: React.FC<LineItemInputCardProps> = ({
  search,
  setSearch,
  filteredItems,
  index,
  setActiveRow,
  handleAddNewItem
}) => {
  return (
    <div className="py-4 px-4">
      <InputCustom
        placeholder="Find or add item"
        value={search}
        onChange={(e) => setSearch(e.target.value)} id={""}       
             />

      {search && (
        <div className="mt-2 border border-[#F0F0F0] rounded-[16px] p-2 bg-white max-h-60 overflow-y-auto">
          {filteredItems.map((f) => (
            <div
              key={f.id}
              onClick={() => {
                setSearch(f.description);
                setActiveRow(index);
              }}
              className="rounded-[12px] p-2 cursor-pointer hover:text-[#167FFC]"
            >
              {f.description}
            </div>
          ))}

          {!filteredItems.some(
            (c) => c.description.toLowerCase() === search.toLowerCase()
          ) && (
            <button
              onClick={() => handleAddNewItem(search)}
              className="w-full h-[34px] text-[14px] bg-[#E2EFFF] text-[#167FFC] rounded-md mt-2"
            >
              + Add "{search}" item
            </button>
          )}
        </div>
      )}
    </div>
  );
};
