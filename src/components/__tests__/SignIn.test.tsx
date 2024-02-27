import * as React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import {
  changeInputText,
  click,
  getButton,
  getButtonTestId,
  getTestIdTag,
  getText,
  matchMediaWorkAround,
  submit,
  emailInputTestId,
  invalidEmailAndOrPw,
  pwInputTestId,
  submitLowerCase,
  submitUpperCase,
} from "../testingUtils";
import SignIn from "../signIn/SignIn";
import { Provider } from "react-redux";
import store from "../../store";

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

  it("submit button renders", async () => {
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
  });

  it("view pw button works", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const viewPw = await getTestIdTag("view-pw");

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

  // it("errorMessage renders when invalid credentials are submitted", async () => {
  //   // jest.mock("../../store", () => ({
  //   //   ...jest.requireActual("../../store"),
  //   //   authenticate: jest
  //   //     .fn()
  //   //     .mockRejectedValueOnce(new Error("Authentication failed")),
  //   // }));
  //
  //   // jest.mock("xmlhttprequest", () => {
  //   //   const MockXMLHttpRequest = jest.fn();
  //   //   return MockXMLHttpRequest;
  //   // });
  //
  //   render(
  //     <Provider store={store}>
  //       <SignIn />
  //     </Provider>,
  //   );
  //
  //   const emailInput = await getTestIdTag(emailInputTestId);
  //   const pwInput = await getTestIdTag(pwInputTestId);
  //
  //   await changeInputText(emailInput, "joe@gmail.com");
  //   await changeInputText(pwInput, "pw");
  //
  //   const submitButton = await getTestIdTag("button-submit");
  //
  //   await submit(submitButton);
  //
  //   await waitFor(async () => {
  //     const errorMessageTestId = await getTestIdTag("error-message");
  //
  //     expect(errorMessageTestId).toBeInTheDocument();
  //     expect(errorMessageTestId).toHaveTextContent(invalidEmailAndOrPw);
  //   });
  // });

  it.todo("user logs in successfully");
});
