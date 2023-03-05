import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import logger from "redux-logger";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import thunk from "redux-thunk";
import memur from "./reducers";

const store = createStore(memur, applyMiddleware(thunk, logger));
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
);
