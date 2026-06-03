import axios from 'axios';

// Avec Vite, on utilise "import.meta.env.DEV" pour savoir si on est en local
const API_URL = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://cookiliciousbackend.vercel.app"; // 1. Ajout du https:// obligatoire !

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;