import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag, getText } from "../testingUtils";
import Button from "../buffet/Button";

describe("<Button/>", () => {
  const buttonText = "Test Text";

  const getButtonTestId = () => {
    return getTestIdTag("signIn-button");
  };

  const getButton = async () => {
    const testId = await getButtonTestId();

    return testId.querySelector("button");
  };

  it("should render the component with accurate text and no form or type attributes", async () => {
    render(<Button dataTestId="signIn-button" text={buttonText} />);

    const testId = await getButtonTestId();

    const button = await getButton();

    expect(testId).toBeInTheDocument();
    expect(await getText(buttonText)).toBeInTheDocument();
    expect(button).not.toHaveAttribute("form");
    expect(button).not.toHaveAttribute("type");
  });

  it("button is disabled", async () => {
    render(
      <Button dataTestId="signIn-button" text={buttonText} disabled={true} />,
    );

    const button = await getButton();

    expect(button).toBeDisabled();
  });

  it("button is not disabled", async () => {
    render(
      <Button dataTestId="signIn-button" text={buttonText} disabled={false} />,
    );

    const button = await getButton();

    expect(button).not.toBeDisabled();
  });

  it("when form is sent down, form is the formId and type is submit", async () => {
    const formId = "form-test";

    render(
      <Button dataTestId="signIn-button" text={buttonText} form={formId} />,
    );

    const button = await getButton();

    expect(button).toHaveAttribute("form", formId);
    expect(button).toHaveAttribute("type", "submit");
  });
});
