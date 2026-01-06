import { useState, useEffect } from 'react';

export function useRepository(repository: any) {
  const [items, setItems] = useState([]);

  const fetchAll = async () => {
    const data = await repository.getAll();
    setItems(data);
  };

  const getById = async (id: any) => repository.getById(id);

  const addItem = async (item: any) => {
    await repository.add(item);
    await fetchAll();
  };

  const updateItem = async (item: any) => {

    if (!item.id)
    {
      return;
    }
  
    const existing = await repository.getById(item.id);
  
    if (!existing) {
      console.warn("Item not found in DB:", item.id);
      return;
    }
  
    const merged = { ...existing, ...item };
  
    await repository.update(merged);
  
    await fetchAll();
  };
  

  const deleteItem = async (id: any) => {
    await repository.delete(id);
    await fetchAll();
  };

  const clearItems = async () => {
    await repository.clear();
    setItems([]);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { items, fetchAll, getById, addItem, updateItem, deleteItem, clearItems };
}
