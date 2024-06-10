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

    await getTestIdTag("navbar-comp");
  });

  describe("accurate routes are displayed", () => {
    describe("when the user is not logged in", () => {
      it("only rules shows", async () => {
        mockUseIsUserLoggedIn(false);

        renderWithProvider(<NavbarComp />);

        await getRouteTestId("rules");

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

        await getRouteTestId("rules");
        await getRouteTestId("leaderboard");
        await getRouteTestId("my-picks");
        await getRouteTestId("pool-picks");
        await getRouteTestId("group-details");

        const { admin } = await queryRouteTestIds();

        expect(admin).toBeFalsy();
      });

      it("isAdmin is true", async () => {
        mockUseIsUserLoggedIn(true);
        mockUseIsUserAdmin(true);
        mockUseGetLastUpdated(lastUpdated);

        renderWithProvider(<NavbarComp />);

        await getRouteTestId("rules");
        await getRouteTestId("admin");
        await getRouteTestId("leaderboard");
        await getRouteTestId("my-picks");
        await getRouteTestId("pool-picks");
        await getRouteTestId("group-details");
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockUseIsMobile(true);

      renderWithProvider(<NavbarComp />);

      await getTestIdTag("navbar-comp-mobile");
    });
  });
});
