import * as funcs from "../utils";
import {
  calcPayoutSchema,
  getUserGroupPicks,
  groupLetters,
  routes,
  tourneyStartDate,
} from "../utils";
import { mockWindowMobileView } from "../../components/testingUtils";
import { UserSchema } from "../users_store";
import {
  createAllGroups,
  createGroup,
  createGroupPicks_Pool,
  CreateGroupPicksSchema,
  createUser,
  createUserGroupPicks,
  UserSingleGroupPickSetupSchema,
} from "../../hooks/fixtures";
import {
  UserGroupPlacementsSchema,
  UserSingleGroupPlacementsSchema,
} from "../../components/myPicks/unlocked/GroupPicksSchema";

describe("geti18n", () => {
  const testsToRun = [
    { str: "viewPw", result: "View password" },
    { str: "password", result: "password" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.str}`, () => {
      const result: string = funcs.geti18n(test.str as any);

      expect(result).toBe(test.result);
    });
  });
});

describe("createUrlFromText", () => {
  const testsToRun = [
    { str: "Submit", result: "submit" },
    { str: "Test Text", result: "test-text" },
    { str: "tHis Is a LoNG MesSage", result: "this-is-a-long-message" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.str}`, () => {
      const result: string = funcs.createUrlFromText(test.str);

      expect(result).toBe(test.result);
    });
  });
});

describe("getMobileTestId", () => {
  const testsToRun = [
    { boolean: true, result: "-mobile" },
    { boolean: false, result: "" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.boolean}`, () => {
      const result: string = funcs.getMobileTestId(test.boolean);

      expect(result).toBe(test.result);
    });
  });
});

describe("getPageTestId", () => {
  const signInPage = "signIn-page";
  const navbar = "navbar";

  const testsToRun = [
    { str: signInPage, isMobile: false, result: signInPage },
    { str: signInPage, isMobile: true, result: `${signInPage}-mobile` },
    { str: navbar, isMobile: false, result: navbar },
    { str: navbar, isMobile: true, result: `${navbar}-mobile` },
  ];

  testsToRun.forEach((test) => {
    it(`${test.str}`, () => {
      mockWindowMobileView(test.isMobile);

      const result: string = funcs.getPageTestId(test.str);

      expect(result).toBe(test.result);
    });
  });
});

describe("cap1stLetter", () => {
  const testsToRun = [
    { str: "name", result: "Name" },
    { str: "odds", result: "Odds" },
    { str: "frank", result: "Frank" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.str}`, () => {
      const result: string = funcs.cap1stLetter(test.str);

      expect(result).toBe(test.result);
    });
  });
});

describe("getTextFromUrl", () => {
  const testsToRun = [
    { url: routes.admin, result: "Admin" },
    { url: routes.leaderboard, result: "Leaderboard" },
    { url: routes.myPicks, result: "My Picks" },
    { url: routes.poolPicks, result: "Pool Picks" },
    { url: routes.groupDetails, result: "Group Details" },
    { url: routes.rules, result: "Rules/General Info" },
    { url: routes.signIn, result: "Sign In" },
    { url: routes.signOut, result: "Sign Out" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.url}`, () => {
      const result: string = funcs.getTextFromUrl(test.url);

      expect(result).toBe(test.result);
    });
  });
});

describe("calcPayout", () => {
  const testsToRun = [
    {
      scenario: 1,
      users: [1],
      result: {
        firstPlace: 15,
        secondPlace: 5,
        thirdPlace: 0,
        numOfPicks: 1,
      },
    },
    {
      scenario: 2,
      users: [1, 2],
      result: {
        firstPlace: 30,
        secondPlace: 10,
        thirdPlace: 0,
        numOfPicks: 2,
      },
    },
    {
      scenario: 3,
      users: [1, 2, 3],
      result: {
        firstPlace: 45,
        secondPlace: 15,
        thirdPlace: 0,
        numOfPicks: 3,
      },
    },
    {
      scenario: 4,
      users: [1, 2, 3, 4],
      result: {
        firstPlace: 60,
        secondPlace: 20,
        thirdPlace: 0,
        numOfPicks: 4,
      },
    },
    {
      scenario: 5,
      users: [1, 2, 3, 4, 5],
      result: {
        firstPlace: 60,
        secondPlace: 20,
        thirdPlace: 20,
        numOfPicks: 5,
      },
    },
    {
      scenario: 9,
      users: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      result: {
        firstPlace: 120,
        secondPlace: 40,
        thirdPlace: 20,
        numOfPicks: 9,
      },
    },
    {
      scenario: 15,
      users: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      result: {
        firstPlace: 210,
        secondPlace: 70,
        thirdPlace: 20,
        numOfPicks: 15,
      },
    },
  ];

  testsToRun.forEach((test) => {
    it(`submitted picks count = ${test.scenario}`, () => {
      const result: calcPayoutSchema = funcs.calcPayout(test.users);

      expect(result.firstPlace).toBe(test.result.firstPlace);
      expect(result.secondPlace).toBe(test.result.secondPlace);
      expect(result.thirdPlace).toBe(test.result.thirdPlace);
      expect(result.numOfPicks).toBe(test.result.numOfPicks);
    });
  });
});

describe("formatEmail", () => {
  const testsToRun = [
    { email: "Joe@gmail.com", result: "joe@gmail.com" },
    {
      email: "JOE@gmail.com",
      result: "joe@gmail.com",
    },
    {
      email: "ThISIsATest@gmail.com",
      result: "thisisatest@gmail.com",
    },
  ];

  testsToRun.forEach((test) => {
    it(test.email, () => {
      const result: string = funcs.formatEmail(test.email);

      expect(result).toBe(test.result);
    });
  });
});

describe("validateEmail", () => {
  const testsToRun = [
    { email: "Joe@gmail.com", result: true },
    { email: "joe@gmail.com", result: true },
    { email: "GoArseNAL@gmail.com", result: true },
    { email: "Joegmail.com", result: false },
    { email: "Joe@gmail@yahoo.com", result: false },
    { email: "Joe@gmail", result: false },
  ];

  testsToRun.forEach((test) => {
    it(test.email, () => {
      const result: boolean = funcs.validateEmail(test.email);

      expect(result).toBe(test.result);
    });
  });
});

describe("getSpecificKeyFromArray", () => {
  const user1: UserSchema = createUser();
  const user2: UserSchema = createUser();
  const user3: UserSchema = createUser();

  const users = [user1, user2, user3];

  const userEmails = users.map((user) => user.email);
  const userNames = users.map((user) => user.name);

  const testsToRun = [
    { arr: users, key: "email", result: userEmails },
    { arr: users, key: "name", result: userNames },
  ];

  testsToRun.forEach((test) => {
    it(test.key, () => {
      const result: boolean = funcs.getSpecificKeyFromArray(test.arr, test.key);

      expect(result).toEqual(test.result);
    });
  });
});

describe("formatStrToLowerCase ", () => {
  const testsToRun = [
    { str: "JoE", result: "joe" },
    { str: "JOE", result: "joe" },
    { str: "ThiSISAtEst", result: "thisisatest" },
  ];

  testsToRun.forEach((test) => {
    it(test.str, () => {
      const result: boolean = funcs.formatStrToLowerCase(test.str);

      expect(result).toEqual(test.result);
    });
  });
});

describe("createPreTourneyDataNotAvailableYetMessage", () => {
  const leaderboard = "Leaderboard";
  const poolPicks = "Pool Picks";

  const testsToRun = [
    {
      page: leaderboard,
      result: `${leaderboard} will not be viewable until the tournament commences on ${tourneyStartDate}`,
    },
    {
      page: poolPicks,
      result: `${poolPicks} will not be viewable until the tournament commences on ${tourneyStartDate}`,
    },
  ];

  testsToRun.forEach((test) => {
    it(test.page, () => {
      const result: string = funcs.createPreTourneyDataNotAvailableYetMessage(
        test.page,
      );

      expect(result).toEqual(test.result);
    });
  });
});

describe("removeForwardSlashFromRoute", () => {
  const testsToRun = [
    { route: routes.myProfile, result: "my-profile" },
    { route: routes.poolPicks, result: "pool-picks" },
    { route: routes.leaderboard, result: "leaderboard" },
  ];

  testsToRun.forEach((test) => {
    it(test.route, () => {
      const result: string = funcs.removeForwardSlashFromRoute(test.route);

      expect(result).toEqual(test.result);
    });
  });
});

describe("getUserGroupPicks", () => {
  const teams = createAllGroups();

  describe("when user has picks", () => {
    const user1 = createUser({ name: "Joe" });
    const user2 = createUser({ name: "Kelly" });

    const user1GroupPicks: UserSingleGroupPickSetupSchema[] = [
      { group: "A", thirdPlaceToAdvanceToKo: true },
      { group: "B", thirdPlaceToAdvanceToKo: true },
      { group: "C", thirdPlaceToAdvanceToKo: true },
      { group: "D", thirdPlaceToAdvanceToKo: true },
      { group: "E", thirdPlaceToAdvanceToKo: true },
      { group: "F", thirdPlaceToAdvanceToKo: true },
      { group: "G", thirdPlaceToAdvanceToKo: true },
      { group: "H", thirdPlaceToAdvanceToKo: true },
      { group: "I", thirdPlaceToAdvanceToKo: false },
      { group: "J", thirdPlaceToAdvanceToKo: false },
      { group: "K", thirdPlaceToAdvanceToKo: false },
      { group: "L", thirdPlaceToAdvanceToKo: false },
    ];

    const user2GroupPicks: UserSingleGroupPickSetupSchema[] = [
      { group: "A", thirdPlaceToAdvanceToKo: true },
      { group: "B", thirdPlaceToAdvanceToKo: true },
      { group: "C", thirdPlaceToAdvanceToKo: true },
      { group: "D", thirdPlaceToAdvanceToKo: true },
      { group: "E", thirdPlaceToAdvanceToKo: false },
      { group: "F", thirdPlaceToAdvanceToKo: true },
      { group: "G", thirdPlaceToAdvanceToKo: false },
      { group: "H", thirdPlaceToAdvanceToKo: true },
      { group: "I", thirdPlaceToAdvanceToKo: false },
      { group: "J", thirdPlaceToAdvanceToKo: true },
      { group: "K", thirdPlaceToAdvanceToKo: false },
      { group: "L", thirdPlaceToAdvanceToKo: true },
    ];

    const user1GroupPicksResult = createUserGroupPicks({
      groups: teams,
      userGroupPicks: user1GroupPicks,
    });

    const user2GroupPicksResult = createUserGroupPicks({
      groups: teams,
      userGroupPicks: user2GroupPicks,
    });

    const user1TestInfo: CreateGroupPicksSchema = {
      userId: user1.id,
      groupPicks: user1GroupPicksResult,
    };

    const user2TestInfo: CreateGroupPicksSchema = {
      userId: user2.id,
      groupPicks: user2GroupPicksResult,
    };

    const groupPicksResult = createGroupPicks_Pool({
      groups: teams,
      userGroupPicks: [user1TestInfo, user2TestInfo],
    });

    const testsToRun = [
      { userName: user1.name, user: user1TestInfo },
      { userName: user2.name, user: user2TestInfo },
    ];

    testsToRun.forEach((test) => {
      describe(test.userName, () => {
        groupLetters.forEach((letter) => {
          it(`group: ${letter}`, () => {
            const userUuid = test.user.userId;

            const result: UserGroupPlacementsSchema = funcs.getUserGroupPicks(
              userUuid,
              groupPicksResult,
              teams,
            );

            const userPicksTestSetup:
              | UserSingleGroupPlacementsSchema
              | undefined = test.user.groupPicks.find(
              (groupPick) => groupPick.group === letter,
            );

            if (userPicksTestSetup) {
              const userPickTestSetupTeamName1 = userPicksTestSetup["1"];
              const userPickTestSetupTeamName2 = userPicksTestSetup["2"];
              const userPickTestSetupTeamName3 = userPicksTestSetup["3"];
              const userPickTestSetupTeamName4 = userPicksTestSetup["4"];

              const thirdPlaceToAdvanceToKo =
                userPicksTestSetup["thirdPlaceToAdvanceToKo"];

              const expectedResultFromUserPickTestSetup = {
                group: letter,
                1: userPickTestSetupTeamName1,
                2: userPickTestSetupTeamName2,
                3: userPickTestSetupTeamName3,
                4: userPickTestSetupTeamName4,
                thirdPlaceToAdvanceToKo,
              };

              const groupAnswersFromResult = result.find(
                (answer) => answer.group === letter,
              );

              expect(groupAnswersFromResult).toEqual(
                expectedResultFromUserPickTestSetup,
              );
            }
          });
        });
      });
    });
  });

  describe("when user does not have picks", () => {
    const user1 = createUser({ name: "James" });
    const user2 = createUser({ name: "Craig" });

    const user1GroupPicks: UserSingleGroupPickSetupSchema[] = [
      { group: "A", thirdPlaceToAdvanceToKo: true },
      { group: "B", thirdPlaceToAdvanceToKo: true },
      { group: "C", thirdPlaceToAdvanceToKo: true },
      { group: "D", thirdPlaceToAdvanceToKo: true },
      { group: "E", thirdPlaceToAdvanceToKo: true },
      { group: "F", thirdPlaceToAdvanceToKo: true },
      { group: "G", thirdPlaceToAdvanceToKo: true },
      { group: "H", thirdPlaceToAdvanceToKo: true },
      { group: "I", thirdPlaceToAdvanceToKo: false },
      { group: "J", thirdPlaceToAdvanceToKo: false },
      { group: "K", thirdPlaceToAdvanceToKo: false },
      { group: "L", thirdPlaceToAdvanceToKo: false },
    ];

    const user1GroupPicksResult = createUserGroupPicks({
      groups: teams,
      userGroupPicks: user1GroupPicks,
    });

    const user2GroupPicksResult: UserSingleGroupPlacementsSchema[] =
      [] as UserSingleGroupPlacementsSchema[];

    const user1TestInfo: CreateGroupPicksSchema = {
      userId: user1.id,
      groupPicks: user1GroupPicksResult,
    };

    const user2TestInfo: CreateGroupPicksSchema = {
      userId: user2.id,
      groupPicks: user2GroupPicksResult,
    };

    const groupPicksResult = createGroupPicks_Pool({
      groups: teams,
      userGroupPicks: [user1TestInfo, user2TestInfo],
    });

    it(`returns an empty array`, () => {
      const userUuid = user2.id;

      const result: UserGroupPlacementsSchema = funcs.getUserGroupPicks(
        userUuid,
        groupPicksResult,
        teams,
      );

      expect(result).toEqual([]);
    });
  });
});
