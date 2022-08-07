import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../services/notification.service";

const notifications = JSON.parse(localStorage.getItem("notifications"));
const initialState = notifications
    ? {
        notifications: notifications,
        unread: {},
        status: "idle"
    }
    : {
        notifications: {},
        unread: {},
        status: "idle"
    }
export const fetchNotifications = createAsyncThunk(
    "notify/notifications",
    async () => {
        const data = await notificationService.getAllNotification();
        console.log(data);
        return data;
    }
)

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    extraReducers:{
        
    }
});

const { reducer } = notificationSlice;
export default reducer;
export const selectNotifications = (state) => state.notification.notifications;