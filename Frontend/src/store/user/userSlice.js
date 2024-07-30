import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { createUser, loginUser } from "../../service/userservice";

const initialState = {
  users: [],
  user: null,
};

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await loginUser({ email, password });
      const token = response;
      dispatch(storeToken(token));
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }
);

export const storeToken = createAction("user/login/storeToken");

export const addUser = createAsyncThunk("signup", async (userData) => {
  try {
    const response = await createUser(userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error.response.data.message;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export default userSlice.reducer;
