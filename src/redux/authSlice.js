import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null, isFetching: false };
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, email, firstName, lastName }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        username,
        password,
        email,
        firstName,
        lastName
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      console.log(data);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (userId) => {
    console.log("verify", userId);
    await AuthService.verifyAccount(userId);
  }
);

export const sendMail = createAsyncThunk(
  "auth/sendMail",
  async (email, thunkAPI) => {
    // const data = await AuthService.sendMail(email);
    try {
      const response = await AuthService.sendMail(email);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ capcha, password }, thunkAPI) => {
    try {
      console.log({ capcha, password });
      const response = await AuthService.resetPassword(capcha, password);
      console.log(response);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.isFetching = false;
    },
    [register.pending]: (state, action) => {
      state.isFetching = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.isFetching = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [verifyAccount.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [sendMail.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isFetching = false;
      // state.capcha = action.payload;
    },
    [sendMail.pending]: (state, action) => {
      state.isFetching = true;
    },
    [sendMail.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isFetching = false;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      // state.capcha = action.payload;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
