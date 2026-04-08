import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../types/Auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

const savedAuth = localStorage.getItem("fintech-auth");

const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      token: null,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("fintech-auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("fintech-auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
