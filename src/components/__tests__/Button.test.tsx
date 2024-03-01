import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  getText,
  getButtonTestId,
  getButton,
  submitUpperCase,
  submitLowerCase,
  getTestIdTag,
} from "../testingUtils";
import { Button } from "../buffet";

describe("<Button/>", () => {
  it("should render the component with accurate text and no form or type attributes", async () => {
    render(<Button text={submitUpperCase} />);

    const testId = await getButtonTestId(submitLowerCase);

    const button = await getButton(submitLowerCase);

    expect(testId).toBeInTheDocument();
    expect(await getText(submitUpperCase)).toBeInTheDocument();
    expect(button).not.toHaveAttribute("form");
    expect(button).not.toHaveAttribute("type");
  });

  it("button is disabled", async () => {
    render(<Button text={submitUpperCase} disabled={true} />);

    const button = await getButton(submitLowerCase);

    expect(button).toBeDisabled();
  });

  it("button is not disabled", async () => {
    render(<Button text={submitUpperCase} disabled={false} />);

    const button = await getButton(submitLowerCase);

    expect(button).not.toBeDisabled();
  });

  it("when form is sent down, form is the formId and type is submit", async () => {
    const formId = "form-test";

    render(<Button text={submitUpperCase} form={formId} />);

    const button = await getButton(submitLowerCase);

    expect(button).toHaveAttribute("form", formId);
    expect(button).toHaveAttribute("type", "submit");
  });

  describe("mobile vs. comp testing", () => {
    it("renders the mobile page", async () => {
      render(<Button text={submitUpperCase} isMobile={true} />);

      const testId = await getButtonTestId(submitLowerCase, true);

      const button = await getButton(submitLowerCase, true);

      expect(testId).toBeInTheDocument();
      expect(await getText(submitUpperCase)).toBeInTheDocument();
      expect(button).not.toHaveAttribute("form");
      expect(button).not.toHaveAttribute("type");
    });

    describe("classTesting", () => {
      const buttonClass = "button-submit";

      const buttonClassBaseInfo = "px-3 cursor-pointer rounded-lg font-bold";

      const testsToRun = {
        comp: [
          {
            testId: buttonClass,
            result: `${buttonClassBaseInfo} min-w-[10rem] py-2`,
          },
        ],
        mobile: [
          {
            testId: `${buttonClass}-mobile`,
            result: `${buttonClassBaseInfo} min-w-[15rem] text-2xl py-4`,
          },
        ],
      };

      describe("comp view", () => {
        testsToRun.comp.forEach((test) => {
          it(`${test.testId}`, async () => {
            render(<Button text={submitUpperCase} />);

            const testId = await getTestIdTag(test.testId);
            expect(testId).toHaveClass(test.result);
          });
        });
      });

      describe("mobile view", () => {
        testsToRun.mobile.forEach((test) => {
          it(`${test.testId}`, async () => {
            render(<Button text={submitUpperCase} isMobile={true} />);

            const testId = await getTestIdTag(test.testId);
            expect(testId).toHaveClass(test.result);
          });
        });
      });
    });
  });
});
