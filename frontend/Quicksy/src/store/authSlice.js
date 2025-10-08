// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to validate token and fetch user profile
export const restoreAuth = createAsyncThunk(
  "auth/restoreAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:7777/api/v1/user/profile",
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Token invalid or expired");
      }

      const user = response?.data?.data;

      return { user };
    } catch (error) {
      localStorage.removeItem("auth");
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          console.log("User restored:", state.user);
      })
      .addCase(restoreAuth.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload;
      })
      
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectAuthStatus = (state) => state.auth.status;

export default authSlice.reducer;
