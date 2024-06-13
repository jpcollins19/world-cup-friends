import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import { groupDetailColumns, groupLetters, TeamSchema } from "../../../store";
import { updateTourneyStage } from "../../../hooks/__tests__ /hookUtils";
import GroupDetails from "../../groupDetails/GroupDetails";
import { createAllGroups, groupInfo } from "../../../hooks/fixtures";
import { useAxiosGet } from "../../../hooks/__tests__ /axiosUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";
import SingleGroupCont from "../../groupDetails/SingleGroupCont";

jest.mock("axios");

describe("<GroupDetails/>", () => {
  const groupDetailsContTestId = "group-details-cont";
  const asteriskContTestId = "asterisk-cont";

  it("renders the component listing all groups", async () => {
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

  describe("stage 1", () => {
    beforeEach(() => {
      updateTourneyStage(1);

      const teams: TeamSchema[] = createAllGroups();

      useAxiosGet(teams);
    });

    // it("groupDetailsCont has accurate class assignment", async () => {
    //   renderWithProvider(<GroupDetails />);
    //
    //   const groupDetailsCont = await getTestIdTag(groupDetailsContTestId);
    //
    //   expect(groupDetailsCont).toHaveClass("h-full pt-20 px-3");
    // });

    it("Asterisk_Cont doesnt show", async () => {
      renderWithProvider(<GroupDetails />);

      const asteriskCont = await queryTestIdTag(asteriskContTestId);

      expect(asteriskCont).toBeFalsy();
    });

    describe("<SingleGroupCont/>", () => {
      it("renders the component", async () => {
        renderWithProvider(<SingleGroupCont letter="A" />);

        await getTestIdTag("single-group-cont-A");
        const header = await getTestIdTag("group-header-A");
        await getTestIdTag("group-data-cont-A");

        expect(header.textContent).toEqual("Group A");
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
  });

  //stage 2
  // groupDetailsCont has accurate class assignment
  // Asterisk_Cont doesnt show
  // audit that each value in the matchDataCont is correct (need to update store for a team)

  //stage 3-5
  // groupDetailsCont has accurate class assignment
  // Asterisk_Cont shows

  describe("mobile view", () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(true);
    });

    describe("<GroupDetails/>", () => {
      it("renders the component listing all groups", async () => {
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

    describe("<SingleGroupCont/>", () => {
      it("renders the component", async () => {
        updateTourneyStage(1);

        renderWithProvider(<SingleGroupCont letter="B" />);

        await getTestIdTag("single-group-cont-B-mobile");
        const header = await getTestIdTag("group-header-B-mobile");
        await getTestIdTag("group-data-cont-B-mobile");

        expect(header.textContent).toEqual("Group B");
      });
    });
  });
});
