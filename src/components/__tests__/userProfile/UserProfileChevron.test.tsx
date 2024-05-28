import * as React from "react";
import "@testing-library/jest-dom";
import {
  renderWithProvider,
  queryTestIdTag,
  getTestIdTag,
  click,
  mockWindowMobileView,
} from "../../testingUtils";
import axios from "axios";
import { routes, setAuth } from "../../../store";
import UserProfileChevron from "../../userProfile/UserProfileChevron";
import { updateStore } from "../../../hooks/__tests__ /hookUtils";
import { getFakerInfo } from "../../../hooks/fixtures";

jest.mock("axios");

describe("<UserProfileChevron/>", () => {
  const chevronTestId = "menu-chevron-user-profile";

  describe("when user is not signed in", () => {
    it("it does not render", async () => {
      renderWithProvider(<UserProfileChevron />);

      await queryTestIdTag(chevronTestId);
    });
  });

  describe("when user is signed in", () => {
    const authLoggedIn = { id: getFakerInfo("uuid"), tiebreaker: null };

    const chevronTestId = "menu-chevron-user-profile";
    const chevronIconTestId = "menu-chevron-icon-user-profile";
    const dropdownOptionsContTestId = "menu-items-container-user-profile";

    const myProfileTestId = "menu-list-item-user-profile-my-profile";
    const signOutTestId = "menu-list-item-user-profile-sign-out";

    beforeEach(() => {
      updateStore(setAuth, authLoggedIn);
    });

    it("it renders, but dropdown options default to hidden", async () => {
      renderWithProvider(<UserProfileChevron />);

      const dropdownOptionsCont = await queryTestIdTag(
        dropdownOptionsContTestId,
      );

      const myProfileRoute = await queryTestIdTag(myProfileTestId);
      const signOutRoute = await queryTestIdTag(signOutTestId);

      await getTestIdTag(chevronTestId);
      await getTestIdTag(chevronIconTestId);

      expect(dropdownOptionsCont).toBeFalsy(); //does not render on default

      expect(myProfileRoute).toBeFalsy(); //does not render on default
      expect(signOutRoute).toBeFalsy(); //does not render on default
    });

    it("dropdown options show onChevronClick", async () => {
      renderWithProvider(<UserProfileChevron />);

      const chevronTestId = await getTestIdTag(chevronIconTestId);

      click(chevronTestId);

      await getTestIdTag(dropdownOptionsContTestId);

      const myProfileRoute = await getTestIdTag(myProfileTestId);
      const signOutRoute = await getTestIdTag(signOutTestId);

      expect(myProfileRoute).toHaveTextContent("My Profile");
      expect(myProfileRoute).toHaveAttribute("href", routes.myProfile);

      expect(signOutRoute).toHaveTextContent("Sign Out");
      expect(signOutRoute).toHaveAttribute("href", routes.signIn);
    });

    describe("mobile view", () => {
      it("renders the mobile view", async () => {
        mockWindowMobileView(true);

        renderWithProvider(<UserProfileChevron />);

        await getTestIdTag(`${chevronTestId}-mobile`);
        await getTestIdTag(`${chevronIconTestId}-mobile`);
      });
    });
  });
});
