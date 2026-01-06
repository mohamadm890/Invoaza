"use client";
import { dbPromise } from './idb';

export function createRepository(storeName: any) {
  return {
    async add(item: any) {
      const db = await dbPromise;
      await db.put(storeName, item);
    },

    async getAll() {
      const db = await dbPromise;
      return db.getAll(storeName);
    },

    async getById(id: any) {
      const db = await dbPromise;
      return db.get(storeName, id);
    },

    async update(item: any) {
      const db = await dbPromise;
      await db.put(storeName, item);
    },

    async delete(id: any) {
      const db = await dbPromise;
      await db.delete(storeName, id);
    },

    async clear() {
      const db = await dbPromise;
      await db.clear(storeName);
    },
  };
}
