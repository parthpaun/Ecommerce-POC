import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp, login } from "./authActions";

interface AuthState {
  isLoggedIn: boolean;
  successMessage: string;
  isLoading: boolean;
  error: string | undefined;
  user: null | {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  successMessage: "",
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.successMessage = "";
    },
    resetError: (state) => {
      state.error = "";
    },
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<AuthState["user"]>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    signUpSuccess: (state) => {
      state.successMessage = "User Created Successfully!";
    },
  },
  extraReducers(builder) {
    // signup
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
      state.successMessage = "User Created Successfully";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload.data;
      state.successMessage = "Logged in Sucessfully";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.error?.message;
    });
  },
});

export const {
  loginPending,
  loginSuccess,
  logoutSuccess,
  signUpSuccess,
  resetError,
  resetSuccess,
} = authSlice.actions;
export default authSlice.reducer;
