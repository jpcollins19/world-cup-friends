import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import { _loadUsers, routes, setAuth, UserSchema } from "../../../store";
import {
  updateStore,
  updateTourneyStage,
} from "../../../hooks/__tests__ /hookUtils";
import { createUser } from "../../../hooks/fixtures";
import { useAxiosGet } from "../../../hooks/__tests__ /axiosUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";
import MyPicks from "../../myPicks/locked/MyPicks";
import MyGroupPicks from "../../myPicks/locked/MyGroupPicks";
import PointsSystemTable from "../../myPicks/locked/PointsSystemTable";

jest.mock("axios");

describe("<MyPicks/>", () => {
  const userWithNoPicks: UserSchema = createUser({ name: "Joe" });
  const authWithNoPicks = { id: userWithNoPicks.id };

  const userWithPicks: UserSchema = createUser({ tiebreaker: 101 });

  const authWithPicks = { id: userWithPicks.id, tiebreaker: 101 };

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
      // it("renders the component", async () => {
      //   renderWithProvider(<PointsSystemTable />);
      //
      //   await getTestIdTag("points-system-table");
      // });
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

      describe("<MyGroupPicksData/>", () => {
        // it("renders the component", async () => {
        //   updateTourneyStage(1);
        //
        //   renderWithProvider(<PointsSystemTable />);
        //
        //   await getTestIdTag("points-system-table-mobile");
        // });
      });
    });
  });
});
