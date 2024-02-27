import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  changeInputText,
  getTestIdTag,
  emailInputTestId,
  pwInputTestId,
} from "../testingUtils";
import { geti18n } from "../../store";
import { TextField } from "../buffet";

describe("<TextField/>", () => {
  const email = geti18n("email");
  const pw = geti18n("password");

  const onChange = (ev: any) => "test";

  it("should render the component", async () => {
    render(<TextField input={{ label: email }} onChange={onChange} />);

    const pageTestId = await getTestIdTag("text-field");

    expect(pageTestId).toBeInTheDocument();
  });

  it("the default type is 'text'", async () => {
    render(<TextField input={{ label: email }} onChange={onChange} />);

    const input = await getTestIdTag(emailInputTestId);

    expect(input).toHaveAttribute("type", "text");
  });

  it("the default is required", async () => {
    render(<TextField input={{ label: email }} onChange={onChange} />);

    const input = await getTestIdTag(emailInputTestId);
    const requiredSymbol = await getTestIdTag("text-field-input-required");

    expect(input).toHaveAttribute("required");
    expect(requiredSymbol).toBeInTheDocument();
  });

  it("input type is password when passed in", async () => {
    render(<TextField input={{ label: pw, type: pw }} onChange={onChange} />);

    const input = await getTestIdTag(pwInputTestId);

    expect(input).toHaveAttribute("type", pw);
  });

  it("onChange changes the input value", async () => {
    render(<TextField input={{ label: pw, type: pw }} onChange={onChange} />);

    const input = await getTestIdTag(pwInputTestId);

    await changeInputText(input, email);

    expect(input).toHaveValue(email);
  });
});
