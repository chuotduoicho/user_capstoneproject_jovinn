import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageReducer from "./message";
const reducer = {
  auth: authReducer,
  message: messageReducer,
};
export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
