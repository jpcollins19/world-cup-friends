import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider } from "../../testingUtils";
import { _loadTeams, groupDetailColumns, TeamSchema } from "../../../store";
import {
  updateStore,
  updateTourneyStage,
} from "../../../hooks/__tests__ /hookUtils";
import SingleGroupCont from "../../groupDetails/SingleGroupCont";
import { createAllGroups, groupInfo } from "../../../hooks/fixtures";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";

describe("<SingleGroupCont/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<SingleGroupCont letter="A" />);

    await getTestIdTag("single-group-cont-A");
    const header = await getTestIdTag("group-header-A");
    await getTestIdTag("group-data-cont-A");

    expect(header.textContent).toEqual("Group A");
  });

  describe("stage 1", () => {
    beforeEach(() => {
      updateTourneyStage(1);

      const teams: TeamSchema[] = createAllGroups();

      updateStore(_loadTeams, teams);
    });

    it("teamColumn", async () => {
      renderWithProvider(<SingleGroupCont letter="A" />);

      const header = await getTestIdTag("group-data-header-team-A");

      expect(header.textContent).toEqual("Team");

      for (const team of groupInfo.A) {
        const teamTestId = await getTestIdTag(`flag-and-name-cont-${team}`);

        const children = teamTestId.children;

        const teamFlag = children[0];
        const teamName = children[1];

        expect(teamFlag).toHaveAttribute("src", `flag-url-${team}`);
        expect(teamName.textContent).toEqual(team);
      }
    });

    for (const column of groupDetailColumns) {
      it(`column: ${column}`, async () => {
        renderWithProvider(<SingleGroupCont letter="A" />);

        const header = await getTestIdTag(`group-data-header-${column}-A`);

        const textContent = column === "plusMinus" ? "+/-" : column;

        expect(header.textContent).toEqual(textContent);

        for (const team of groupInfo.A) {
          const testId = await getTestIdTag(`${column}-cont-${team}`);

          const textContent = column === "plusMinus" ? "0-0" : "0";

          expect(testId.textContent).toEqual(textContent);
        }
      });
    }
  });

  ////stage 2-5 is all the same
  // accurate values show for each team and column
  // audit that each value in the matchDataCont is correct (need to update store for a team)

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      useMediaQuery.mockReturnValue(true);

      updateTourneyStage(1);

      renderWithProvider(<SingleGroupCont letter="B" />);

      await getTestIdTag("single-group-cont-B-mobile");
      const header = await getTestIdTag("group-header-B-mobile");
      await getTestIdTag("group-data-cont-B-mobile");

      expect(header.textContent).toEqual("Group B");
    });
  });
});
