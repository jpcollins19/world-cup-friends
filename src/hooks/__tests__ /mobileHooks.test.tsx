import * as hooks from "../";
import { mockWindowMobileView } from "../../components/testingUtils";

describe("useIsMobile ", () => {
  const testsToRun = [
    { isMobile: true, result: true },
    { isMobile: false, result: false },
  ];

  testsToRun.forEach((test) => {
    it(`when mobile view is ${test.isMobile}`, () => {
      mockWindowMobileView(test.isMobile);

      const result: boolean = hooks.useIsMobile();

      expect(result).toBe(test.result);
    });
  });
});
