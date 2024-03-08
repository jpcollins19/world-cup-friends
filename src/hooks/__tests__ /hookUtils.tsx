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
