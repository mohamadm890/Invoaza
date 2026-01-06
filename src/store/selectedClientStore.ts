// store/selectedClientStore.ts
import { create } from "zustand";

interface Client {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

interface SelectedClientState {
  selectedClient: Client | null;
  setSelectedClient: (client: Client) => void;
  clearClient: () => void;
}

export const useSelectedClientStore = create<SelectedClientState>((set) => ({
  selectedClient: null,
  setSelectedClient: (client) => set({ selectedClient: client }),
  clearClient: () => set({ selectedClient: null }),
}));
