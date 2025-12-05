import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"
});

apiClient.interceptors.request.use((config) => {
  let token = null;
  try {
    const stored = JSON.parse(localStorage.getItem("ux-meals-auth") ?? "{}");
    token = stored?.state?.token ?? null;
  } catch (error) {
    token = null;
  }

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
