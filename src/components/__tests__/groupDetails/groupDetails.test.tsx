import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import { groupLetters, TeamSchema } from "../../../store";
import { updateTourneyStage } from "../../../hooks/__tests__ /hookUtils";
import GroupDetails from "../../groupDetails/GroupDetails";
import { createAllGroups } from "../../../hooks/fixtures";
import { useAxiosGet } from "../../../hooks/__tests__ /axiosUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";

jest.mock("axios");

describe("<GroupDetails/>", () => {
  const groupDetailsContTestId = "group-details-cont";
  const asteriskContTestId = "asterisk-cont";

  it("should render the component", async () => {
    updateTourneyStage(1);

    const teams: TeamSchema[] = createAllGroups();

    useAxiosGet(teams);

    renderWithProvider(<GroupDetails />);

    await getTestIdTag("group-details-page");

    await getTestIdTag(groupDetailsContTestId);

    for (const letter of groupLetters) {
      await getTestIdTag(`single-group-cont-${letter}`);
    }
  });

  it("stage 1", async () => {
    // groupDetailsCont has accurate class assignment
    // Asterisk_Cont doesnt show

    updateTourneyStage(1);

    const teams: TeamSchema[] = createAllGroups();

    useAxiosGet(teams);

    renderWithProvider(<GroupDetails />);

    const groupDetailsCont = await getTestIdTag(groupDetailsContTestId);
    const asteriskCont = await queryTestIdTag(asteriskContTestId);

    expect(groupDetailsCont).toHaveClass("h-full pt-20 px-3");
    expect(asteriskCont).toBeFalsy();
  });

  //stage 2
  // groupDetailsCont has accurate class assignment
  // Asterisk_Cont doesnt show
  // audit that each value in the matchDataCont is correct (need to update store for a team)

  //stage 3-5
  // groupDetailsCont has accurate class assignment
  // Asterisk_Cont shows

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      useMediaQuery.mockReturnValue(true);

      updateTourneyStage(1);

      const teams: TeamSchema[] = createAllGroups();

      useAxiosGet(teams);

      renderWithProvider(<GroupDetails />);

      await getTestIdTag("group-details-page-mobile");

      await getTestIdTag(`${groupDetailsContTestId}-mobile`);

      for (const letter of groupLetters) {
        await getTestIdTag(`single-group-cont-${letter}-mobile`);
      }
    });
  });
});
