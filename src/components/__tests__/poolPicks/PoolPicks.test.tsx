import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import {
  _loadTourneyStage,
  getPageTestId,
  tourneyStartDate,
} from "../../../store";
import PoolPicks from "../../poolPicks/PoolPicks";
import { updateStore } from "../../../hooks/__tests__ /hookUtils";

jest.mock("axios");

describe("<PoolPicks/>", () => {
  const chooseUserDropdownTestId = getPageTestId("pool-picks-user-dropdown");
  const userPicksTestId = getPageTestId("pool-picks-user-picks");

  it("should render the component", async () => {
    updateStore(_loadTourneyStage, 1);

    renderWithProvider(<PoolPicks />);

    await getTestIdTag("pool-picks-page");
  });

  it("stage 1", async () => {
    updateStore(_loadTourneyStage, 1);

    renderWithProvider(<PoolPicks />);

    const headerTestId = await getTestIdTag("pre-tourney-header-pool-picks");

    expect(headerTestId).toHaveTextContent(
      `Pool Picks will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );

    const userDropdown = await queryTestIdTag(chooseUserDropdownTestId);
    const userPicks = await queryTestIdTag(userPicksTestId);

    expect(userDropdown).toBeFalsy();
    expect(userPicks).toBeFalsy();
  });

  //stage 2 should be the opposite of stage 1 verifications
});
