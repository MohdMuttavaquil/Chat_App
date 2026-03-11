import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://chat-app-jkuj.onrender.com/api",
})

export default axiosInstance