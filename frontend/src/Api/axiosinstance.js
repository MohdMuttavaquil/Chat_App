import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "https://api2.stylevibe.fun/api",
  // baseURL: "http://localhost:3000/api"
})

export default axiosInstance