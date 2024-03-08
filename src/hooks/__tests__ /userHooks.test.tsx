import * as React from "react";
import "@testing-library/react-hooks";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { renderHook } from "@testing-library/react-hooks";
import {
  store,
  setAuth,
  loadUsers,
  UserSchema,
  _loadUsers,
  _loadTourneyStage,
} from "../../store";
import * as hooks from "../";
import { createUser, getFakerInfo } from "../fixtures";
import { findTourneyStage, useGetActiveUsers } from "../";
import { getWrapper, updateStore } from "./hookUtils";

beforeAll(() => {
  const { error } = console;
  console.error = (...args) => {
    if (args[0] && args[0].startsWith("Warning: ReactDOM.render")) {
      return;
    }
    error.apply(console, args);
  };
});

describe("useIsUserLoggedIn ", () => {
  it(`user is logged in`, () => {
    const auth = { id: getFakerInfo("uuid") };

    updateStore(setAuth, auth);

    const wrapper = getWrapper();

    const { result } = renderHook(() => hooks.useIsUserLoggedIn(), {
      wrapper,
    });

    expect(result.current).toBe(true);
  });

  it(`user is not logged in`, () => {
    const auth = { id: null };

    updateStore(setAuth, auth);

    const wrapper = getWrapper();

    const { result } = renderHook(() => hooks.useIsUserLoggedIn(), {
      wrapper,
    });

    expect(result.current).toBe(false);
  });
});

describe("useIsUserAdmin ", () => {
  it(`user is admin`, () => {
    const auth = { id: getFakerInfo("uuid"), isAdmin: true };

    updateStore(setAuth, auth);

    const wrapper = getWrapper();

    const { result } = renderHook(() => hooks.useIsUserAdmin(), {
      wrapper,
    });

    expect(result.current).toBe(true);
  });

  it(`user is not admin`, () => {
    const auth = { id: getFakerInfo("uuid"), isAdmin: false };

    updateStore(setAuth, auth);

    const wrapper = getWrapper();

    const { result } = renderHook(() => hooks.useIsUserAdmin(), {
      wrapper,
    });

    expect(result.current).toBe(false);
  });
});

describe("useGetActiveUsers ", () => {
  const notSubmitted: UserSchema = createUser();
  const submitted: UserSchema = createUser(100);

  const testsToRun = [
    {
      users: [
        notSubmitted,
        submitted,
        submitted,
        notSubmitted,
        submitted,
        submitted,
      ],
      result: 4,
    },
    {
      users: [
        notSubmitted,
        submitted,
        notSubmitted,
        notSubmitted,
        submitted,
        submitted,
      ],
      result: 3,
    },
    {
      users: [
        submitted,
        submitted,
        notSubmitted,
        notSubmitted,
        submitted,
        submitted,
        submitted,
        submitted,
      ],
      result: 6,
    },
  ];

  testsToRun.forEach((test) => {
    it(`when user count to return is: ${test.result}`, () => {
      updateStore(_loadUsers, test.users);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useGetActiveUsers(), {
        wrapper,
      });

      expect(result.current.length).toBe(test.result);
    });
  });
});

describe("findTourneyStage ", () => {
  const testsToRun = [1, 2, 3];

  testsToRun.forEach((stage) => {
    it(`tourneyStage is ${stage}`, () => {
      updateStore(_loadTourneyStage, stage);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.findTourneyStage(), {
        wrapper,
      });

      expect(result.current).toBe(stage);
    });
  });
});
