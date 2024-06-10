import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import { tourneyStartDate } from "../../../store";
import PreTourneyHeader from "../../buffet/PreTourneyHeader";
import { updateTourneyStage } from "../../../hooks/__tests__ /hookUtils";

jest.mock("axios");

describe("<PreTourneyHeader/>", () => {
  const preTourneyHeaderLeaderboardTestId = "pre-tourney-header-leaderboard";

  it("should render the component during stage 1", async () => {
    updateTourneyStage(1);

    renderWithProvider(<PreTourneyHeader page="Leaderboard" />);

    const testId = await getTestIdTag(preTourneyHeaderLeaderboardTestId);

    expect(testId).toHaveTextContent(
      `Leaderboard will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });

  it("should render the component with poolPicks during stage 1", async () => {
    updateTourneyStage(1);

    renderWithProvider(<PreTourneyHeader page="Pool Picks" />);

    const testId = await getTestIdTag("pre-tourney-header-pool-picks");

    expect(testId).toHaveTextContent(
      `Pool Picks will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });

  const tourneyStages = [2, 3, 4, 5];

  tourneyStages.forEach((stage) => {
    it(`does not render during stage ${stage}`, async () => {
      updateTourneyStage(stage);

      renderWithProvider(<PreTourneyHeader page="Leaderboard" />);

      const testId = await queryTestIdTag(preTourneyHeaderLeaderboardTestId);

      expect(testId).toBeFalsy();
    });
  });
});
