import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider } from "../../testingUtils";
import Rules from "../../rules/Rules";

describe("<Rules/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Rules />);

    await getTestIdTag("rules-page");
  });
});
