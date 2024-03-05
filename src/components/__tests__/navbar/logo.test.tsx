import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../../testingUtils";
import Navbar from "../../navbar/Navbar";
import Logo from "../../navbar/Logo";

describe("<Logo/>", () => {
  const logoImage =
    "https://1000logos.net/wp-content/uploads/2023/05/World-Cup-2026-Logo.png";

  it("should render the component", async () => {
    render(<Logo />);

    const testId = await getTestIdTag("logo");

    expect(testId).toBeInTheDocument();
    expect(testId).toHaveAttribute("src", logoImage);
    expect(testId).toHaveAttribute("alt", "World Cup Logo");
  });

  describe("mobile vs. comp testing", () => {
    it("renders the mobile page", async () => {
      render(<Logo isMobile={true} />);

      const testId = await getTestIdTag("logo-mobile");

      expect(testId).toBeInTheDocument();
      expect(testId).toHaveAttribute("src", logoImage);
      expect(testId).toHaveAttribute("alt", "World Cup Logo");
    });

    describe("classTesting", () => {
      const logoClass = "logo";

      const logoClassBaseInfo = "w-full h-auto py-5";

      const testsToRun = {
        comp: [
          {
            testId: logoClass,
            result: logoClassBaseInfo,
          },
        ],
        mobile: [
          {
            testId: `${logoClass}-mobile`,
            result: logoClassBaseInfo,
          },
        ],
      };

      describe("comp view", () => {
        testsToRun.comp.forEach((test) => {
          it(`${test.testId}`, async () => {
            render(<Logo />);

            const testId = await getTestIdTag(test.testId);
            expect(testId).toHaveClass(test.result);
          });
        });
      });

      describe("mobile view", () => {
        testsToRun.mobile.forEach((test) => {
          it(`${test.testId}`, async () => {
            render(<Logo isMobile={true} />);

            const testId = await getTestIdTag(test.testId);
            expect(testId).toHaveClass(test.result);
          });
        });
      });
    });
  });
});
