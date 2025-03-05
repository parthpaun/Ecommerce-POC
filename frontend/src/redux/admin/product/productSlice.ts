import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getProducts } from "./productAction";

type ProductData = {
  name: string;
  description: string;
  _id: string;
};
interface Product {
  products: ProductData[];
  isLoading: boolean;
  error: string | undefined;
  successMessage: string;
  category: Record<string, string>;
}

const initialState: Product = {
  products: [],
  successMessage: "",
  isLoading: false,
  error: "",
  category: {},
};

const productSlice = createSlice({
  name: "adminProduct",
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
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
      state.successMessage = "Products has been fetched successfully ";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data.products;
      state.category = action.payload.data.category;
      state.successMessage = "Product Added Successfully";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data.categories;
      state.successMessage = "product Deleted Successfully";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });
  },
});

export default productSlice.reducer;
