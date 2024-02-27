import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import { geti18n, routes } from "../../store";
import LinkText from "../buffet/LinkText";

describe("<LinkText/>", () => {
  const onChange = (ev: any) => "test";

  it("should render the component with accurate routing and text data", async () => {
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
});
