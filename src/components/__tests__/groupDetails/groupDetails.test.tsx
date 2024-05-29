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

    //Asterisk_Cont doesnt show
    //groupDetailsCont doesnt show

    const headerTestId = await getTestIdTag("pre-tourney-header-leaderboard");

    expect(headerTestId).toHaveTextContent(
      `Leaderboard will not be viewable until the tournament commences on ${tourneyStartDate}`,
    );
  });
});
