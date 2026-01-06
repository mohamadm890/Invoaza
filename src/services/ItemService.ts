import { api } from './api';
import { BaseRepository } from './BaseRepository';
import { Item } from './types/Item';

export class ItemRepository extends BaseRepository<Item> {
constructor() {
    super('/items');
    }
}