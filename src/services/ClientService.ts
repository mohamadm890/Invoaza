import { api } from './api';
import { BaseRepository } from './BaseRepository';
import { Client } from './types/Client';



export class ClientRepository extends BaseRepository<Client> {
  constructor() {
    super('/clients');
  }
}

