import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockUseIsMobile,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import { getPageTestId, tourneyStartDate } from "../../../store";
import PoolPicks from "../../poolPicks/PoolPicks";
import { updateTourneyStage } from "../../../hooks/__tests__ /hookUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";

jest.mock("axios");

describe("<PoolPicks/>", () => {
  const chooseUserDropdownTestId = getPageTestId("pool-picks-user-dropdown");
  const userPicksTestId = getPageTestId("pool-picks-user-picks");

  it("should render the component", async () => {
    updateTourneyStage(1);

    renderWithProvider(<PoolPicks />);

    await getTestIdTag("pool-picks-page");
  });

  it("stage 1", async () => {
    updateTourneyStage(1);

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

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      useMediaQuery.mockReturnValue(true);

      updateTourneyStage(1);

      renderWithProvider(<PoolPicks />);

      await getTestIdTag("pool-picks-page-mobile");
    });
  });
});
