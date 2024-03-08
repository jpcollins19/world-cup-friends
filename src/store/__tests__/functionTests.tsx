import * as funcs from "../utils";
import { routes } from "../utils";
import { mockIsMobile } from "../../components/testingUtils";

describe("geti18n", () => {
  const testsToRun = [
    { str: "viewPw", result: "View password" },
    { str: "password", result: "password" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.str}`, () => {
      const result = funcs.geti18n(test.str as any);

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
      const result = funcs.createUrlFromText(test.str);

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
      const result = funcs.getMobileTestId(test.boolean);

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
      mockIsMobile(test.isMobile);

      const result = funcs.getPageTestId(test.str);

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
      const result = funcs.cap1stLetter(test.str);

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
      const result = funcs.getTextFromUrl(test.url);

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
      const result = funcs.calcPayout(test.users);

      expect(result.firstPlace).toBe(test.result.firstPlace);
      expect(result.secondPlace).toBe(test.result.secondPlace);
      expect(result.thirdPlace).toBe(test.result.thirdPlace);
      expect(result.numOfPicks).toBe(test.result.numOfPicks);
    });
  });
});
