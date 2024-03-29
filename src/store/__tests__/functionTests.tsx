import * as funcs from "../utils";
import { calcPayoutSchema, routes } from "../utils";
import { mockWindowMobileView } from "../../components/testingUtils";
import { _loadUsers, UserSchema } from "../users_store";
import { createUser } from "../../hooks/fixtures";

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

describe("createUrlFromText ", () => {
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

describe("getMobileTestId ", () => {
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

describe("getPageTestId ", () => {
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

describe("getTextFromUrl ", () => {
  const testsToRun = [
    { url: routes.admin, result: "Admin" },
    { url: routes.leaderboard, result: "Leaderboard" },
    { url: routes.myPicks, result: "My Picks" },
    { url: routes.poolPicks, result: "Pool Picks" },
    { url: routes.groupDetails, result: "Group Details" },
    { url: routes.rules, result: "Rules/General Info" },
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

describe("formatEmail ", () => {
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

describe("validateEmail ", () => {
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

describe("getSpecificKeyFromArray ", () => {
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
