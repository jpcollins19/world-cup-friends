import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App";
import "./tailwind.css";

const mainHTML = document.querySelector("#main-body");

if (!mainHTML) {
  throw new Error("#main-body element not found in the document");
}

const root = createRoot(mainHTML);

window.React = React;
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// );
