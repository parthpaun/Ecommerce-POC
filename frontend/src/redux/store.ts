import authSlice from "./auth/authSlice";
import categorySlice from "./admin/category/categorySlice";
import productSlice from "./admin/product/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    adminCategory: categorySlice,
    adminProduct: productSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
