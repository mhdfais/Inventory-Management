import { api } from "@/config/authAxios";
import type { loginFormValues, registerFormValues } from "@/types/types";

export const registerUser = async (values: registerFormValues) => {
  try {
    const response = await api.post("/auth/registerUser", values);
    return response;
  } catch (error) {
    throw error || "failed to register";
  }
};

export const login = async (values: loginFormValues) => {
  try {
    const response = await api.post("/auth/login", values);
    return response;
  } catch (error) {
    throw error || "failed to login";
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response;
  } catch (error) {
    throw error || "failed to logout";
  }
};
