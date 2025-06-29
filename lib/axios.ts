// lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer TU_TOKEN", // Si usas autenticación
  },
  withCredentials: true, // Importante para cookies o auth
});

// Interceptores
api.interceptors.response.use(
  (response) => response, // Devuelve la respuesta completa
  (error) => {
    if (error.message === "Network Error" && !error.response) {
      error.message = "Error de CORS o conexión al servidor";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
