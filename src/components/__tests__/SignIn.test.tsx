import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  changeInputText,
  click,
  emailInputTestId,
  getButton,
  getButtonTestId,
  getTestIdTag,
  getText,
  matchMediaWorkAround,
  mockIsMobile,
  pwInputTestId,
  submitLowerCase,
  submitUpperCase,
} from "../testingUtils";
import SignIn from "../signIn/SignIn";
import store from "../../store";

//jest.mock("react-responsive");

describe("<SignIn/>", () => {
  beforeEach(() => {
    matchMediaWorkAround();
  });

  it("should render the SignIn page", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const pageTestId = await getTestIdTag("signIn-page");

    expect(pageTestId).toBeInTheDocument();
    expect(pageTestId).toHaveTextContent("Sign In");
  });

  it("toasterContainer renders", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const toasterContTestId = await getTestIdTag("toaster-cont");

    expect(toasterContTestId).toBeInTheDocument();
  });

  it("both TextFields render", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const emailInput = await getTestIdTag(emailInputTestId);
    const pwInput = await getTestIdTag(pwInputTestId);

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "text");
    expect(pwInput).toHaveAttribute("type", "password");
  });

  it("submit button renders as disabled", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const buttonTestId = await getButtonTestId(submitLowerCase);

    const button = await getButton(submitLowerCase);

    expect(buttonTestId).toBeInTheDocument();
    expect(await getText(submitUpperCase)).toBeInTheDocument();
    expect(button).toHaveAttribute("form", "sign-in");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("submit button being enabled", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const emailInput = await getTestIdTag(emailInputTestId);
    const pwInput = await getTestIdTag(pwInputTestId);

    await changeInputText(emailInput, "joe@gmail.com");
    await changeInputText(pwInput, "fakePassword");

    const button = await getButton(submitLowerCase);

    expect(button).not.toBeDisabled();
  });

  it("view pw button works", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const viewPw = await getTestIdTag("signIn-view-pw");

    await click(viewPw);

    const pwInput = await getTestIdTag(pwInputTestId);

    expect(pwInput).toHaveAttribute("type", "text");
  });

  it("3 links at bottom of page have accurate text and take you to correct urls", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const pwLinkTestId = await getTestIdTag("linkText-link-forgot-password");
    const createAccountLinkTestId = await getTestIdTag(
      "linkText-link-create-account",
    );
    const cancelLinkTestId = await getTestIdTag("linkText-link-cancel");

    expect(pwLinkTestId).toHaveAttribute("href", "/forgot-password");
    expect(pwLinkTestId).toHaveTextContent("Forgot Password");

    expect(createAccountLinkTestId).toHaveAttribute("href", "/create-account");
    expect(createAccountLinkTestId).toHaveTextContent("Create Account");

    expect(cancelLinkTestId).toHaveAttribute("href", "/");
    expect(cancelLinkTestId).toHaveTextContent("Cancel");
  });

  describe("classTesting", () => {
    const singInBase = "signIn-";

    const signInContainerClass = `${singInBase}cont`;
    const headerClass = `${singInBase}header`;
    const viewPwClass = `${singInBase}view-pw`;
    const linkTextClass = `${singInBase}linkText`;

    const signInContainerClassBaseInfo =
      "border-solid border-2 border-black rounded-2xl bg-gradient-to-b from-blue-300 via-white to-blue-300";

    const headerClassBaseInfo = "text-center";

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
          result: `${viewPwClassBaseInfo} text-base`,
        },
        {
          testId: viewPwClass,
          result: `${viewPwClassBaseInfo} text-base`,
        },
      ],
      mobile: [
        {
          testId: signInContainerClass,
          result: `${signInContainerClassBaseInfo} h-3/6 w-8/12`,
        },
        {
          testId: headerClass,
          result: `${headerClassBaseInfo} text-6xl mt-20`,
        },
        {
          testId: viewPwClass,
          result: `${viewPwClassBaseInfo} text-2xl`,
        },
        {
          testId: linkTextClass,
          result: `mt-20`,
        },
      ],
    };

    describe("comp", () => {
      testsToRun.comp.forEach((test) => {
        beforeEach(() => {
          mockIsMobile(false);
        });

        it(`${test.testId}`, async () => {
          render(
            <Provider store={store}>
              <SignIn />
            </Provider>,
          );

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("mobile", () => {
      testsToRun.mobile.forEach((test) => {
        beforeEach(() => {
          mockIsMobile(true);
        });

        it(`${test.testId}`, async () => {
          render(
            <Provider store={store}>
              <SignIn />
            </Provider>,
          );

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      render(
        <Provider store={store}>
          <SignIn />
        </Provider>,
      );

      mockIsMobile(true);

      const pageTestId = await getTestIdTag("signIn-page-mobile");

      expect(pageTestId).toBeInTheDocument();
      expect(pageTestId).toHaveTextContent("Sign In");
    });
  });
});
