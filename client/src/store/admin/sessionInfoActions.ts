import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "../../api/adminApi";

export const fetchCurrentSessionInfo = createAsyncThunk(
  "admin/fetchCurrentSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/current-session");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Session Info"
      );
    }
  }
);

export const resetSession = createAsyncThunk(
  "admin/resetSession",
  async (_, { rejectWithValue }) => {
    try {
        await adminApi.post("/reset-session")
    } catch (error:any) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to reset session"
          );
    }
  }
);
