import { getCookieToken, removeAllCookie } from "@/helpers/cookie";
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getCookieToken()}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Expired token
    if (response && response.status === 401) {
      console.error("Unauthenticated - 401 on client", { data: response.data });
      removeAllCookie();
      window.location.reload();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
