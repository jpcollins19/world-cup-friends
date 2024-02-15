import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const mainHTML = document.querySelector("#main-body");

const root = createRoot(mainHTML);

window.React = React;
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
