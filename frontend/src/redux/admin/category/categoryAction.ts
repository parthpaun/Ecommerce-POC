/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../../utils/helperFunctions";

interface ApiError {
  response?: {
    data: any;
  };
}

interface AddCategoryData {
  name: string;
  description?: string;
}

export const getCategories = createAsyncThunk("admin/category", async () => {
  try {
    const response = await apiCall("GET", "/admin/categories");
    return response;
  } catch (error) {
    const apiError = error as ApiError;
    throw apiError?.response?.data || apiError;
  }
});

export const addCategory = createAsyncThunk(
  "admin/category/add",
  async (data: AddCategoryData) => {
    const payload = { data };
    try {
      const response = await apiCall("POST", "/admin/category", payload);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError?.response?.data || apiError;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "admin/category/delete",
  async (id: string) => {
    try {
      const response = await apiCall("DELETE", `/admin/category/${id}`);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError?.response?.data || apiError;
    }
  }
);
