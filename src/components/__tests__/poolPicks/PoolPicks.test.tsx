import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider } from "../../testingUtils";
import axios from "axios";
import { tourneyStartDate } from "../../../store";
import PoolPicks from "../../poolPicks/PoolPicks";

jest.mock("axios");

describe("<PoolPicks/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<PoolPicks />);

    await getTestIdTag("pool-picks-page");
  });

  it("stage 1", async () => {
    renderWithProvider(<PoolPicks />);

    const headerTestId = await getTestIdTag("pre-tourney-header-pool-picks");

    expect(headerTestId).toHaveTextContent(
      `Pool Picks will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });
});
