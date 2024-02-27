import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import SignIn from "../signIn/SignIn";
import { Provider } from "react-redux";
import store, { geti18n, routes } from "../../store";
import LinkText from "../buffet/LinkText";

describe("<Error/>", () => {
  it("should render the component with accurate text ", async () => {
    render(
      <LinkText
        input={{ route: routes.createAccount, text: geti18n("forgotPassword") }}
      />,
    );

    const pageTestId = await getTestIdTag("linkText-component");
    const linkTestId = await getTestIdTag("linkText-link");

    expect(pageTestId).toBeInTheDocument();
    expect(linkTestId).toHaveAttribute("href", "/create-account");
    expect(linkTestId).toHaveTextContent("Forgot Password");
  });

  it.todo("text is accurate");
});
