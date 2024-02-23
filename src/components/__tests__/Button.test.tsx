import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import Button from "../buffet/Button";

describe("<Button/>", () => {
  it("should render the component", async () => {
    render(<Button dataTestId="signIn-button" text="Test Text" />);

    const testId = await getTestIdTag("signIn-button");

    expect(testId).toBeInTheDocument();
  });

  it.todo("disabled vs not disabled");
  it.todo("text is accurate");
});
