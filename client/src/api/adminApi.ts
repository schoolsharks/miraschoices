import axios from "axios";

export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL + "/admin",
  withCredentials: true,
});
