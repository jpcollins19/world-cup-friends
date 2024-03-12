import * as React from "react";
import "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks";
import {
  setAuth,
  UserSchema,
  _loadUsers,
  _loadTourneyStage,
} from "../../store";
import * as hooks from "../";
import { createUser, getFakerInfo } from "../fixtures";
import {
  getWrapper,
  ignoreReactDOMRenderError,
  updateStore,
} from "./hookUtils";

beforeAll(() => {
  ignoreReactDOMRenderError();
});

const authLoggedInWithPicks = { id: getFakerInfo("uuid"), tiebreaker: 101 };
const authLoggedInWithNoPicks = { id: getFakerInfo("uuid"), tiebreaker: null };
const authNotLoggedIn = { id: null };

const authLoggedInAndIsAdmin = { id: getFakerInfo("uuid"), isAdmin: true };

describe("useGetUser", () => {
  const testsToRun = [
    { scenario: "user is logged in", userData: authLoggedInWithPicks },
    { scenario: "user is not logged in", userData: authNotLoggedIn },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      const userData = test.userData;

      updateStore(setAuth, userData);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useGetUser(), {
        wrapper,
      });

      expect(result.current).toBe(userData);
    });
  });
});

describe("useIsUserLoggedIn ", () => {
  const testsToRun = [
    {
      scenario: "user is logged in",
      userData: authLoggedInWithPicks,
      result: true,
    },
    {
      scenario: "user is not logged in",
      userData: authNotLoggedIn,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      const userData = test.userData;

      updateStore(setAuth, userData);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useIsUserLoggedIn(), {
        wrapper,
      });

      expect(result.current).toBe(test.result);
    });
  });
});

describe("useIsUserAdmin ", () => {
  const testsToRun = [
    {
      scenario: "user is logged in and isAdmin",
      userData: authLoggedInAndIsAdmin,
      result: true,
    },
    {
      scenario: "user is logged in and isAdmin === false",
      userData: authLoggedInWithPicks,
      result: false,
    },
    {
      scenario: "user is not logged in",
      userData: authNotLoggedIn,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      const userData = test.userData;

      updateStore(setAuth, userData);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useIsUserAdmin(), {
        wrapper,
      });

      expect(result.current).toBe(test.result);
    });
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

describe("useShouldPayoutShow ", () => {
  const testsToRun = [
    {
      scenario: "tourney has not started, user is logged in",
      userData: authLoggedInWithPicks,
      tourneyStage: 1,
      result: true,
    },
    {
      scenario: "tourney has not started, user is not logged in",
      userData: authNotLoggedIn,
      tourneyStage: 1,
      result: false,
    },
    {
      scenario: "tourney has started, user is logged in, and has picks",
      userData: authLoggedInWithPicks,
      tourneyStage: 2,
      result: true,
    },
    {
      scenario: "tourney has started, user is logged in, but has no picks",
      userData: authLoggedInWithNoPicks,
      tourneyStage: 2,
      result: false,
    },
    {
      scenario: "tourney has started, user is not logged in",
      userData: authNotLoggedIn,
      tourneyStage: 2,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      updateStore(setAuth, test.userData);
      updateStore(_loadTourneyStage, test.tourneyStage);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useShouldPayoutShow(), {
        wrapper,
      });

      expect(result.current).toBe(test.result);
    });
  });
});
