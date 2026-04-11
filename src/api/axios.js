import axios from "axios";

const API = axios.create({
  baseURL: "https://skyfall-backend-1.onrender.com/api",
  withCredentials: true, // ← sends cookies with every request
});

API.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("sf_token="))
    ?.split("=")[1];

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;