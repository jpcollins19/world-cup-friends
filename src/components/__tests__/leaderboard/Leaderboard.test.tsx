import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockUseIsMobile,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import Leaderboard from "../../leaderboard/Leaderboard";
import { getPageTestId, tourneyStartDate } from "../../../store";
import { updateTourneyStage } from "../../../hooks/__tests__ /hookUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";

jest.mock("axios");

describe("<Leaderboard/>", () => {
  const payoutTestId = getPageTestId("payout-cont");
  const userColorTableTestId = getPageTestId("leaderboard-results");
  const resultsContTestId = getPageTestId("leaderboard-results");

  it("should render the component", async () => {
    updateTourneyStage(1);

    renderWithProvider(<Leaderboard />);

    await getTestIdTag("leaderboard-page");
  });

  it("stage 1", async () => {
    updateTourneyStage(1);

    renderWithProvider(<Leaderboard />);

    const headerTestId = await getTestIdTag("pre-tourney-header-leaderboard");

    expect(headerTestId).toHaveTextContent(
      `Leaderboard will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );

    const payoutCont = await queryTestIdTag(payoutTestId);
    const userColorTable = await queryTestIdTag(userColorTableTestId);
    const resultsTable = await queryTestIdTag(resultsContTestId);

    expect(payoutCont).toBeFalsy();
    expect(userColorTable).toBeFalsy();
    expect(resultsTable).toBeFalsy();
  });

  //// stage 2 should be the opposite of stage 1 verifications

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      useMediaQuery.mockReturnValue(true);

      updateTourneyStage(1);

      renderWithProvider(<Leaderboard />);

      await getTestIdTag("leaderboard-page-mobile");
    });
  });
});
