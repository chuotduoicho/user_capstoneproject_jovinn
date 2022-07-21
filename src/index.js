import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
ReactDOM.render(
  <Provider store={store}>
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <App />
    </PayPalScriptProvider>
  </Provider>,
  document.getElementById("root")
);
