import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  getTestIdTagForAll,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import {
  _loadGroupPicks,
  _loadTeams,
  _loadUsers,
  groupLetters,
  routes,
  setAuth,
  UserSchema,
} from "../../../store";
import {
  updateStore,
  updateTourneyStage,
} from "../../../hooks/__tests__ /hookUtils";
import {
  createAllGroups,
  createGroupPicks_Pool,
  CreateGroupPicksSchema,
  createUser,
  createUserGroupPicks,
  UserSingleGroupPickSetupSchema,
} from "../../../hooks/fixtures";
import { useAxiosGet } from "../../../hooks/__tests__ /axiosUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";
import MyPicks from "../../myPicks/locked/MyPicks";
import MyGroupPicks from "../../myPicks/locked/MyGroupPicks";
import PointsSystemTable from "../../myPicks/locked/PointsSystemTable";
import SingleGroup from "../../myPicks/locked/SingleGroup";
import UserTotalPointsBreakdown from "../../myPicks/locked/UserTotalPointsBreakdown";

jest.mock("axios");

describe("<MyPicks/>", () => {
  const userWithNoPicks: UserSchema = createUser({ name: "Joe" });
  const authWithNoPicks = { id: userWithNoPicks.id };

  const teams = createAllGroups();

  const groupsToAdvance = ["A", "C", "D", "F", "G", "H", "J", "L"];

  const userGroupPicks: UserSingleGroupPickSetupSchema[] = groupLetters.map(
    (groupLetter) => {
      const thirdPlaceToAdvanceToKo = groupsToAdvance.includes(groupLetter);

      return { group: groupLetter, thirdPlaceToAdvanceToKo };
    },
  );

  const userGroupPicksExpected = createUserGroupPicks({
    groups: teams,
    userGroupPicks: userGroupPicks,
  });

  const userWithPicks: UserSchema = createUser({
    tiebreaker: 101,
  });

  const authWithPicks = { id: userWithPicks.id, tiebreaker: 101 };

  const userPicksForPool: CreateGroupPicksSchema = {
    userId: userWithPicks.id,
    groupPicks: userGroupPicksExpected,
  };

  const groupPicksExpected = createGroupPicks_Pool({
    groups: teams,
    userGroupPicks: [userPicksForPool],
  });

  const userTotalPointsBreakdownTestId = "user-total-pts-breakdown";

  const myGroupPicksTestId = "my-group-picks";

  const ptSystemTestId = "points-system-table";
  const myPicksDataTestId = "my-group-picks-data";

  const indicatorColumnTestId = "pst-indicator-column";
  const verbiageColumnTestId = "pst-verbiage-column";

  const astrixTestId = "pst-astrix";
  const thirdPlaceTextAstrixTestId = "pst-astrix-third-place-text";

  const userHasNoPicksSetup_stage1 = () => {
    updateStore(setAuth, authWithNoPicks);
    updateStore(_loadUsers, [userWithNoPicks]);
    useAxiosGet([userWithNoPicks]);
  };

  const userHasPicksSetup_stage1 = () => {
    updateStore(_loadUsers, [userWithPicks]);
    updateStore(setAuth, authWithPicks);
    useAxiosGet([userWithPicks]);
    updateStore(_loadTeams, teams);
    updateStore(_loadGroupPicks, groupPicksExpected);
  };

  it("renders the component", async () => {
    updateTourneyStage(1);

    userHasNoPicksSetup_stage1();

    renderWithProvider(<MyPicks />);

    await getTestIdTag("my-picks-page");

    const userName = await getTestIdTag("my-picks-user-name");

    expect(userName.textContent).toEqual("Joe");
  });

  describe("stage 1", () => {
    beforeEach(() => {
      updateTourneyStage(1);
    });

    it("before user makes their picks", async () => {
      userHasNoPicksSetup_stage1();

      renderWithProvider(<MyPicks />);

      const editPicksButton = await getTestIdTag(
        "link-button-link-select-group-picks",
      );

      expect(editPicksButton).toHaveAttribute("href", routes.myPicksEdit);
      expect(editPicksButton.textContent).toEqual("Select Group Picks");

      const groupPicks = await queryTestIdTag(myGroupPicksTestId);

      expect(groupPicks).toBeFalsy();
    });

    it("after user makes their picks", async () => {
      userHasPicksSetup_stage1();

      renderWithProvider(<MyPicks />);

      const editPicksButton = await getTestIdTag(
        "link-button-link-adjust-group-picks",
      );

      expect(editPicksButton).toHaveAttribute("href", routes.myPicksEdit);
      expect(editPicksButton.textContent).toEqual("Adjust Group Picks");

      await getTestIdTag(myGroupPicksTestId);
    });

    describe("<UserTotalPointsBreakdown/>", () => {
      it("returns null when user has not submitted their picks", async () => {
        userHasNoPicksSetup_stage1();

        renderWithProvider(<UserTotalPointsBreakdown />);

        const groupPicks = await queryTestIdTag(userTotalPointsBreakdownTestId);

        expect(groupPicks).toBeFalsy();
      });

      it("when user has submitted their picks, should render the component", async () => {
        userHasPicksSetup_stage1();

        renderWithProvider(<UserTotalPointsBreakdown />);

        await getTestIdTag(userTotalPointsBreakdownTestId);
      });
    });

    describe("<MyGroupPicks/>", () => {
      it("returns null when user has not submitted their picks", async () => {
        userHasNoPicksSetup_stage1();

        renderWithProvider(<MyGroupPicks />);

        const groupPicks = await queryTestIdTag(myGroupPicksTestId);

        expect(groupPicks).toBeFalsy();
      });

      it("when user has submitted their picks, should render the component + subcomponents", async () => {
        userHasPicksSetup_stage1();

        renderWithProvider(<MyGroupPicks />);

        await getTestIdTag(myGroupPicksTestId);
        await getTestIdTag(ptSystemTestId);
        await getTestIdTag(myPicksDataTestId);
      });
    });

    describe("<PointsSystemTable/>", () => {
      it("renders the component", async () => {
        renderWithProvider(<PointsSystemTable />);

        await getTestIdTag("points-system-table");
      });

      it("only has the astrix/3rd place text", async () => {
        renderWithProvider(<PointsSystemTable />);

        const indicatorColumn = await getTestIdTag(indicatorColumnTestId);
        const verbiageColumn = await getTestIdTag(verbiageColumnTestId);

        expect(indicatorColumn.children.length).toEqual(1);
        expect(verbiageColumn.children.length).toEqual(1);

        const astrix = await getTestIdTag(astrixTestId);
        const astrixText = await getTestIdTag(thirdPlaceTextAstrixTestId);

        expect(astrix.textContent).toEqual("*");
        expect(astrixText.textContent).toEqual(
          "3rd place team selected to advance from group",
        );
      });
    });

    describe("<SingleGroup/>", () => {
      beforeEach(() => {
        userWithPicks.groupPicks = userGroupPicksExpected;

        userHasPicksSetup_stage1();
      });

      it("renders the component", async () => {
        renderWithProvider(<SingleGroup groupLetter="A" />);

        await getTestIdTag("my-picks-single-group-A");
      });

      it("header audit", async () => {
        renderWithProvider(<SingleGroup groupLetter="A" />);

        const header = await getTestIdTag("mpsg-header-A");

        expect(header.textContent).toEqual("Group A");
      });

      describe("<AstrixColumn/>", () => {
        it("thirdPlaceAdvancing === true", async () => {
          renderWithProvider(<SingleGroup groupLetter="A" />);

          await getTestIdTagForAll("mpsg-astrix-A");

          const row1 = await getTestIdTagForAll("mpsg-astrix-text-A-1");
          const row2 = await getTestIdTagForAll("mpsg-astrix-text-A-2");
          const row3 = await getTestIdTagForAll("mpsg-astrix-text-A-3");
          const row4 = await getTestIdTagForAll("mpsg-astrix-text-A-4");

          row1.forEach((div) => {
            expect(div.textContent).toEqual("");
          });

          row2.forEach((div) => {
            expect(div.textContent).toEqual("");
          });

          row3.forEach((div) => {
            expect(div.textContent).toEqual("*");
          });

          row4.forEach((div) => {
            expect(div.textContent).toEqual("");
          });
        });

        it("thirdPlaceAdvancing === false", async () => {
          renderWithProvider(<SingleGroup groupLetter="B" />);

          await getTestIdTagForAll("mpsg-astrix-B");

          const row1 = await getTestIdTagForAll("mpsg-astrix-text-B-1");
          const row2 = await getTestIdTagForAll("mpsg-astrix-text-B-2");
          const row3 = await getTestIdTagForAll("mpsg-astrix-text-B-3");
          const row4 = await getTestIdTagForAll("mpsg-astrix-text-B-4");

          row1.forEach((div) => {
            expect(div.textContent).toEqual("");
          });

          row2.forEach((div) => {
            expect(div.textContent).toEqual("");
          });

          row3.forEach((div) => {
            expect(div.textContent).toEqual("");
          });

          row4.forEach((div) => {
            expect(div.textContent).toEqual("");
          });
        });
      });

      describe("<RankColumn/>", () => {
        it("renders", async () => {
          renderWithProvider(<SingleGroup groupLetter="A" />);

          await getTestIdTag("mpsg-rank-A");
        });
      });

      describe("<PredictionColumn/>", () => {
        it("renders with accurate team name and flag url data", async () => {
          renderWithProvider(<SingleGroup groupLetter="A" />);

          await getTestIdTag("mpsg-predictions-A");

          const groupPicks = userGroupPicksExpected.find(
            (groupPicks) => groupPicks.group === "A",
          );

          const team1Expected = groupPicks && groupPicks[1];
          const team2Expected = groupPicks && groupPicks[2];
          const team3Expected = groupPicks && groupPicks[3];
          const team4Expected = groupPicks && groupPicks[4];

          const teamRow1 = await getTestIdTag("mpsg-team-row-A-1");
          const teamRow1Children = teamRow1.children;

          const teamRow2 = await getTestIdTag("mpsg-team-row-A-2");
          const teamRow2Children = teamRow2.children;

          const teamRow3 = await getTestIdTag("mpsg-team-row-A-3");
          const teamRow3Children = teamRow3.children;

          const teamRow4 = await getTestIdTag("mpsg-team-row-A-4");
          const teamRow4Children = teamRow4.children;

          expect(teamRow1Children[0]).toHaveAttribute(
            "src",
            `flag-url-${team1Expected}`,
          );

          expect(teamRow1Children[1].textContent).toEqual(team1Expected);

          expect(teamRow2Children[0]).toHaveAttribute(
            "src",
            `flag-url-${team2Expected}`,
          );

          expect(teamRow2Children[1].textContent).toEqual(team2Expected);

          expect(teamRow3Children[0]).toHaveAttribute(
            "src",
            `flag-url-${team3Expected}`,
          );

          expect(teamRow3Children[1].textContent).toEqual(team3Expected);

          expect(teamRow4Children[0]).toHaveAttribute(
            "src",
            `flag-url-${team4Expected}`,
          );

          expect(teamRow4Children[1].textContent).toEqual(team4Expected);
        });
      });
    });
  });

  ////stage 2

  /// MyPicks
  // LinkButton does not show

  /// PointsSystemTable
  // only has the astrix/3rd place text (same test as stage 1)

  ////stage 3

  /// MyPicks
  // LinkButton does not show

  /// PointsSystemTable
  // color table text shows -- add "toBeFalsy" statements to stages 1 and 2 above once you have the testId for the color table info

  ////stage 4

  /// MyPicks
  // LinkButton shows with accurate text

  /// PointsSystemTable
  // color table text shows -- add "toBeFalsy" statements to stages 1 and 2 above once you have the testId for the color table info

  ////stage 5

  /// MyPicks
  // LinkButton does not show

  /// PointsSystemTable
  // color table text shows -- add "toBeFalsy" statements to stages 1 and 2 above once you have the testId for the color table info

  describe("mobile view", () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(true);
    });

    describe("<MyPicks/>", () => {
      it("renders the component", async () => {
        updateTourneyStage(1);

        userHasNoPicksSetup_stage1();

        renderWithProvider(<MyPicks />);

        await getTestIdTag("my-picks-page-mobile");

        const userName = await getTestIdTag("my-picks-user-name-mobile");

        expect(userName.textContent).toEqual("Joe");
      });

      describe("<MyGroupPicks/>", () => {
        it("renders the component", async () => {
          updateTourneyStage(1);

          userHasPicksSetup_stage1();

          renderWithProvider(<MyGroupPicks />);

          await getTestIdTag(`${myGroupPicksTestId}-mobile`);
          await getTestIdTag(`${ptSystemTestId}-mobile`);
          await getTestIdTag(`${myPicksDataTestId}-mobile`);
        });
      });

      describe("<PointsSystemTable/>", () => {
        it("renders the component", async () => {
          updateTourneyStage(1);

          renderWithProvider(<PointsSystemTable />);

          await getTestIdTag("points-system-table-mobile");
        });
      });

      describe("<SingleGroup/>", () => {
        it("renders the component", async () => {
          userHasPicksSetup_stage1();

          renderWithProvider(<SingleGroup groupLetter="A" />);

          await getTestIdTag("my-picks-single-group-A-mobile");
        });
      });
    });
  });
});
