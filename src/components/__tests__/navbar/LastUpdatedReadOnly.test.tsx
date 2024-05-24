import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import LastUpdatedReadOnly from "../../navbar/lastUpdated/LastUpdatedReadOnly";
import { updateStore } from "../../../hooks/__tests__ /hookUtils";
import { _loadLastUpdated } from "../../../store";
import { createLastUpdated } from "../../../hooks/fixtures/LastUpdated";

describe("<LastUpdatedReadOnly/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<LastUpdatedReadOnly />);

    const testId = await getTestIdTag("last-updated-read-only");

    expect(testId).toBeTruthy();
  });

  it("renders accurate lastUpdated text", async () => {
    const lastUpdatedAnswer = "Tuesday, March 1, 2022";

    const lastUpdated = createLastUpdated(lastUpdatedAnswer);

    updateStore(_loadLastUpdated, lastUpdated);

    renderWithProvider(<LastUpdatedReadOnly />);

    const testId = await getTestIdTag("last-updated-answer");

    expect(testId.textContent).toEqual(lastUpdatedAnswer);
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockWindowMobileView(true);

      renderWithProvider(<LastUpdatedReadOnly />);

      const testId = await getTestIdTag("last-updated-read-only-mobile");

      expect(testId).toBeTruthy();
    });
  });
});
