import axios from "axios";

export const API_URL = "https://grovia-api.vercel.app/api";

const handelErrors = async (err) => {
  if (err?.response?.status === 401) {
    window.location.href = "/login";
  }

  if (err?.response?.status === 403) {
    console.log("You don't have permission to access this responce");
    window.location.href = "/";
  }

  return Promise.reject(err);
};

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "token";
    const tokenType = "Bearer";

    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use((response) => {
  console.log(response);
  return response;
}, handelErrors);

export default axiosInstance;
