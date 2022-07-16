import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import serviceReducer from "./serviceSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import messageReducer from "./message";
import contractReducer from "./contractSlice";
const reducer = {
  auth: authReducer,
  message: messageReducer,
  category: categoryReducer,
  service: serviceReducer,
  user: userReducer,
  contract: contractReducer,
};
export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
