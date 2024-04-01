import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockUseGetUser,
  mockUseIsMobile,
  mockUseIsUserAdmin,
  mockUseIsUserLoggedIn,
  queryTestIdTag,
  renderWithProvider,
} from "../../testingUtils";
import EmailUpdates from "../../navbar/EmailUpdates";
import { UserSchema } from "../../../store";
import { createUser } from "../../../hooks/fixtures";

jest.mock("../../../hooks", () => ({
  useIsMobile: jest.fn(),
  useIsUserAdmin: jest.fn(),
  useIsUserLoggedIn: jest.fn(),
  useGetUser: jest.fn(),
}));

describe("<EmailUpdates/>", () => {
  const emailUpdatesTestId = "email-updates";

  it("does not render when user is not logged in", async () => {
    mockUseIsUserLoggedIn(false);

    renderWithProvider(<EmailUpdates />);

    const testId = await queryTestIdTag(emailUpdatesTestId);

    expect(testId).toBeFalsy();
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      mockUseIsUserLoggedIn(true);
    });

    it("does not render when user is admin", async () => {
      mockUseIsUserAdmin(true);

      renderWithProvider(<EmailUpdates />);

      const testId = await queryTestIdTag(emailUpdatesTestId);

      expect(testId).toBeFalsy();
    });

    describe("when user is not admin", () => {
      beforeEach(() => {
        mockUseIsUserAdmin(false);
      });

      const hoverVerbiage =
        "Email notifications can be sent out to you each time the website is updated!";

      it("renders the component", async () => {
        renderWithProvider(<EmailUpdates />);

        const testId = await getTestIdTag(emailUpdatesTestId);

        expect(testId).toBeTruthy();
        expect(testId).toHaveAttribute(
          "href",
          "/edit-profile-email-notifications",
        );
      });

      it("user emailNotifications is false", async () => {
        const user: UserSchema = createUser();

        mockUseGetUser(user);

        renderWithProvider(<EmailUpdates />);

        const testId = await getTestIdTag(emailUpdatesTestId);

        expect(testId.textContent).toEqual(
          `Opt me into email notifications${hoverVerbiage}`,
        );
      });

      it("user emailNotifications is true", async () => {
        const user: UserSchema = createUser({ emailNotifications: true });

        mockUseGetUser(user);

        renderWithProvider(<EmailUpdates />);

        const testId = await getTestIdTag(emailUpdatesTestId);

        expect(testId.textContent).toEqual(
          `Opt me out of email notifications${hoverVerbiage}`,
        );
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockUseIsMobile(true);

      renderWithProvider(<EmailUpdates />);

      const testId = await getTestIdTag(`${emailUpdatesTestId}-mobile`);

      expect(testId).toBeTruthy();
    });
  });
});
