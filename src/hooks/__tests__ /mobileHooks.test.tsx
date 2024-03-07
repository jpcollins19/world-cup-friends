import * as hooks from "../";
import { mockIsMobile } from "../../components/testingUtils";

describe("useIsMobile ", () => {
  const testsToRun = [
    { isMobile: true, result: true },
    { isMobile: false, result: false },
  ];

  testsToRun.forEach((test) => {
    it(`when mobile view is ${test.isMobile}`, () => {
      mockIsMobile(test.isMobile);

      const result = hooks.useIsMobile();

      expect(result).toBe(test.result);
    });
  });
});
