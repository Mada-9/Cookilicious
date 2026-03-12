import axios from 'axios';

const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000/api" // Ajoute /api ici si ton back local utilise ce préfixe
  : "https://cookilicious-9rx4.vercel.app/api"; // Ajoute /api ici

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;