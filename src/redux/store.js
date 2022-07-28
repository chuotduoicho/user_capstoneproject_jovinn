import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import serviceReducer from "./serviceSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import messageReducer from "./message";
import urlReducer from "./url.js";
import contractReducer from "./contractSlice";
import requestReducer from "./requestSlice";
const reducer = {
  auth: authReducer,
  message: messageReducer,
  url: urlReducer,
  category: categoryReducer,
  service: serviceReducer,
  user: userReducer,
  contract: contractReducer,
  request: requestReducer,
};
export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
