"use client";

import { useState } from "react";
import InputCustom from "@/components/InputCustom";
import { BottomSheet } from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css';
import { useMediaQuery } from "react-responsive";
import { useFormContext } from "react-hook-form";

type Client = {
  name: string;
  email: string;
  // add other fields you need
};

type ClientAddFormProps = {
  register: any; // from react-hook-form
  onSave?: (data: Client) => void; 
  onCancel?: () => void;
  errors?: Record<string, any>; // optional, for form validation errors
};

export default function ClientAddForm({ register, onSave, onCancel }: ClientAddFormProps) {
  const [open, setOpen] = useState(true);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { getValues, formState: { errors }  } = useFormContext(); 

  
  // ---- helper to save client ----
  const handleSaveClient = () => {
    const data = getValues("client");
    onSave?.(data); // send data to parent
    setOpen(false); // close BottomSheet if mobile
  };

  const handleClose = () => {
    setOpen(false);
    onCancel?.();
  };

  return (
    <>
      {/* DESKTOP FORM */}
      {!isMobile && (
        <div className="p-4 bg-white rounded-[12px]">
          <div className="flex flex-col gap-3">
            <InputCustom
              placeholder="Client name"
              {...register("client.name", { required: true })}
              error={(errors?.client as any)?.name?.message}
            />
            <InputCustom
              placeholder="Client email"
              {...register("client.email", { required: true })}
              error={(errors?.client as any)?.email?.message}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-3 py-1 rounded border border-gray-200 text-gray-500"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded bg-blue-600 text-white"
                onClick={handleSaveClient}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM SHEET */}
      {isMobile && (
        <BottomSheet
          open={open}
          onDismiss={handleClose}
          snapPoints={({ minHeight }) => [minHeight, 400]}
        >
          <div className="flex flex-col gap-3 p-4">
            <InputCustom
              placeholder="Client name"
              {...register("client.name", { required: true })}
              error={(errors?.client as any)?.name?.message}
            />
            <InputCustom
              placeholder="Client email"
              {...register("client.email", { required: true })}
              error={(errors?.client as any)?.email?.message}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-3 py-1 rounded border"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded bg-blue-600 text-white"
                onClick={handleSaveClient}
              >
                Save
              </button>


            </div>
          </div>
        </BottomSheet>
      )}
    </>
  );
}
