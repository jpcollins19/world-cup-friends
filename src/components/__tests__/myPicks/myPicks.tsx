import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import axios from "axios";
import {
  _loadUsers,
  groupLetters,
  setAuth,
  TeamSchema,
  UserSchema,
} from "../../../store";
import {
  updateStore,
  updateTourneyStage,
} from "../../../hooks/__tests__ /hookUtils";
import GroupDetails from "../../groupDetails/GroupDetails";
import {
  createAllGroups,
  createUser,
  getFakerInfo,
} from "../../../hooks/fixtures";
import { useAxiosGet } from "../../../hooks/__tests__ /axiosUtils";
import { useMediaQuery } from "../../../../__mocks__/react-responsive";
import MyPicks from "../../myPicks/locked/MyPicks";

jest.mock("axios");

describe("<MyPicks/>", () => {
  it("should render the component", async () => {
    updateTourneyStage(1);

    const user: UserSchema = createUser({ name: "Joe" });

    const auth = { id: user.id };

    updateStore(setAuth, auth);
    updateStore(_loadUsers, [user]);
    useAxiosGet([user]);

    renderWithProvider(<MyPicks />);

    await getTestIdTag("my-picks-page");

    const userName = await getTestIdTag("my-picks-user-name");

    expect(userName.textContent).toEqual("Joe");
  });

  describe("stage 1", () => {
    // beforeEach(() => {
    //   updateTourneyStage(1);
    // });
    // it("before user makes their picks", async () => {
    //   renderWithProvider(<MyPicks />);
    //
    //   // linkButton has accurate text when no picks have been submitted
    //    // editPicksButtonTestId = 'link-button-cont-Select-Group-Picks'
    //   // asteriskCont does not show
    //    //  userPicks cont does not show
    //
    //   //await getTestIdTag("my-picks-page");
    //
    //   // await getTestIdTag(groupDetailsContTestId);
    // });
    // it("after user makes their picks", async () => {
    //   renderWithProvider(<MyPicks />);
    //
    //   // linkButton has accurate text when picks have been submitted
    //   // asteriskCont shows
    //   // userPicks cont shows
    //
    //   //await getTestIdTag("my-picks-page");
    //
    //   // await getTestIdTag(groupDetailsContTestId);
    // });
  });

  //stage 2
  // LinkButton does not show

  //stage 3
  // LinkButton does not show

  //stage 4
  // LinkButton shows with accurate text

  //stage 5
  // LinkButton does not show

  // describe("mobile view", () => {
  //   it("renders the mobile view", async () => {
  //     useMediaQuery.mockReturnValue(true);
  //
  //     updateTourneyStage(1);
  //
  //     const teams: TeamSchema[] = createAllGroups();
  //
  //     useAxiosGet(teams);
  //
  //     renderWithProvider(<GroupDetails />);
  //
  //     await getTestIdTag("group-details-page-mobile");
  //
  //     await getTestIdTag(`${groupDetailsContTestId}-mobile`);
  //
  //     for (const letter of groupLetters) {
  //       await getTestIdTag(`single-group-cont-${letter}-mobile`);
  //     }
  //   });
  // });
});
