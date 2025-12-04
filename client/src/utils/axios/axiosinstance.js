import axios from 'axios'


const API_URL = process.env.NODE_ENV === "development"  //environnement de dev ou de production
  ? "http://localhost:8000"
  : "https://cookilicious-9rx4.vercel.app"

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})


export default axiosInstance;