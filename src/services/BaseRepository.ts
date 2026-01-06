import { api } from "./api";


export class BaseRepository<T> {
  private resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }


  getAll(params?: object): Promise<T[]> {
    return api.get(this.resource, { params }).then((res) => res.data);
  }

  // Get one by ID
  getById(id: number | string): Promise<T> {
    return api.get(`${this.resource}/${id}`).then((res) => res.data);
  }

  // Create a new item
  create(data: Partial<T>): Promise<T> {
    console.log("Sending data:", data);
    return api.post(this.resource , data).then((res) => res.data);
  }

  // Update an item
  update(id: number | string, data: Partial<T>): Promise<T> {
    return api.put(`${this.resource}/${id}`, data).then((res) => res.data);
  }

  // Delete an item
  delete(id: number | string): Promise<T> {
    return api.delete(`${this.resource}/${id}`).then((res) => res.data);
  }
}
