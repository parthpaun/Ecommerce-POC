/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../../utils/helperFunctions";

interface ApiError {
  response?: {
    data: any;
  };
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

// export const signUp = createAsyncThunk(
//   "auth/signUp",
//   async (payload: Record<string, unknown>) => {
//     try {
//       const response = await apiCall("POST", "/auth/signup", payload);
//       console.log("response", response);
//       return response;
//     } catch (error) {
//       const apiError = error as ApiError;
//       throw apiError?.response?.data || apiError;
//     }
//   }
// );

// export const logout = () => async (dispatch: AppDispatch) => {
//   try {
//     await apiCall("POST", "/auth/logout");
//     dispatch(logoutSuccess());
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };
