import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api" });

export const getMenu = () => API.get("/menu");
export const getMenuItem = (id) => API.get(`/menu/${id}`);
export const getBlogs = () => API.get("/blog");
export const getBlog = (id) => API.get(`/blog/${id}`);
export const postContact = (data) => API.post("/contact", data);
