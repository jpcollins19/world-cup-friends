import * as React from "react";
import "@testing-library/react-hooks";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { renderHook } from "@testing-library/react-hooks";
import { store, setAuth, loadUsers, UserSchema, _loadUsers } from "../../store";
import * as hooks from "../";
import { createUser } from "../fixtures";
import { useGetActiveUsers } from "../";

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
    store.dispatch(setAuth({ id: "user123" }));

    const wrapper: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    const { result } = renderHook(() => hooks.useIsUserLoggedIn(), {
      wrapper,
    });

    expect(result.current).toBe(true);
  });

  it(`user is not logged in`, () => {
    store.dispatch(setAuth({ id: null }));

    const wrapper: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    const { result } = renderHook(() => hooks.useIsUserLoggedIn(), {
      wrapper,
    });

    expect(result.current).toBe(false);
  });
});

describe("useIsUserAdmin ", () => {
  it(`user is admin`, () => {
    store.dispatch(setAuth({ id: "user123", isAdmin: true }));

    const wrapper: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    const { result } = renderHook(() => hooks.useIsUserAdmin(), {
      wrapper,
    });

    expect(result.current).toBe(true);
  });

  it(`user is not admin`, () => {
    store.dispatch(setAuth({ id: "user123", isAdmin: false }));

    const wrapper: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    const { result } = renderHook(() => hooks.useIsUserAdmin(), {
      wrapper,
    });

    expect(result.current).toBe(false);
  });
});

describe("useGetActiveUsers ", () => {
  const notSubmitted = createUser();
  const submitted = createUser(100);

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
      store.dispatch(_loadUsers(test.users));

      const wrapper: React.FC<{ children?: React.ReactNode }> = ({
        children,
      }) => <Provider store={store}>{children}</Provider>;

      const { result } = renderHook(() => hooks.useGetActiveUsers(), {
        wrapper,
      });

      expect(result.current.length).toBe(test.result);
    });
  });
});
