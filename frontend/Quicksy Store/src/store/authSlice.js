import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:7777/api/v1/admin/me", {
        withCredentials: true,
      });
      console.log("Auth check response:", response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Not Authenticated");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    admin: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("Auth success, payload:", action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        console.log("Auth failed");
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
