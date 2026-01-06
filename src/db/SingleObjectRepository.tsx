import { createRepository } from './baseDB';
export const settingsDB = createRepository('settings');

import { dbPromise } from './idb';

export function createSingleObjectRepository<T>(storeName: string, key: string = 'singleton') {
  return {
    /** Get the single object */
    async getOne(): Promise<T | null> {
      const db = await dbPromise;
      const data = await db.get(storeName, key);
      return data ?? null;
    },

    /** Save or update the single object */
    async saveOne(data: T): Promise<void> {
      const db = await dbPromise;
      await db.put(storeName, data, key);
    },

    /** Remove the single object */
    async clearOne(): Promise<void> {
      const db = await dbPromise;
      await db.delete(storeName, key);
    }
  };
}
