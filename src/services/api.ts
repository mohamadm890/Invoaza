import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://3000-firebase-backendinvoice-1759601174589.cluster-64pjnskmlbaxowh5lzq6i7v4ra.cloudworkstations.dev/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

