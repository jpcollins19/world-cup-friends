import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";

export const updateStore = (thunk: any, data: any) => {
  store.dispatch(thunk(data));
};

export const getWrapper = () => {
  const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return wrapper;
};

export const ignoreReactDOMRenderError = () => {
  const { error } = console;
  console.error = (...args) => {
    if (args[0] && args[0].startsWith("Warning: ReactDOM.render")) {
      return;
    }
    error.apply(console, args);
  };
};
