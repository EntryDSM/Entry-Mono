import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
});
