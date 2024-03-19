import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithRouter,
} from "../../testingUtils";
import { geti18n, routes } from "../../../store";
import { LinkText } from "../../buffet";

describe("<LinkText/>", () => {
  it("should render the component with accurate routing and text data", async () => {
    const component = (
      <LinkText
        input={{
          route: routes.createAccount,
          text: geti18n("forgotPassword"),
        }}
      />
    );

    renderWithRouter(component);
    const pageTestId = await getTestIdTag("linkText-component");
    const linkTestId = await getTestIdTag("linkText-link-forgot-password");

    expect(pageTestId).toBeInTheDocument();
    expect(linkTestId).toHaveAttribute("href", "/create-account");
    expect(linkTestId).toHaveTextContent("Forgot Password");
  });

  describe("classTesting", () => {
    const linkClass = "linkText-link-forgot-password";

    const linkClassBaseInfo = "text-shadow-smWhite font-bold text-blue-700";

    const testsToRun = {
      comp: [
        {
          testId: linkClass,
          result: `${linkClassBaseInfo}`,
        },
      ],
      mobile: [
        {
          testId: `${linkClass}-mobile`,
          result: `${linkClassBaseInfo} text-2xl`,
        },
      ],
    };

    describe("comp", () => {
      testsToRun.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          const component = (
            <LinkText
              input={{
                route: routes.createAccount,
                text: geti18n("forgotPassword"),
              }}
            />
          );

          renderWithRouter(component);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("mobile", () => {
      testsToRun.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          const component = (
            <LinkText
              input={{
                route: routes.createAccount,
                text: geti18n("forgotPassword"),
              }}
            />
          );

          renderWithRouter(component);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      const component = (
        <LinkText
          input={{
            route: routes.createAccount,
            text: geti18n("forgotPassword"),
          }}
        />
      );

      renderWithRouter(component);

      const pageTestId = await getTestIdTag("linkText-component-mobile");
      const linkTestId = await getTestIdTag(
        "linkText-link-forgot-password-mobile",
      );

      expect(pageTestId).toBeInTheDocument();
      expect(linkTestId).toHaveAttribute("href", "/create-account");
      expect(linkTestId).toHaveTextContent("Forgot Password");
    });
  });
});
