import * as React from "react";
import "@testing-library/jest-dom";
import {
  changeInputText,
  click,
  elevateClass,
  getButton,
  getButtonTestId,
  getTestIdTag,
  getText,
  getTextFieldTag,
  matchMediaWorkAround,
  mockWindowMobileView,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import CreateAccount from "../../createAccount/CreateAccount";

describe("<CreateAccount/>", () => {
  const getTestIds = async () => {
    const emailInput = await getTextFieldTag("email");
    const nameInput = await getTextFieldTag("name");
    const pwInput = await getTextFieldTag("password");
    const confirmPwInput = await getTextFieldTag("confirm-password");

    return { emailInput, nameInput, pwInput, confirmPwInput };
  };

  beforeEach(async () => {
    matchMediaWorkAround();
  });

  it("should render the component", async () => {
    renderWithProvider(<CreateAccount />);

    const pageTestId = await getTestIdTag("create-account-page");
    const errorMessageCont = await queryTestIdTag("error-message");

    expect(errorMessageCont).not.toBeInTheDocument();
    expect(pageTestId).toBeInTheDocument();
    expect(pageTestId).toHaveTextContent("Create Account");
  });

  // it("toasterContainer renders", async () => {
  //   renderWithProvider(<SignIn />);
  //
  //   const toasterContTestId = await getTestIdTag("toaster-cont");
  //
  //   expect(toasterContTestId).toBeInTheDocument();
  // });
  //
  // it("all four TextFields render", async () => {
  //   renderWithProvider(<SignIn />);
  //
  //   const emailInput = await getTestIdTag(emailInputTestId);
  //   const pwInput = await getTestIdTag(pwInputTestId);
  //
  //   expect(emailInput).toBeInTheDocument();
  //   expect(pwInput).toBeInTheDocument();
  //   expect(emailInput).toHaveAttribute("type", "text");
  //   expect(pwInput).toHaveAttribute("type", "password");
  // });

  it.todo(
    "make a describe block for button being disabled vs not disabled and incorporate tests below",
  );

  // it("submit button renders as disabled", async () => {
  //   renderWithProvider(<SignIn />);
  //
  //   const buttonTestId = await getButtonTestId(submitLowerCase);
  //
  //   const button = await getButton(submitLowerCase);
  //
  //   expect(buttonTestId).toBeInTheDocument();
  //   expect(await getText(submitUpperCase)).toBeInTheDocument();
  //   expect(button).toHaveAttribute("form", "sign-in");
  //   expect(button).toHaveAttribute("type", "submit");
  //   expect(button).toBeDisabled();
  // });
  //
  // it("submit button being enabled", async () => {
  //   renderWithProvider(<SignIn />);
  //
  //   const emailInput = await getTestIdTag(emailInputTestId);
  //   const pwInput = await getTestIdTag(pwInputTestId);
  //
  //   await changeInputText(emailInput, "joe@gmail.com");
  //   await changeInputText(pwInput, "fakePassword");
  //
  //   const button = await getButton(submitLowerCase);
  //
  //   expect(button).not.toBeDisabled();
  // });
  //
  // it("view pw button works", async () => {
  //   renderWithProvider(<SignIn />);
  //   const viewPw = await getTestIdTag("sign-in-view-pw");
  //
  //   await click(viewPw);
  //
  //   const pwInput = await getTestIdTag(pwInputTestId);
  //
  //   expect(pwInput).toHaveAttribute("type", "text");
  // });
  //
  // it("the two links at bottom of page have accurate text and take you to correct urls", async () => {
  //   renderWithProvider(<SignIn />);
  //
  //   const pwLinkTestId = await getTestIdTag("linkText-link-forgot-password");
  //   const createAccountLinkTestId = await getTestIdTag(
  //     "linkText-link-create-account",
  //   );
  //   const cancelLinkTestId = await getTestIdTag("linkText-link-cancel");
  //
  //   expect(pwLinkTestId).toHaveAttribute("href", "/forgot-password");
  //   expect(pwLinkTestId).toHaveTextContent("Forgot Password");
  //
  //   expect(createAccountLinkTestId).toHaveAttribute("href", "/create-account");
  //   expect(createAccountLinkTestId).toHaveTextContent("Create Account");
  //
  //   expect(cancelLinkTestId).toHaveAttribute("href", "/");
  //   expect(cancelLinkTestId).toHaveTextContent("Cancel");
  // });

  it.todo("write tests for remaining error handling below");

  describe("error handling", function () {
    it("when email is invalid", async () => {
      renderWithProvider(<CreateAccount />);

      const { emailInput, nameInput, pwInput, confirmPwInput } =
        await getTestIds();

      await changeInputText(emailInput, "f");
      await changeInputText(nameInput, "f");
      await changeInputText(pwInput, "f");
      await changeInputText(confirmPwInput, "f");

      const button = await getButton("create-account");

      await click(button);

      const errorMessageCont = await getTestIdTag("error-message");
      const errorMessageText = await getTestIdTag("error-message-text");

      expect(errorMessageCont).toBeInTheDocument();
      expect(errorMessageText).toHaveTextContent("Invalid Email Address");
    });
  });

  it.todo(
    "submitting an account successfully - check the store state for the new user?",
  );

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      renderWithProvider(<CreateAccount />);

      mockWindowMobileView(true);

      const pageTestId = await getTestIdTag("create-account-page-mobile");

      expect(pageTestId).toBeInTheDocument();
      expect(pageTestId).toHaveTextContent("Create Account");
    });
  });
});
