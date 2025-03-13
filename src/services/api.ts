import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 401) {
      toast.error("Unauthorized! Please login again.");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 10000);
    } else if (error.response.status === 403) {
      toast.error("Forbidden");
    } else if (error.response.status === 404) {
      toast.error("Not Found");
    } else if (error.response.status === 500) {
      toast.error("Internal Server Error");
    }
    return Promise.reject(error);
  }
);

export default API;
