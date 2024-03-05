import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { elevateClass, getTestIdTag } from "../../testingUtils";
import Navbar from "../../navbar/Navbar";
import Logo from "../../navbar/Logo";

describe("<Logo/>", () => {
  const logoImage =
    "https://1000logos.net/wp-content/uploads/2023/05/World-Cup-2026-Logo.png";

  it("should render the component", async () => {
    render(<Logo />);

    const testId = await getTestIdTag("logo");
    const imageTestId = await getTestIdTag("logo-image");

    expect(testId).toBeInTheDocument();
    expect(imageTestId).toBeInTheDocument();
    expect(imageTestId).toHaveAttribute("src", logoImage);
    expect(imageTestId).toHaveAttribute("alt", "World Cup Logo");
  });

  it("logo link takes you to the home page", async () => {
    render(<Logo />);

    const testId = await getTestIdTag("logo");

    expect(testId).toHaveAttribute("href", "/");
  });

  describe("classTesting", () => {
    const logoClass = "logo";
    const logoImageClass = "logo-image";

    const logoClassBaseInfo = "w-full h-1/5";
    const logoImageClassBaseInfo = "w-full h-full";

    const testsToRun = {
      comp: [
        {
          testId: logoClass,
          result: logoClassBaseInfo,
        },
        {
          testId: logoImageClass,
          result: logoImageClassBaseInfo,
        },
      ],
      mobile: [
        {
          testId: `${logoClass}-mobile`,
          result: logoClassBaseInfo,
        },
        {
          testId: `${logoImageClass}-mobile`,
          result: logoImageClassBaseInfo,
        },
      ],
    };

    describe("comp", () => {
      testsToRun.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          render(<Logo />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("mobile", () => {
      testsToRun.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          render(<Logo isMobile={true} />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      render(<Logo isMobile={true} />);

      const testId = await getTestIdTag("logo-mobile");
      const imageTestId = await getTestIdTag("logo-image-mobile");

      expect(testId).toBeInTheDocument();
      expect(imageTestId).toBeInTheDocument();
      expect(imageTestId).toHaveAttribute("src", logoImage);
      expect(imageTestId).toHaveAttribute("alt", "World Cup Logo");
    });
  });
});
