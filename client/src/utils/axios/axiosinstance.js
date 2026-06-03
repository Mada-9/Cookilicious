import axios from 'axios';

// "import.meta.env.DEV" est vrai sur ton PC, et faux sur Vercel
const API_URL = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://cookiliciousbackend.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;