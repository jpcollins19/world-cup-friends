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
  mapOverTeamsInAGroup,
  routes,
  setAuth,
  UserSchema,
} from "../../../store";
import {
  getDataFromStore,
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

jest.mock("axios");

describe("<EditMyPicks/>", () => {
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

  // user is sent to correct editing page (edit groupPicks vs. editKoPicks)
  // top text is accurate

  ////////EditGroupPicks

  ///// user not does have picks
  // tiebreaker input defaults to nothing
  // nextOne
  // nextOne

  ///// user has picks
  // tiebreaker input defaults to user tiebreaker
  // nextOne
  // nextOne

  ///// submitting
  // submit button is disabled until it shouldnt be
  ///tiebreaker error states
  //verify the error comes through for jsut one error state - when tiebreaker === '0'

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
  });

  describe("mobile view", () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(true);
    });

    describe("<EditMyPicks/>", () => {
      it("renders the component", async () => {
        updateTourneyStage(1);

        userHasNoPicksSetup_stage1();

        renderWithProvider(<MyPicks />);

        await getTestIdTag("my-picks-page-mobile");

        const userName = await getTestIdTag("my-picks-user-name-mobile");

        expect(userName.textContent).toEqual("Joe");
      });
    });
  });
});

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import { EditGroupPicks } from './EditGroupPicks'; // Adjust the path as necessary
// import { updateUserGroupPicks } from '../../../store';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
//
// jest.mock('../../../store', () => ({
//   updateUserGroupPicks: jest.fn(),
//   tDispatch: jest.fn(),
//   geti18n: jest.fn((key) => key),
//   getPageTestId: jest.fn((id) => id),
//   routes: {
//     myPicks: '/mypicks'
//   },
// }));
//
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
//
// describe('EditGroupPicks Component', () => {
//   let store;
//
//   beforeEach(() => {
//     store = mockStore({
//       auth: { user: { id: 'user1' } },
//       // Add other initial state if necessary
//     });
//
//     updateUserGroupPicks.mockClear();
//   });
//
//   it('should dispatch updateUserGroupPicks on submit with valid tiebreaker', async () => {
//     render(
//         <Provider store={store}>
//           <EditGroupPicks />
//         </Provider>
//     );
//
//     fireEvent.change(screen.getByLabelText('tiebreaker'), { target: { value: '5' } });
//     fireEvent.click(screen.getByText('submit'));
//
//     await waitFor(() => {
//       expect(updateUserGroupPicks).toHaveBeenCalledWith(expect.anything(), 'user1', '5');
//     });
//   });
//
//   it('should show error message for invalid tiebreaker', async () => {
//     render(
//         <Provider store={store}>
//           <EditGroupPicks />
//         </Provider>
//     );
//
//     fireEvent.change(screen.getByLabelText('tiebreaker'), { target: { value: '5.5' } });
//     fireEvent.click(screen.getByText('submit'));
//
//     await waitFor(() => {
//       expect(screen.getByText('errorTiebreaker')).toBeInTheDocument();
//     });
//   });
// });
