import { create } from 'zustand';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice?: number;
}

export interface Invoice {
  id: string;
  client: string;
  sender: string;
  date: string;
  dueDate: string;
  status: string;
  total: number;
  items: InvoiceItem[];
}

interface InvoicesState {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  removeInvoice: (id: string) => void;
  updateInvoice: (invoice: Invoice) => void;
  clearInvoices: () => void;
  setInvoices: (invoices: Invoice[]) => void;

  // Item-level functions
  addItemToInvoice: (invoiceId: string, item: InvoiceItem) => void;
  removeItemFromInvoice: (invoiceId: string, index: number) => void;
  updateItemInInvoice: (invoiceId: string, index: number, item: InvoiceItem) => void;
  clearItemsInInvoice: (invoiceId: string) => void;
}

export const useInvoiceStore = create<InvoicesState>((set) => ({
  invoices: [],

  addInvoice: (invoice) => {
    if (!invoice || !invoice.id) return;
    set((state) => ({ invoices: [...state.invoices, invoice] }));
  },

  removeInvoice: (id) => {
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    }));
  },

  updateInvoice: (invoice) => {
    if (!invoice || !invoice.id) return;
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoice.id ? invoice : inv
      ),
    }));
  },

  clearInvoices: () => set({ invoices: [] }),

  setInvoices: (invoices) => {
    if (!Array.isArray(invoices)) return;
    set({ invoices });
  },

  // Item-level functions
  addItemToInvoice: (invoiceId, item) => {
    if (!item) return;
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, items: [...inv.items, item] }
          : inv
      ),
    }));
  },

  removeItemFromInvoice: (invoiceId, id) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, items: inv.items.filter((_, i) => i !== id) }
          : inv
      ),
    }));
  },

  updateItemInInvoice: (invoiceId, id, item) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              items: inv.items.map((it, i) => (i === id ? item : it)),
            }
          : inv
      ),
    }));
  },

  clearItemsInInvoice: (invoiceId) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, items: [] } : inv
      ),
    }));
  },
}));
