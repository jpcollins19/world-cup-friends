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
  flexBothClass,
  elevateClass,
  mockWindowMobileView,
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

  describe("classTesting", () => {
    const buttonContClass = "button-cont-submit";
    const buttonClass = "button-submit";

    const buttonContClassBaseInfo = `${flexBothClass} ${elevateClass} rounded-lg w-fit`;
    const buttonContClassSizeMed = "my-5";

    const notDisabledButtonContClassInfo = "bg-zinc-300";
    const disabledButtonContClassInfo = "bg-zinc-200";

    const buttonClassBaseInfo = "cursor-pointer rounded-lg font-bold";

    const notDisabledButtonColor = "text-black";
    const disabledButtonColor = "text-gray-500";

    const notDisabledButtonHover = "hover:bg-zinc-400";

    const notDisabledButtonBorder = "border border-solid border-black";

    const buttonClassComp = "py-2 px-10";
    const buttonClassMobile = "py-4 px-10 text-2xl";

    const notDisabled = {
      comp: [
        {
          testId: buttonContClass,
          result: `${buttonContClassBaseInfo} ${buttonContClassSizeMed} ${notDisabledButtonContClassInfo}`,
        },
        {
          testId: buttonClass,
          result: `${buttonClassBaseInfo} ${notDisabledButtonColor} ${notDisabledButtonHover} ${notDisabledButtonBorder} ${buttonClassComp}`,
        },
      ],
      mobile: [
        {
          testId: `${buttonContClass}-mobile`,
          result: `${buttonContClassBaseInfo} ${buttonContClassSizeMed} ${notDisabledButtonContClassInfo}`,
        },
        {
          testId: `${buttonClass}-mobile`,
          result: `${buttonClassBaseInfo} ${notDisabledButtonColor} ${notDisabledButtonHover} ${notDisabledButtonBorder} ${buttonClassMobile}`,
        },
      ],
    };

    describe("notDisabled - comp", () => {
      notDisabled.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          render(<Button text={submitUpperCase} />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("notDisabled - mobile", () => {
      notDisabled.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          render(<Button text={submitUpperCase} />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    const disabled = {
      comp: [
        {
          testId: buttonContClass,
          result: `${buttonContClassBaseInfo} ${buttonContClassSizeMed} ${disabledButtonContClassInfo}`,
        },
        {
          testId: buttonClass,
          result: `${buttonClassBaseInfo} ${disabledButtonColor} ${buttonClassComp}`,
        },
      ],
      mobile: [
        {
          testId: `${buttonContClass}-mobile`,
          result: `${buttonContClassBaseInfo} ${buttonContClassSizeMed} ${disabledButtonContClassInfo}`,
        },
        {
          testId: `${buttonClass}-mobile`,
          result: `${buttonClassBaseInfo} ${disabledButtonColor} ${buttonClassMobile}`,
        },
      ],
    };

    describe("disabled - comp", () => {
      disabled.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(false);

          render(<Button text={submitUpperCase} disabled={true} />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("disabled - mobile", () => {
      disabled.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          render(<Button text={submitUpperCase} disabled={true} />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    const buttonContClassSizeSmall = "my-1";
    const buttonClassSizeSmall = "px-3";

    const sizeSmallTesting = {
      comp: [
        {
          testId: buttonContClass,
          result: `${buttonContClassBaseInfo} ${buttonContClassSizeSmall} ${disabledButtonContClassInfo}`,
        },
        {
          testId: buttonClass,
          result: `${buttonClassBaseInfo} ${disabledButtonColor} ${buttonClassSizeSmall}`,
        },
      ],
      mobile: [
        {
          testId: `${buttonContClass}-mobile`,
          result: `${buttonContClassBaseInfo} ${buttonContClassSizeSmall} ${disabledButtonContClassInfo}`,
        },
        {
          testId: `${buttonClass}-mobile`,
          result: `${buttonClassBaseInfo} ${disabledButtonColor} ${buttonClassMobile}`,
        },
      ],
    };

    describe("sizeSmall - comp", () => {
      sizeSmallTesting.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(false);

          render(
            <Button text={submitUpperCase} disabled={true} size="small" />,
          );

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("sizeSmall - mobile", () => {
      sizeSmallTesting.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          render(
            <Button text={submitUpperCase} disabled={true} size="small" />,
          );

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      render(<Button text={submitUpperCase} />);

      const testId = await getButtonTestId(submitLowerCase, true);

      const button = await getButton(submitLowerCase, true);

      expect(testId).toBeInTheDocument();
      expect(await getText(submitUpperCase)).toBeInTheDocument();
      expect(button).not.toHaveAttribute("form");
      expect(button).not.toHaveAttribute("type");
    });
  });
});
