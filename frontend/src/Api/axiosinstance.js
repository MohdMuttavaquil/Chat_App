import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "https://chat-app-jkuj.onrender.com/api",
  // baseURL: "http://localhost:3000/api"
})

export default axiosInstance