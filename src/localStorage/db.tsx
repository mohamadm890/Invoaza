import { openDB } from 'idb';
import { GenericStore } from './crud';

// 1. Open DB
const db = await openDB('invoiceApp', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('clients')) {
      db.createObjectStore('clients', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('items')) {
      db.createObjectStore('items', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('invoices')) {
      db.createObjectStore('invoices', { keyPath: 'id' });
    }
  },
});

// 2. Create generic stores
interface Client { id?: number; name: string; }
interface Item { id?: number; name: string; price: number; }
interface Invoice { id?: number; clientId: number; items: Item[]; total: number; date: string; }

const clientStore = new GenericStore<Client>(db, 'clients');
const itemStore = new GenericStore<Item>(db, 'items');
const invoiceStore = new GenericStore<Invoice>(db, 'invoices');

