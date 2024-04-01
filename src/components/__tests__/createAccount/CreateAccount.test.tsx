import * as React from "react";
import "@testing-library/jest-dom";
import {
  changeInputText,
  click,
  getButton,
  getEmailTextInput,
  getPwTextInput,
  getTestIdTag,
  getTextFieldTag,
  matchMediaWorkAround,
  mockWindowMobileView,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import CreateAccount from "../../createAccount/CreateAccount";
import { updateStore } from "../../../hooks/__tests__ /hookUtils";
import { _loadUsers, CreateAuthProps, UserSchema } from "../../../store";
import { createUser } from "../../../hooks/fixtures";
import restoreAllMocks = jest.restoreAllMocks;
import axios from "axios";

jest.mock("axios");

describe("<CreateAccount/>", () => {
  const getTextFieldInputs = async () => {
    const emailInput = await getEmailTextInput();
    const nameInput = await getTextFieldTag("name");
    const pwInput = await getPwTextInput();
    const confirmPwInput = await getTextFieldTag("confirm-password");

    return { emailInput, nameInput, pwInput, confirmPwInput };
  };

  beforeEach(async () => {
    // restoreAllMocks();
    matchMediaWorkAround();
  });

  it("should render the component", async () => {
    renderWithProvider(<CreateAccount />);

    const pageTestId = await getTestIdTag("create-account-page");
    const errorMessageCont = await queryTestIdTag("error-message");

    expect(errorMessageCont).toBeFalsy();
    expect(pageTestId).toBeTruthy();
    expect(pageTestId).toHaveTextContent("Create An Account");
  });

  it("toasterContainer renders", async () => {
    renderWithProvider(<CreateAccount />);

    const toasterContTestId = await getTestIdTag("toaster-cont");

    expect(toasterContTestId).toBeTruthy();
  });

  it("all four TextFields render", async () => {
    renderWithProvider(<CreateAccount />);

    const { emailInput, nameInput, pwInput, confirmPwInput } =
      await getTextFieldInputs();

    expect(emailInput).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(pwInput).toBeTruthy();
    expect(confirmPwInput).toBeTruthy();
    expect(emailInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(pwInput).toHaveAttribute("type", "password");
    expect(confirmPwInput).toHaveAttribute("type", "password");
  });

  it("submit button renders as disabled", async () => {
    renderWithProvider(<CreateAccount />);

    const button = await getButton("create-account");

    expect(button).toBeDisabled();
  });

  it("enabling createAccount button", async () => {
    renderWithProvider(<CreateAccount />);

    const { emailInput, nameInput, pwInput, confirmPwInput } =
      await getTextFieldInputs();

    await changeInputText(emailInput, "joe@gmail.com");
    await changeInputText(nameInput, "joe@gmail.com");
    await changeInputText(pwInput, "fakePassword");
    await changeInputText(confirmPwInput, "fakePassword");

    const button = await getButton("create-account");

    expect(button).not.toBeDisabled();
  });

  it("view pw button works", async () => {
    renderWithProvider(<CreateAccount />);
    const viewPw = await getTestIdTag("create-account-view-pw");

    const { pwInput } = await getTextFieldInputs();

    expect(pwInput).toHaveAttribute("type", "password");

    await click(viewPw);

    expect(pwInput).toHaveAttribute("type", "text");
  });

  it("both links at bottom of page have accurate text and take you to correct urls", async () => {
    renderWithProvider(<CreateAccount />);

    const alreadyHaveAnAccountTestId = await getTestIdTag(
      "already-have-an-account",
    );

    const signInHereTestId = await getTestIdTag("linkText-link-sign-in-here");

    const cancelLinkTestId = await getTestIdTag("linkText-link-cancel");

    expect(alreadyHaveAnAccountTestId).toHaveTextContent(
      "Already have an account?Sign in here",
    );
    expect(signInHereTestId).toHaveAttribute("href", "/sign-in");
    expect(cancelLinkTestId).toHaveAttribute("href", "/");
    expect(cancelLinkTestId).toHaveTextContent("Cancel");
  });

  describe("input error handling", function () {
    const erroneousInput = "f";
    const fakeEmail = "fakeEmail@gmail.com";

    // it("when email is invalid", async () => {
    //   renderWithProvider(<CreateAccount />);
    //
    //   const { emailInput, nameInput, pwInput, confirmPwInput } =
    //     await getTextFieldInputs();
    //
    //   await changeInputText(emailInput, erroneousInput);
    //   await changeInputText(nameInput, erroneousInput);
    //   await changeInputText(pwInput, erroneousInput);
    //   await changeInputText(confirmPwInput, erroneousInput);
    //
    //   const button = await getButton("create-account");
    //
    //   await click(button);
    //
    //   const errorMessageCont = await getTestIdTag("error-message");
    //   const errorMessageText = await getTestIdTag("error-message-text");
    //
    //   expect(errorMessageCont).toBeTruthy();
    //   expect(errorMessageText).toHaveTextContent("Invalid Email Address");
    // });

    // it("when email already exists", async () => {
    //   const user: UserSchema = createUser();
    //
    //   updateStore(_loadUsers, [user]);
    //
    //   renderWithProvider(<CreateAccount />);
    //
    //   const { emailInput, nameInput, pwInput, confirmPwInput } =
    //     await getTextFieldInputs();
    //
    //   await changeInputText(emailInput, user.email);
    //   await changeInputText(nameInput, erroneousInput);
    //   await changeInputText(pwInput, erroneousInput);
    //   await changeInputText(confirmPwInput, erroneousInput);
    //
    //   const button = await getButton("create-account");
    //
    //   await click(button);
    //
    //   const errorMessageCont = await getTestIdTag("error-message");
    //   const errorMessageText = await getTestIdTag("error-message-text");
    //
    //   expect(errorMessageCont).toBeTruthy();
    //   expect(errorMessageText).toHaveTextContent("Email already in use");
    // });

    // it("when userName already exists", async () => {
    //   const user: UserSchema = createUser();
    //
    //   updateStore(_loadUsers, [user]);
    //
    //   renderWithProvider(<CreateAccount />);
    //
    //   const { emailInput, nameInput, pwInput, confirmPwInput } =
    //     await getTextFieldInputs();
    //
    //   await changeInputText(emailInput, fakeEmail);
    //   await changeInputText(nameInput, user.name);
    //   await changeInputText(pwInput, erroneousInput);
    //   await changeInputText(confirmPwInput, erroneousInput);
    //
    //   const button = await getButton("create-account");
    //
    //   await click(button);
    //
    //   const errorMessageCont = await getTestIdTag("error-message");
    //   const errorMessageText = await getTestIdTag("error-message-text");
    //
    //   expect(errorMessageCont).toBeTruthy();
    //   expect(errorMessageText).toHaveTextContent("Name already in use");
    // });

    it("when passwords do not match", async () => {
      const user: UserSchema = createUser();

      updateStore(_loadUsers, [user]);

      renderWithProvider(<CreateAccount />);

      const { emailInput, nameInput, pwInput, confirmPwInput } =
        await getTextFieldInputs();

      await changeInputText(emailInput, fakeEmail);
      await changeInputText(nameInput, "fakeName");
      await changeInputText(pwInput, "1234");
      await changeInputText(confirmPwInput, "12345");

      const button = await getButton("create-account");

      await click(button);

      const errorMessageCont = await getTestIdTag("error-message");
      const errorMessageText = await getTestIdTag("error-message-text");

      expect(errorMessageCont).toBeTruthy();
      expect(errorMessageText).toHaveTextContent("Passwords do not match");
    });
  });

  // it("submitting an account successfully", async () => {
  //   const existingUser: UserSchema = createUser();
  //   const newUser: UserSchema = createUser();
  //
  //   updateStore(_loadUsers, [existingUser]);
  //
  //   const newAuthData = {
  //     email: newUser.email,
  //     name: newUser.name,
  //     password: "1234",
  //   };
  //
  //   (axios.post as jest.Mock).mockResolvedValueOnce({ data: newAuthData });
  //
  //   renderWithProvider(<CreateAccount />);
  //
  //   const { emailInput, nameInput, pwInput, confirmPwInput } =
  //     await getTextFieldInputs();
  //
  //   await changeInputText(emailInput, newUser.email);
  //   await changeInputText(nameInput, newUser.name);
  //   await changeInputText(pwInput, "1234");
  //   await changeInputText(confirmPwInput, "1234");
  //
  //   const button = await getButton("create-account");
  //
  //   await click(button);
  //
  //   const usersStore = await getDataFromStore("users");
  // });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      renderWithProvider(<CreateAccount />);

      mockWindowMobileView(true);

      const pageTestId = await getTestIdTag("create-account-page-mobile");

      expect(pageTestId).toBeTruthy();
      expect(pageTestId).toHaveTextContent("Create Account");
    });
  });
});
