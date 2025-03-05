/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../../utils/helperFunctions";

interface ApiError {
  response?: {
    data: any;
  };
}

interface AddProductData {
  name: string;
  description?: string;
}

export const getProducts = createAsyncThunk("admin/product", async () => {
  try {
    const response = await apiCall("GET", "/admin/products");
    return response;
  } catch (error) {
    const apiError = error as ApiError;
    throw apiError?.response?.data || apiError;
  }
});

export const addProduct = createAsyncThunk(
  "admin/product/add",
  async (data: AddProductData) => {
    const payload = { data };
    try {
      const response = await apiCall("POST", "/admin/product", payload);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError?.response?.data || apiError;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/product/delete",
  async (id: string) => {
    try {
      const response = await apiCall("DELETE", `/admin/product/${id}`);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError?.response?.data || apiError;
    }
  }
);
