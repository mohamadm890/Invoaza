import { useState, useEffect } from "react";

type Repository<T> = {
  get: () => Promise<T | null>;
  save: (item: T) => Promise<void>;
};

export function useSingleObject<T>(repository: Repository<T>) {
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the single object
  const fetchItem = async () => {
    setLoading(true);
    try {
      const data = await repository.get();
      setItem(data || null);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch item:", err);
      setError("Failed to fetch item");
    } finally {
      setLoading(false);
    }
  };

  // Save or update the object
  const saveItem = async (newItem: T) => {
    setLoading(true);
    try {
      if (!newItem || typeof newItem !== "object") {
        throw new Error("Invalid item");
      }
      await repository.save(newItem);
      setItem(newItem);
      setError(null);
    } catch (err) {
      console.error("Failed to save item:", err);
      setError("Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return { item, loading, error, fetchItem, saveItem };
}
