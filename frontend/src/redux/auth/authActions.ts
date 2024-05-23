/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../utils/helperFunctions";
import { AppDispatch } from "../store";
import { logoutSuccess } from "./authSlice";

interface ApiError {
  response?: {
    data: any;
  };
}

// export const login =
//   (email: string, password: string) => async (dispatch: AppDispatch) => {
//     try {
//       const data = { email, password };
//       const response = await apiCall("POST", "/auth/login", data);
//       dispatch(loginSuccess(response.user));
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

export const login = createAsyncThunk(
  "auth/login",
  async (payload: Record<string, unknown>) => {
    try {
      const response = await apiCall("POST", "/auth/signin", payload);
      localStorage.setItem("token", response?.token);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError?.response?.data || apiError;
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: Record<string, unknown>) => {
    try {
      const response = await apiCall("POST", "/auth/signup", payload);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError?.response?.data || apiError;
    }
  }
);

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await apiCall("POST", "/auth/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
