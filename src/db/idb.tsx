
"use client";
import { openDB, IDBPDatabase } from 'idb';

// We export dbPromise as a function or a guarded variable
export const dbPromise = typeof window !== 'undefined' 
  ? openDB('app-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('clients')) {
          db.createObjectStore('clients', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('invoices')) {
          db.createObjectStore('invoices', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings");
        }
      },
    })
  : Promise.resolve(null as unknown as IDBPDatabase);