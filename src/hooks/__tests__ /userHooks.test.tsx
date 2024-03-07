import * as React from "react";
import { Provider, useSelector, TypedUseSelectorHook } from "react-redux";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import * as hooks from "../";
import reducer, { RootState } from "../../store";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, applyMiddleware, AnyAction, Reducer } from "redux";

describe("useIsUserLoggedIn ", () => {
  it(`user is logged in`, () => {});
});
