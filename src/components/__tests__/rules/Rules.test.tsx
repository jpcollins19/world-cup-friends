import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider } from "../../testingUtils";
import axios from "axios";
import Rules from "../../rules/Rules";

jest.mock("axios");

describe("<Rules/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Rules />);

    await getTestIdTag("rules-page");
  });
});
