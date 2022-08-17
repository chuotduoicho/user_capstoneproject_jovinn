import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../services/notification.service";
import { setMessage } from "./message";
const initialState = {
  notifications: [],
  number: null,
  status: "idle",
};

export const fetchNotifications = createAsyncThunk(
  "notification/notifications",
  async () => {
    const data = await notificationService.getAllNotification();
    return data;
  }
);

export const readNotification = createAsyncThunk(
  "notification/read",
  async (notificationId, thunkAPI) => {
    try {
      console.log(notificationId);
      const data = await notificationService.readNotification(notificationId);
      console.log(data);
      thunkAPI.dispatch(setMessage(data.data.message));
      return data;
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

export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async (notificationId) => {
    const data = await notificationService.deleteNotification(notificationId);
    return data;
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = payload.list;
      state.number = payload.unread;
      state.status = "success";
    },
    [fetchNotifications.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchNotifications.pending]: (state, action) => {
      state.status = "rejected";
    },
    [readNotification.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [readNotification.pending]: (state, action) => {
      state.status = "loading";
    },
    [readNotification.pending]: (state, action) => {
      state.status = "rejected";
    },
    [deleteNotification.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteNotification.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteNotification.pending]: (state, action) => {
      state.status = "rejected";
    },
  },
});

const { reducer } = notificationSlice;
export default reducer;
export const selectNotifications = (state) => state.notification.notifications;
export const selectNumber = (state) => state.notification.number;
