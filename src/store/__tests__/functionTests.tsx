import * as funcs from "../utils";
import { getPageTestId, getTextFromUrl, routes } from "../utils";
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
