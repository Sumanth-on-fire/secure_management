import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Add interceptors for token and user email injection
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // const email = localStorage.getItem("email");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // if (email && config.url.includes("/user")) {
    //   // Append email as a query parameter for user-specific routes
    //   config.params = { ...config.params, email };
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
