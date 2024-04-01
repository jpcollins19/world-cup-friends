import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockUseGetLastUpdated,
  mockUseIsMobile,
  mockUseIsUserAdmin,
  mockUseIsUserLoggedIn,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import LastUpdatedContainer from "../../navbar/lastUpdated/LastUpdatedContainer";

jest.mock("../../../hooks", () => ({
  useIsMobile: jest.fn(),
  useIsUserAdmin: jest.fn(),
  useIsUserLoggedIn: jest.fn(),
  useGetLastUpdated: jest.fn(),
}));

describe("<LastUpdatedContainer/>", () => {
  const lastUpdated = { id: "1234", answer: "today" };

  const adminTestId = "last-updated-admin";
  const readOnlyTestId = "last-updated-read-only";

  it("when the user is not logged in, the component returns null", async () => {
    mockUseIsUserLoggedIn(false);

    renderWithProvider(<LastUpdatedContainer />);

    const adminView = await queryTestIdTag(adminTestId);
    const readOnlyView = await queryTestIdTag(readOnlyTestId);

    expect(adminView).toBeFalsy();
    expect(readOnlyView).toBeFalsy();
  });

  describe("when the user is logged in", () => {
    beforeEach(() => {
      mockUseIsUserLoggedIn(true);
      mockUseGetLastUpdated(lastUpdated);
    });

    it("user is admin", async () => {
      mockUseIsUserAdmin(true);

      renderWithProvider(<LastUpdatedContainer />);

      const adminView = await getTestIdTag(adminTestId);
      const readOnlyView = await getTestIdTag(readOnlyTestId);

      expect(adminView).toBeTruthy();
      expect(readOnlyView).toBeTruthy();
    });

    it("user is not admin", async () => {
      mockUseIsUserAdmin(false);

      renderWithProvider(<LastUpdatedContainer />);

      const adminView = await queryTestIdTag(adminTestId);
      const readOnlyView = await getTestIdTag(readOnlyTestId);

      expect(adminView).toBeFalsy();
      expect(readOnlyView).toBeTruthy();
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockUseIsUserLoggedIn(true);
      mockUseGetLastUpdated(lastUpdated);
      mockUseIsMobile(true);

      renderWithProvider(<LastUpdatedContainer />);

      const adminView = await queryTestIdTag(`${adminTestId}-mobile`);
      const readOnlyView = await getTestIdTag(`${readOnlyTestId}-mobile`);

      expect(adminView).toBeFalsy();
      expect(readOnlyView).toBeTruthy();
    });
  });
});
