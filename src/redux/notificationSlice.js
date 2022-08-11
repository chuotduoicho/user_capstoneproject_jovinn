import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../services/notification.service";

const notifications = JSON.parse(localStorage.getItem("notifications"));
const initialState = {
        notifications: notifications?notifications:{},
        status: "idle"
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
    async (notificationId) => {
        console.log(notificationId);
        const data = await notificationService.readNotification(notificationId);
        console.log(data);
        return data;
    }
);

export const deleteNotification = createAsyncThunk(
    "notification/delete",
    async (notificationId) => {
        const data = await notificationService.deleteNotification(notificationId);
        return data;
    }
)

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    extraReducers:{
        [fetchNotifications.fulfilled]: (state, { payload }) => {
            state.notifications = payload;
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
    }
});

const { reducer } = notificationSlice;
export default reducer;
export const selectNotifications = (state) => state.notification.notifications;