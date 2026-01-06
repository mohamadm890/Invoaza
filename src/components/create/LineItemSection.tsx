"use client";
import { Key, useState } from "react";
import LineItemRow from "./LineItemRow";
import TaxDiscountModal from "@/components/addTax";
import { useInvoiceCalculator } from "@/hooks/useInvoiceCalculator";
import { useFormContext, useFieldArray } from "react-hook-form";
import {InvoiceActionsPanel} from "./ItemSummaryAndActions";




export default function LineItemSection() {
  const { control, register, watch, setValue, formState: { errors } } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items" // <-- the field array name
  });


  const [search, setSearch] = useState("");
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [blur, setBlur] = useState(false);
  const [modalType, setModalType] = useState(null); // 'tax' | 'discount' | null
  const items = watch("items") || [];
  const tax = watch("tax");






 
  const currency = watch("currency");

  
  const { subtotal, taxDisplay, total } = useInvoiceCalculator(items, tax ?? 0);



 
const formatCurrency = (amount: any) => {
  if (!currency) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

  
  

  const filteredItems = items?.filter((c: { description: string; }) =>
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddRow = () => {
    // Find the first empty row
    const emptyIndex = items.findIndex((item: { description: string; }) => item.description.trim() === "");
  
    if (emptyIndex !== -1) {
      // Return/focus the existing empty row for the user
      setActiveRow(emptyIndex); // make it active
      return; // stop here, do NOT append
    }
  
    // If no empty row exists, append a new one
    append({ description: "", quantity: 1, price: 0 });
    setActiveRow(fields.length); 
    setSearch("");
  };
  

  const handleAddNewItem = (description: any) => {
    const newItem = {
      id: `item-${items.length + 1}`,
      description,
      quantity: 1,
      price: 0,
    };
    append({ ...newItem });
    setSearch("");
    setActiveRow(fields.length);
  };


  
  // Save tax or discount
  const handleAddTaxDiscount = (data: { type: string; }) => {
    // Save the data in form state
    if (data.type === "tax") setValue("tax", data);
    else if (data.type === "discount") setValue("discount", data);

    setModalType(null);
  };

  return (
    <section className="mt-2 p-4 rounded-[16px] md:p-8 relative bg-white">
      <div className="mb-8 flex flex-col gap-2 ">
        <h2 className="text-[#494949] text-lg md:text-xl lg:text-2xl font-[400]">Items</h2>
        <p className="text-gray-400 text-sm md:text-base lg:text-lg">
Add items to your invoice</p>
      </div>

      {fields.length > 0 && (
        <div className="mt-4">
          {fields.map((field: { id: Key | null | undefined; }, index: number) => (
          
            <LineItemRow
              key={field.id}
              index={index}
              filteredItems={filteredItems}
              search={search}
              setSearch={setSearch}
              handleAddNewItem={handleAddNewItem}
              activeRow={activeRow}
              setActiveRow={setActiveRow}
              register={register}
              remove={remove}
              watch={watch}
              error={errors.items && Array.isArray(errors.items) ? errors.items[index] : undefined}
            
            />

          ))}
        </div>
      )}


<InvoiceActionsPanel
        subtotal={subtotal}
        tax={tax}
        total={total}
        taxDisplay={taxDisplay}
        handleAddRow={handleAddRow}
        setModalType={setModalType}
        formatCurrency={formatCurrency}
        watch={watch}
      />


      {/* Render Modal only if modalType is set */}
      <TaxDiscountModal
  isOpen={!!modalType}
  onSave={handleAddTaxDiscount}
  onClose={() => setModalType(null)}
  register={register}
  watch={watch}
/>





    </section>
  );
}
