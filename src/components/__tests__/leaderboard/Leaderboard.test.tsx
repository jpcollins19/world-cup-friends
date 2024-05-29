import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import Leaderboard from "../../leaderboard/Leaderboard";
import {
  _loadTourneyStage,
  getPageTestId,
  tourneyStartDate,
} from "../../../store";
import { updateStore } from "../../../hooks/__tests__ /hookUtils";

jest.mock("axios");

describe("<Leaderboard/>", () => {
  const payoutTestId = getPageTestId("payout-cont");
  const userColorTableTestId = getPageTestId("leaderboard-results");
  const resultsContTestId = getPageTestId("leaderboard-results");

  it("should render the component", async () => {
    updateStore(_loadTourneyStage, 1);

    renderWithProvider(<Leaderboard />);

    await getTestIdTag("leaderboard-page");
  });

  it("stage 1", async () => {
    updateStore(_loadTourneyStage, 1);

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

  //stage 2 should be the opposite of stage 1 verifications
});
