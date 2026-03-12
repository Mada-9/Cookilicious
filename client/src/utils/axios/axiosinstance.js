import axios from 'axios'


const API_URL = process.env.NODE_ENV === "development"  //environnement de dev ou de production
  ? "http://localhost:8000"
  : "/api"

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})


export default axiosInstance;