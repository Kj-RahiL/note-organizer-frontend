import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../types/userType";

interface AuthSate {
  user: TUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

const initialState: AuthSate = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: TUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action: { payload: string }) {
      state.accessToken = action.payload;
    },
    setIsLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      // Remove the "roll" cookie
      document.cookie = "roll=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href = "/";
    },
  },
});

export const { setUser, setAccessToken, setIsLoading, logout } =
  authSlice.actions;

export default authSlice.reducer;
