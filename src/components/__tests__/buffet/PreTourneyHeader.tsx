import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider } from "../../testingUtils";
import axios from "axios";
import { tourneyStartDate } from "../../../store";
import PreTourneyHeader from "../../buffet/PreTourneyHeader";

jest.mock("axios");

describe("<PreTourneyHeader/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<PreTourneyHeader page="Leaderboard" />);

    const testId = await getTestIdTag("pre-tourney-header-leaderboard");

    expect(testId).toHaveTextContent(
      `Leaderboard will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });

  it("should render the component with poolPicks", async () => {
    renderWithProvider(<PreTourneyHeader page="Pool Picks" />);

    const testId = await getTestIdTag("pre-tourney-header-pool-picks");

    expect(testId).toHaveTextContent(
      `Pool Picks will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });
});
