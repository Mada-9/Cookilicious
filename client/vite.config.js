import axios from 'axios'

// Version recommandée pour Vite
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:8000"
  : "cookiliciousbackend.vercel.app" // <-- Remplace par ton vrai lien backend

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance;