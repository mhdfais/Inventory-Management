import { logout } from "@/redux/authSlice";
import store from "@/redux/store";
import type { AxiosInstance } from "axios";
import axios from "axios";

const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        console.warn("Unauthorized. Logging out user.");

        store.dispatch(logout());
        window.location.href = "/login";
        return; 
      }

      return Promise.reject(error);
    }
  );
};

const userApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

applyInterceptors(userApi);

export default userApi;
