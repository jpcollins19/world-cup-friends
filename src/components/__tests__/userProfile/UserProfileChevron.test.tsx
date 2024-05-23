import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider } from "../../testingUtils";
import axios from "axios";
import Leaderboard from "../../leaderboard/Leaderboard";
import { tourneyStartDate } from "../../../store";

jest.mock("axios");

describe("<Leaderboard/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Leaderboard />);

    await getTestIdTag("leaderboard-page");
  });

  it("stage 1", async () => {
    renderWithProvider(<Leaderboard />);

    const headerTestId = await getTestIdTag("pre-tourney-header-leaderboard");

    expect(headerTestId).toHaveTextContent(
      `Leaderboard will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });
});

//does not show when user is not signed in
//shows when user is signed in - chevron shows too
//no dropdown options show on default
//all applicable dropdown options show onClick - dropdown options have accurate urls
