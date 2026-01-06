"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useClients } from "@/hooks/useClients";

import ClientAddForm from "./ClientAddForm";
import ClientPreview from "./ClientPreview";
import { v4 as uuidv4 } from "uuid";

export default function ClientBasicsSection() {
  const { addItem, deleteItem } = useClients();
  const { setValue, watch, register} = useFormContext();
  const formClient = watch("client");

  // ---- single source of truth ----
  const [clientState, setClientState] = useState({
    selected: formClient || null,
    isAdding: false,
  });

  console.log("clientState", clientState);

  // ---- sync form values with selected client ----
  useEffect(() => {
    if (clientState.selected) {
      setValue("client.name", clientState.selected.name || "");
      setValue("client.email", clientState.selected.email || "");
    } else {
      setValue("client.name", "");
      setValue("client.email", "");
    }
  }, [clientState.selected, setValue]);

  // ---- restore client if form already has one ----
  useEffect(() => {
    if (formClient?.id) {
      setClientState({ selected: formClient, isAdding: false });
    }
  }, [formClient]);

  // ---- handlers ----
  const handleEdit = (client: any) => {
    setClientState({ selected: client, isAdding: true });
  };

  const handleDelete = (client: { id: any; }) => {
    if (!client?.id) return;
    deleteItem(client.id);
    setClientState({ selected: null, isAdding: false });
    setValue("client", null);
  };

  const handleAddClient = async (data: any) => {
    const clientWithId = { id: uuidv4(), ...data };
    const newClient = await addItem(clientWithId);
    setClientState({ selected: clientWithId, isAdding: false });
    setValue("client", newClient);
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-[12px] mt-2">
       <h2 className="text-[#494949] mb-2 text-lg md:text-xl lg:text-2xl font-[400]">Client</h2>
      <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-8">
        Add your client 
      </p>

      {/* Add button */}
      {!clientState.selected && !clientState.isAdding && (
        <button
          onClick={() => setClientState({ ...clientState, isAdding: true })}
          className="mt-2 text-blue-600"
        >
          + Add client
        </button>
      )}

      {/* Add form */}
      {clientState.isAdding && (
        <ClientAddForm
          register={register}
          onSave={handleAddClient}
          onCancel={() => setClientState({ ...clientState, isAdding: false })}
        />
      )}

      {/* Preview card */}
      {clientState.selected && !clientState.isAdding && (
        <ClientPreview
          client={clientState.selected}
          onEdit={() => handleEdit(clientState.selected)}
          onDelete={() => handleDelete(clientState.selected)}
        />
      )}
    </div>
  );
}
