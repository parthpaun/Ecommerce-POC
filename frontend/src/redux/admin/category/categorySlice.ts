import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoryAction";

type CategoryData = {
  name: string;
  description: string;
  _id: string;
};
interface Category {
  categories: CategoryData[];
  isLoading: boolean;
  error: string | undefined;
  successMessage: string;
}

const initialState: Category = {
  categories: [],
  successMessage: "",
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get categories
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
      state.successMessage = "User Created Successfully";
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });
  },
});

export default authSlice.reducer;
