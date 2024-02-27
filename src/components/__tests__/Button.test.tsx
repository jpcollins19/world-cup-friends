import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  getTestIdTag,
  getText,
  getButtonTestId,
  getButton,
  submitUpperCase,
  submitLowerCase,
} from "../testingUtils";
import { Button, ErrorMessage } from "../buffet";
import { geti18n } from "../../store";

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
});
