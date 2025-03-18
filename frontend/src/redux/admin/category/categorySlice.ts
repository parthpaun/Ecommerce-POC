import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, getCategories } from "./categoryAction";

type CategoryData = {
  name: string;
  description: string;
  _id: string;
  attributes: Record<string, string>[];
};
interface Category {
  categories: CategoryData[];
  isLoading: boolean;
  error: string | undefined;
  successMessage: string;
  category: Record<string, string>;
}

const initialState: Category = {
  categories: [],
  successMessage: "",
  isLoading: false,
  error: "",
  category: {},
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetCategory(state) {
      state.category = {};
    },
    resetSuccess(state) {
      state.successMessage = "";
    },
    resetError(state) {
      state.error = "";
    },
  },
  extraReducers(builder) {
    // Get categories
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
      state.successMessage = "Categories has been fetched successfully ";
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });

    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data.categories;
      state.category = action.payload.data.category;
      state.successMessage = "Category Created Successfully";
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data.categories;
      state.successMessage = "Category Deleted Successfully";
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });
  },
});

export default authSlice.reducer;
