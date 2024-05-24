import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag, mockWindowMobileView } from "../../testingUtils";
import { geti18n } from "../../../store";
import { ErrorMessage } from "../../buffet";

describe("<Error/>", () => {
  it("should render the component with accurate text", async () => {
    render(<ErrorMessage text={geti18n("invalidEmailOrPw")} />);

    const pageTestId = await getTestIdTag("error-message");
    const textTestId = await getTestIdTag("error-message-text");

    expect(pageTestId).toBeTruthy();
    expect(textTestId).toBeTruthy();
    expect(textTestId.textContent).toEqual(
      "Invalid Email Address and/or Password",
    );
  });

  describe("classTesting", () => {
    const textSizeClass = "error-message-text";

    const textSizeClassBaseInfo = "ml-2";

    const testsToRun = {
      comp: [
        {
          testId: textSizeClass,
          result: `${textSizeClassBaseInfo}`,
        },
      ],
      mobile: [
        {
          testId: `${textSizeClass}-mobile`,
          result: `${textSizeClassBaseInfo} text-2xl`,
        },
      ],
    };

    describe("comp", () => {
      testsToRun.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          render(<ErrorMessage text={geti18n("invalidEmailOrPw")} />);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("mobile", () => {
      testsToRun.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          render(<ErrorMessage text={geti18n("invalidEmailOrPw")} />);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockWindowMobileView(true);

      render(<ErrorMessage text={geti18n("invalidEmailOrPw")} />);

      const pageTestId = await getTestIdTag("error-message-mobile");
      const textTestId = await getTestIdTag("error-message-text-mobile");

      expect(pageTestId).toBeTruthy();
      expect(textTestId).toBeTruthy();
      expect(textTestId.textContent).toEqual(
        "Invalid Email Address and/or Password",
      );
    });
  });
});
