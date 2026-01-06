// crud.ts
import { IDBPDatabase } from 'idb';

export class GenericStore<T extends { id?: number }> {
  private db: IDBPDatabase;
  private storeName: string;

  constructor(db: IDBPDatabase, storeName: string) {
    this.db = db;
    this.storeName = storeName;
  }

  // Create / Update
  async save(record: T) {
    if (!record.id) record.id = Date.now();
    return this.db.put(this.storeName, record);
  }

  // Read one by id
  async get(id: number): Promise<T | undefined> {
    return this.db.get(this.storeName, id);
  }

  // Read all
  async getAll(): Promise<T[]> {
    return this.db.getAll(this.storeName);
  }

  // Delete
  async delete(id: number) {
    return this.db.delete(this.storeName, id);
  }
}
