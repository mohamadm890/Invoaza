import { useState, useEffect } from "react";

export function useCrud<T>(repository: new () => any) {
  const repo = new repository();

  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await repo.getAll();
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // CREATE
  const createItem = async (item: T) => {
    const res = await repo.create(item);
    setItems(prev => [...prev, res.data]);
    return res.data;
  };

  const deleteItem = async (id: string) => {
    await repo.delete(id);
    setItems(prev => prev.filter(i => (i as any).id !== id));
  };

  return { items, loading, createItem, deleteItem };
}
