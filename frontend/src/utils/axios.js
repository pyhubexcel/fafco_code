import axios from "axios";

const axiosInstance = axios.create({
    baseURL :import.meta.env.VITE_BASE_URL
})
// axiosInstance.interceptors.request.use(
//   function (config) {
//     const token = cookie.load('token')
//     config.headers["Authorization"] = `Bearer ${token}` ;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
export default axiosInstance
