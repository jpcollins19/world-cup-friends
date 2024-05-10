import * as React from "react";
import "@testing-library/jest-dom";
import {
  changeInputText,
  click,
  elevateClass,
  getButton,
  getButtonTestId,
  getEmailTextInput,
  getPwTextInput,
  getTestIdTag,
  getText,
  getTextFieldTag,
  matchMediaWorkAround,
  mockWindowMobileView,
  queryTestIdTag,
  renderWithProvider,
  submitLowerCase,
  submitUpperCase,
} from "../../testingUtils";
import SignIn from "../../signIn/SignIn";

//jest.mock("react-responsive");

describe("<SignIn/>", () => {
  const getTextFieldInputs = async () => {
    const emailInput = await getEmailTextInput();
    const pwInput = await getPwTextInput();

    return { emailInput, pwInput };
  };

  beforeEach(() => {
    matchMediaWorkAround();
  });

  it("should render the component", async () => {
    renderWithProvider(<SignIn />);

    const pageTestId = await getTestIdTag("sign-in-page");
    const errorMessageCont = await queryTestIdTag("error-message");

    expect(errorMessageCont).toBeFalsy();
    expect(pageTestId).toBeTruthy();
    expect(pageTestId).toHaveTextContent("Sign In");
  });

  it("toasterContainer renders", async () => {
    renderWithProvider(<SignIn />);

    const toasterContTestId = await getTestIdTag("toaster-cont");

    expect(toasterContTestId).toBeTruthy();
  });

  it("both TextFields render", async () => {
    renderWithProvider(<SignIn />);

    const { emailInput, pwInput } = await getTextFieldInputs();

    expect(emailInput).toBeTruthy();
    expect(pwInput).toBeTruthy();
    expect(emailInput).toHaveAttribute("type", "text");
    expect(pwInput).toHaveAttribute("type", "password");
  });

  it("submit button renders as disabled", async () => {
    renderWithProvider(<SignIn />);

    const buttonTestId = await getButtonTestId(submitLowerCase);

    const button = await getButton(submitLowerCase);

    expect(buttonTestId).toBeTruthy();
    expect(await getText(submitUpperCase)).toBeTruthy();
    expect(button).toHaveAttribute("form", "sign-in");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("enabling submit button", async () => {
    renderWithProvider(<SignIn />);

    const { emailInput, pwInput } = await getTextFieldInputs();

    await changeInputText(emailInput, "joe@gmail.com");
    await changeInputText(pwInput, "fakePassword");

    const button = await getButton(submitLowerCase);

    expect(button).not.toBeDisabled();
  });

  it("view pw button works", async () => {
    renderWithProvider(<SignIn />);
    const viewPw = await getTestIdTag("sign-in-view-pw");

    const { pwInput } = await getTextFieldInputs();

    expect(pwInput).toHaveAttribute("type", "password");

    await click(viewPw);

    expect(pwInput).toHaveAttribute("type", "text");
  });

  it("3 links at bottom of page have accurate text and take you to correct urls", async () => {
    renderWithProvider(<SignIn />);

    const pwLinkTestId = await getTestIdTag("linkText-link-forgot-password");
    const createAccountLinkTestId = await getTestIdTag(
      "linkText-link-create-account",
    );
    const cancelLinkTestId = await getTestIdTag("linkText-link-cancel");

    expect(pwLinkTestId).toHaveAttribute("href", "/forgot-password");
    expect(pwLinkTestId.textContent).toEqual("Forgot Password");

    expect(createAccountLinkTestId).toHaveAttribute("href", "/create-account");
    expect(createAccountLinkTestId.textContent).toEqual("Create Account");

    expect(cancelLinkTestId).toHaveAttribute("href", "/");
    expect(cancelLinkTestId.textContent).toEqual("Cancel");
  });

  describe("classTesting", () => {
    const singInBase = "sign-in-";

    const signInContainerClass = `${singInBase}cont`;
    const headerClass = `${singInBase}header`;
    const viewPwClass = `${singInBase}view-pw`;
    const linkTextContClass = `${singInBase}linkText-cont`;
    const linkTextClass = `${singInBase}linkText`;

    const signInContainerClassBaseInfo = `bg-gradient-to-b from-blue-300 via-white to-blue-300 border-solid ${elevateClass} border-2 border-black rounded-2xl`;

    const headerClassBaseInfo = "text-shadow-med text-white text-center";

    const viewPwClassBaseInfo = "text-center cursor-pointer";

    const testsToRun = {
      comp: [
        {
          testId: signInContainerClass,
          result: `${signInContainerClassBaseInfo} h-4/6 w-4/12`,
        },
        {
          testId: headerClass,
          result: `${headerClassBaseInfo} text-4xl mt-10`,
        },
        {
          testId: viewPwClass,
          result: `${viewPwClassBaseInfo} mt-5 mb-1 text-base`,
        },
        {
          testId: linkTextContClass,
          result: "mt-1",
        },
        {
          testId: `${linkTextClass}-/`, //all divs have the same class info, so testing just for the home (/) route
          result: "mt-4",
        },
      ],
      mobile: [
        {
          testId: `${signInContainerClass}-mobile`,
          result: `${signInContainerClassBaseInfo} h-2/5 w-8/12`,
        },
        {
          testId: `${headerClass}-mobile`,
          result: `${headerClassBaseInfo} text-6xl mt-20`,
        },
        {
          testId: `${viewPwClass}-mobile`,
          result: `${viewPwClassBaseInfo} mt-8 mb-3 text-2xl`,
        },
        {
          testId: `${linkTextContClass}-mobile`,
          result: `mt-5`,
        },
        {
          testId: `${linkTextClass}-mobile-/`, //all divs have the same class info, so testing just for the home (/) route
          result: "mt-8",
        },
      ],
    };

    describe("comp", () => {
      testsToRun.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          renderWithProvider(<SignIn />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("mobile", () => {
      testsToRun.mobile.forEach((test) => {
        beforeEach(() => {
          mockWindowMobileView(true);
        });

        it(`${test.testId}`, async () => {
          renderWithProvider(<SignIn />);
          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      renderWithProvider(<SignIn />);

      mockWindowMobileView(true);

      const pageTestId = await getTestIdTag("sign-in-page-mobile");

      expect(pageTestId).toBeTruthy();
      expect(pageTestId).toHaveTextContent("Sign In");
    });
  });
});
