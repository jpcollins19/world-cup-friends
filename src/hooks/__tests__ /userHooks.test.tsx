import * as React from "react";
import "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks";
import {
  setAuth,
  UserSchema,
  _loadUsers,
  groupLetters,
  _loadGroupPicks,
  _loadTeams,
} from "../../store";
import * as hooks from "../";
import {
  createAllGroups,
  createGroupPicks_Pool,
  CreateGroupPicksSchema,
  createUser,
  createUserGroupPicks,
  getFakerInfo,
  UserSingleGroupPickSetupSchema,
} from "../fixtures";
import {
  getDataFromStore,
  getWrapper,
  ignoreReactDOMRenderError,
  updateStore,
  updateTourneyStage,
} from "./hookUtils";
import { useUserHas3rdPlaceTeamAdvancing } from "../";

beforeAll(() => {
  ignoreReactDOMRenderError();
});

const authUserWithPicks: UserSchema = createUser({ tiebreaker: 101 });
const authUserWithNoPicks: UserSchema = createUser();

const authLoggedInWithPicks = { id: authUserWithPicks.id, tiebreaker: 101 };
const authLoggedInWithNoPicks = {
  id: authUserWithNoPicks.id,
  tiebreaker: null,
};
const authNotLoggedIn = { id: null };

const authLoggedInAndIsAdmin = { id: getFakerInfo("uuid"), isAdmin: true };

describe("useGetAuth", () => {
  const testsToRun = [
    {
      scenario: "user is logged in",
      auth: authLoggedInWithPicks,
      expectedResult: authUserWithPicks,
    },
    {
      scenario: "user is not logged in",
      auth: authNotLoggedIn,
      expectedResult: authNotLoggedIn,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      const auth = test.auth;

      updateStore(_loadUsers, [authUserWithPicks]);
      updateStore(setAuth, auth);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useGetAuth(), {
        wrapper,
      });

      expect(result.current).toMatchObject(test.expectedResult);
    });
  });
});

describe("useGetUser", () => {
  const user1: UserSchema = createUser();
  const user2: UserSchema = createUser();
  const user3: UserSchema = createUser();
  const user4: UserSchema = createUser();

  const testsToRun = [
    {
      scenario: "user1",
      userToFind: user1,
      expectedResult: user1,
      users: [user1, user2, user3, user4],
    },

    {
      scenario: "user2",
      userToFind: user2,
      expectedResult: user2,
      users: [user1, user2, user3, user4],
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      updateStore(_loadUsers, test.users);

      const wrapper = getWrapper();

      const { result } = renderHook(
        () => hooks.useGetUser(test.userToFind.id),
        {
          wrapper,
        },
      );

      expect(result.current).toEqual(test.expectedResult);
    });
  });
});

describe("useIsUserLoggedIn", () => {
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

describe("useIsUserAdmin", () => {
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

describe("useGetUsers", () => {
  const user1: UserSchema = createUser();
  const user2: UserSchema = createUser();
  const user3: UserSchema = createUser();
  const user4: UserSchema = createUser();

  const testsToRun = [
    {
      scenario: "1 user",
      users: [user1],
    },
    {
      scenario: "3 users ",
      users: [user1, user2, user3],
    },
    {
      scenario: "4 users",
      users: [user1, user2, user3, user4],
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      updateStore(_loadUsers, test.users);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useGetUsers(), {
        wrapper,
      });

      expect(result.current).toEqual(test.users);
    });
  });
});

describe("useGetActiveUsers", () => {
  const notSubmitted: UserSchema = createUser();
  const submitted: UserSchema = createUser({ tiebreaker: 100 });

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

describe("useShouldPayoutShow", () => {
  const testsToRun = [
    {
      scenario: "tourney has not started, user is logged in",
      userIsLoggedIn: true,
      userData: authLoggedInWithPicks,
      tourneyStage: 1,
      result: true,
    },
    {
      scenario: "tourney has not started, user is not logged in",
      userIsLoggedIn: false,
      userData: authNotLoggedIn,
      tourneyStage: 1,
      result: false,
    },
    {
      scenario: "tourney has started, user is logged in, and has picks",
      userIsLoggedIn: true,
      userData: authLoggedInWithPicks,
      tourneyStage: 2,
      result: true,
    },
    {
      scenario: "tourney has started, user is logged in, but has no picks",
      userIsLoggedIn: true,
      userData: authLoggedInWithNoPicks,
      tourneyStage: 2,
      result: false,
    },
    {
      scenario: "tourney has started, user is not logged in",
      userIsLoggedIn: false,
      userData: authNotLoggedIn,
      tourneyStage: 2,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      if (test.userIsLoggedIn) {
        updateStore(_loadUsers, [authUserWithPicks]);
      }

      updateStore(setAuth, test.userData);
      updateTourneyStage(test.tourneyStage);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useShouldPayoutShow(), {
        wrapper,
      });

      expect(result.current).toBe(test.result);
    });
  });
});

describe("useIsEmailInUse", () => {
  const joe: UserSchema = createUser({ email: "joe@gmail.com" });
  const kelly: UserSchema = createUser({ email: "kelly@gmail.com" });
  const anna: UserSchema = createUser({ email: "anna@gmail.com" });
  const alex: UserSchema = createUser({ email: "alex@gmail.com" });

  const users = [joe, kelly, anna, alex];

  const testsToRun = [
    {
      scenario: "user email is in use",
      newUserEmail: "joe@gmail.com",
      users,
      result: true,
    },
    {
      scenario: "user email is not in use",
      newUserEmail: "james@gmail.com",
      users,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      updateStore(_loadUsers, test.users);

      const wrapper = getWrapper();

      const { result } = renderHook(
        () => hooks.useIsEmailInUse(test.newUserEmail),
        {
          wrapper,
        },
      );

      expect(result.current).toBe(test.result);
    });
  });
});

describe("useIsNameInUse", () => {
  const joe: UserSchema = createUser({ name: "Joe" });
  const kelly: UserSchema = createUser({ name: "Kelly" });
  const anna: UserSchema = createUser({ name: "Anna" });
  const alex: UserSchema = createUser({ name: "ALeX" });

  const users = [joe, kelly, anna, alex];

  const testsToRun = [
    {
      scenario: "user name is in use, newUserName is all lowercase",
      newUserName: "joe",
      users,
      result: true,
    },
    {
      scenario: "user name is in use, newUserName is all uppercase",
      newUserName: "JOE",
      users,
      result: true,
    },
    {
      scenario:
        "user name is in use, newUserName is mixture of upper and lowercase",
      newUserName: "AlEx",
      users,
      result: true,
    },
    {
      scenario: "user name is not in use",
      newUserName: "james",
      users,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      updateStore(_loadUsers, test.users);

      const wrapper = getWrapper();

      const { result } = renderHook(
        () => hooks.useIsNameInUse(test.newUserName),
        {
          wrapper,
        },
      );

      expect(result.current).toBe(test.result);
    });
  });
});

describe("useUserGroupPicksSubmitted", () => {
  const testsToRun = [
    {
      scenario: "picks have been submitted",
      auth: authUserWithPicks,
      user: authLoggedInWithPicks,
      result: true,
    },
    {
      scenario: "picks have not been submitted",
      auth: authUserWithNoPicks,
      user: authLoggedInWithNoPicks,
      result: false,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.scenario, () => {
      updateStore(_loadUsers, [test.user]);
      updateStore(setAuth, test.auth);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useUserGroupPicksSubmitted(), {
        wrapper,
      });

      expect(result.current).toBe(test.result);
    });
  });
});

describe("useGetUserGroupPicks", () => {
  const user: UserSchema = createUser({ name: "Joe" });
  const auth = { id: user.id, tiebreaker: 101 };
  const teams = createAllGroups();

  const groupsToAdvance = ["A", "C", "D", "F", "G", "H", "J", "L"];

  const userGroupPicks: UserSingleGroupPickSetupSchema[] = groupLetters.map(
    (groupLetter) => {
      const thirdPlaceToAdvanceToKo = groupsToAdvance.includes(groupLetter);

      return { group: groupLetter, thirdPlaceToAdvanceToKo };
    },
  );

  const userGroupPicksExpected = createUserGroupPicks({
    groups: teams,
    userGroupPicks: userGroupPicks,
  });

  user.groupPicks = userGroupPicksExpected;

  const userPicksForPool: CreateGroupPicksSchema = {
    userId: user.id,
    groupPicks: userGroupPicksExpected,
  };

  const groupPicksExpected = createGroupPicks_Pool({
    groups: teams,
    userGroupPicks: [userPicksForPool],
  });

  groupLetters.forEach((groupLetter) => {
    it(`group: ${groupLetter}`, () => {
      updateStore(_loadUsers, [user]);
      updateStore(setAuth, auth);
      updateStore(_loadTeams, teams);
      updateStore(_loadGroupPicks, groupPicksExpected);

      const wrapper = getWrapper();

      const { result } = renderHook(
        () => hooks.useGetUserGroupPicks(groupLetter),
        {
          wrapper,
        },
      );

      const singleGroupPicksExpected = userGroupPicksExpected.find(
        (group) => group.group === groupLetter,
      );

      if (singleGroupPicksExpected) {
        const firstExpected = singleGroupPicksExpected[1];
        const secondExpected = singleGroupPicksExpected[2];
        const thirdExpected = singleGroupPicksExpected[3];
        const fourthExpected = singleGroupPicksExpected[4];

        const firstResult = result.current[0].name;
        const secondResult = result.current[1].name;
        const thirdResult = result.current[2].name;
        const fourthResult = result.current[3].name;

        expect(firstResult).toEqual(firstExpected);
        expect(secondResult).toEqual(secondExpected);
        expect(thirdResult).toEqual(thirdExpected);
        expect(fourthResult).toEqual(fourthExpected);
      }
    });
  });
});

describe("useUserHas3rdPlaceTeamAdvancing", () => {
  const user: UserSchema = createUser({ name: "Joe" });
  const auth = { id: user.id, tiebreaker: 101 };
  const teams = createAllGroups();

  const groupsToAdvance = ["A", "C", "D", "F", "G", "H", "J", "L"];

  const userGroupPicks: UserSingleGroupPickSetupSchema[] = groupLetters.map(
    (groupLetter) => {
      const thirdPlaceToAdvanceToKo = groupsToAdvance.includes(groupLetter);

      return { group: groupLetter, thirdPlaceToAdvanceToKo };
    },
  );

  const userGroupPicksExpected = createUserGroupPicks({
    groups: teams,
    userGroupPicks: userGroupPicks,
  });

  user.groupPicks = userGroupPicksExpected;

  const userPicksForPool: CreateGroupPicksSchema = {
    userId: user.id,
    groupPicks: userGroupPicksExpected,
  };

  const groupPicksExpected = createGroupPicks_Pool({
    groups: teams,
    userGroupPicks: [userPicksForPool],
  });

  groupLetters.forEach((groupLetter) => {
    it(`group: ${groupLetter}`, () => {
      updateStore(_loadUsers, [user]);
      updateStore(setAuth, auth);
      updateStore(_loadTeams, teams);
      updateStore(_loadGroupPicks, groupPicksExpected);

      const wrapper = getWrapper();

      const { result } = renderHook(
        () => hooks.useUserHas3rdPlaceTeamAdvancing(groupLetter),
        {
          wrapper,
        },
      );

      const singleGroupPicksExpected = userGroupPicksExpected.find(
        (group) => group.group === groupLetter,
      );

      if (singleGroupPicksExpected) {
        expect(result.current).toEqual(
          singleGroupPicksExpected.thirdPlaceToAdvanceToKo,
        );
      }
    });
  });
});
