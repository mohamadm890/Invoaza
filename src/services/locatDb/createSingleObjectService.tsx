

export function createSingleObjectService<T>(repository: {
    getOne: () => Promise<T | null>;
    saveOne: (data: T) => Promise<void>;
    clearOne: () => Promise<void>;
  }, schema?: { parse: (data: T) => T }) {
    return {
      /** Get the single object */
      async get() {
        return repository.getOne();
      },
  
      /** Save or update the single object with optional schema validation */
      async save(item: T) {
        if (schema) schema.parse(item); // validate
        return repository.saveOne(item);
      },
  
      /** Remove the single object */
      async clear() {
        return repository.clearOne();
      },
    };
  }
  
