import { z, ZodError, ZodTypeAny } from "zod";

export function createService(repository: any, schema?: ZodTypeAny) {
    return {
      async add(item: any) {
        try {

            if (schema) schema.parse(item); 
        return repository.add(item);
        } catch(error) {
          if (error instanceof ZodError) {
            return {
              success: false,
              errors: z.flattenError(error), 
            };
          }
          throw error;

        }
      
      },
  
      async getAll() {
        return repository.getAll();
      },
  
      async getById(id: any) {
        return repository.getById(id);
      },
  
      async update(item: any) {
        try {

          if (schema) schema.parse(item); 
         return repository.update(item);
      } catch(error) {
        if (error instanceof ZodError) {
          return {
            success: false,
            errors: z.flattenError(error), 
          };
        }
        throw error;

      }
      },
  
      async delete(id: any) {

        return repository.delete(id);
      },
  
      async clear() {
        return repository.clear();
      },
    };
  }
  