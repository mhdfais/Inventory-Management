import userApi from "@/config/userAxios";
import type { Product } from "@/types/types";

export const getProducts = async () => {
  try {
    const response = await userApi.get("/product/getProducts");
    return response;
  } catch (error) {
    throw error || "failed to fetch products";
  }
};

export const createProduct = async (
  values: Omit<Product, "_id" | "createdAt">
) => {
  try {
    const response = await userApi.post("/product/addProduct", values);
    return response;
  } catch (error) {
    throw error || "failed to add product";
  }
};

export const editProduct = async (
  id: string,
  values: Omit<Product, "_id" | "createdAt">
) => {
  try {
    const response = await userApi.put(`/product/editProduct/${id}`, values);
    return response;
  } catch (error) {
    throw error || "failed to edit product";
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await userApi.delete(`/product/deleteProduct/${id}`);
    return response;
  } catch (error) {
    throw error || "failed to delete product";
  }
};

export const changeStock = async (
  productId: string,
  action: string,
  quantity: number,
  remarks: string
) => {
  try {
    const response = await userApi.post(`/stock/changeStock/${productId}`, {
      productId,
      action,
      remarks,
      quantity,
    });
    return response;
  } catch (error) {
    throw error || "failed to update stock";
  }
};

export const fetchHistory = async () => {
  try {
    const response = await userApi.get("/stock/getHistory");
    return response;
  } catch (error) {
    throw error || "failed to fetch history";
  }
};
