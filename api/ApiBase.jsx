import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API_URL = "https://grovia-api.vercel.app/api";

const handelErrors = async (err) => {
  if (err?.response?.status === 401) {
    console.log("Unauthorized - need login");
  }

  if (err?.response?.status === 403) {
    console.log("You don't have permission to access this responce");
  }

  return Promise.reject(err);
};

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    const tokenType = "Berrer";

    if (token) {
      config.headers = config.headers || {};
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
