import * as funcs from "../utils";

describe("geti18n", () => {
  const testsToRun = [
    { str: "testStr", result: "this is a test" },
    { str: "password", result: "password" },
  ];

  testsToRun.forEach((test) => {
    it(`${test.str}`, () => {
      const result = funcs.geti18n(test.str as any);

      expect(result).toBe(test.result);
    });
  });
});
