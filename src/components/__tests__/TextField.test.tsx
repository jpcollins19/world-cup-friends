import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import { geti18n } from "../../store";
import Text_Field from "../buffet/TextField";

describe("<Text_Field/>", () => {
  const email = geti18n("email");
  const pw = geti18n("password");
  it("should render the component", async () => {
    render(<Text_Field input={{ label: email }} />);

    const pageTestId = await getTestIdTag("text-field");

    expect(pageTestId).toBeInTheDocument();
  });

  it("the default type is 'text'", async () => {
    render(<Text_Field input={{ label: email }} />);

    const input = await getTestIdTag("text-field-input");

    expect(input).toHaveAttribute("type", "text");
  });

  it("the default is required", async () => {
    render(<Text_Field input={{ label: email }} />);

    const input = await getTestIdTag("text-field-input");
    const requiredSymbol = await getTestIdTag("text-field-input-required");

    expect(input).toHaveAttribute("required");
    expect(requiredSymbol).toBeInTheDocument();
  });

  it("input type is password when passed in", async () => {
    render(<Text_Field input={{ label: pw, type: pw }} />);

    const input = await getTestIdTag("text-field-input");

    expect(input).toHaveAttribute("type", pw);
  });
});
