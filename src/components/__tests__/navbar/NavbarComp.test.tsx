import * as React from "react";
import "@testing-library/jest-dom";
import {
  getRouteTestId,
  getTestIdTag,
  mockUseGetLastUpdated,
  mockUseIsMobile,
  mockUseIsUserAdmin,
  mockUseIsUserLoggedIn,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import NavbarComp from "../../navbar/comp/NavbarComp";

jest.mock("../../../hooks", () => ({
  useIsMobile: jest.fn(),
  useIsUserAdmin: jest.fn(),
  useIsUserLoggedIn: jest.fn(),
  useGetActiveUsers: jest.fn(),
  useGetUser: jest.fn(),
  useShouldPayoutShow: jest.fn(),
  useGetLastUpdated: jest.fn(),
}));

describe("<NavbarComp/>", () => {
  const rulesTestId = "comp-route-rules";
  const adminTestId = "comp-route-admin";
  const leaderboardTestId = "comp-route-leaderboard";
  const myPicksTestId = "comp-route-my-picks";
  const poolPicksTestId = "comp-route-pool-picks";
  const groupDetailsTestId = "comp-route-group-details";

  const queryRouteTestIds = async () => {
    const admin = await queryTestIdTag(adminTestId);
    const leaderboard = await queryTestIdTag(leaderboardTestId);
    const myPicks = await queryTestIdTag(myPicksTestId);
    const poolPicks = await queryTestIdTag(poolPicksTestId);
    const groupDetails = await queryTestIdTag(groupDetailsTestId);

    return { admin, leaderboard, myPicks, poolPicks, groupDetails };
  };

  it("should render the component", async () => {
    renderWithProvider(<NavbarComp />);

    const testId = await getTestIdTag("navbar-comp");

    expect(testId).toBeTruthy();
  });

  describe("accurate routes are displayed", () => {
    describe("when the user is not logged in", () => {
      it("only rules shows", async () => {
        mockUseIsUserLoggedIn(false);

        renderWithProvider(<NavbarComp />);

        const rules = await getRouteTestId("rules");

        expect(rules).toBeTruthy();

        const { admin, leaderboard, myPicks, poolPicks, groupDetails } =
          await queryRouteTestIds();

        expect(admin).toBeFalsy();
        expect(leaderboard).toBeFalsy();
        expect(myPicks).toBeFalsy();
        expect(poolPicks).toBeFalsy();
        expect(groupDetails).toBeFalsy();
      });
    });

    describe("when the user is logged in", () => {
      const lastUpdated = { id: "1234", answer: "today" };

      it("isAdmin is false", async () => {
        mockUseIsUserLoggedIn(true);
        mockUseIsUserAdmin(false);
        mockUseGetLastUpdated(lastUpdated);

        renderWithProvider(<NavbarComp />);

        const rules = await getRouteTestId("rules");
        const leaderboard = await getRouteTestId("leaderboard");
        const myPicks = await getRouteTestId("my-picks");
        const poolPicks = await getRouteTestId("pool-picks");
        const groupDetails = await getRouteTestId("group-details");

        expect(rules).toBeTruthy();
        expect(leaderboard).toBeTruthy();
        expect(myPicks).toBeTruthy();
        expect(poolPicks).toBeTruthy();
        expect(groupDetails).toBeTruthy();

        const { admin } = await queryRouteTestIds();

        expect(admin).toBeFalsy();
      });

      it("isAdmin is true", async () => {
        mockUseIsUserLoggedIn(true);
        mockUseIsUserAdmin(true);
        mockUseGetLastUpdated(lastUpdated);

        renderWithProvider(<NavbarComp />);

        const rules = await getRouteTestId("rules");
        const admin = await getRouteTestId("admin");
        const leaderboard = await getRouteTestId("leaderboard");
        const myPicks = await getRouteTestId("my-picks");
        const poolPicks = await getRouteTestId("pool-picks");
        const groupDetails = await getRouteTestId("group-details");

        expect(rules).toBeTruthy();
        expect(admin).toBeTruthy();
        expect(leaderboard).toBeTruthy();
        expect(myPicks).toBeTruthy();
        expect(poolPicks).toBeTruthy();
        expect(groupDetails).toBeTruthy();
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockUseIsMobile(true);

      renderWithProvider(<NavbarComp />);

      const testId = await getTestIdTag("navbar-comp-mobile");

      expect(testId).toBeTruthy();
    });
  });
});
