import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (
    {
      name,
      email,
      contact,
      employeeId,
    }: { name: string; email?: string; contact?: string; employeeId?: string },
    { rejectWithValue }
  ) => {
    try {
      await userApi.post("/users/create", { name, email, contact, employeeId });
      return { name };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Create User"
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/users/getUser");
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch User"
      );
    }
  }
);

export const reset = createAsyncThunk(
  "user/reset",
  async (_, { rejectWithValue }) => {
    try {
      const response=await userApi.get("/users/reset");
      return {name:response.data.name}
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch User"
      );
    }
  }
);

// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await userApi.get("/get-user");

//       const {
//         name,
//         score,
//         state,
//         branch,
//         department,
//         unreadNotifications,
//         isNewJoiner,
//         joinWeek,
//         day,
//       } = response.data;
//       return {
//         name,
//         score,
//         state,
//         branch,
//         department,
//         unreadNotifications,
//         isNewJoiner,
//         joinWeek,
//         day,
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch user"
//       );
//     }
//   }
// );
