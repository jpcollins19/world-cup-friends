import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
  click,
  mockWindowMobileView,
} from "../../testingUtils";
import axios from "axios";
import MenuChevron from "../../buffet/MenuChevron";
import UserIcon from "@mui/icons-material/AccountBox";
import { routes } from "../../../store";

jest.mock("axios");

describe("<MenuChevron/>", () => {
  const userProfileTestId = "user-profile";

  const chevronTestId = "menu-chevron-user-profile";
  const chevronIconTestId = "menu-chevron-icon-user-profile";
  const dropdownOptionsContTestId = "menu-items-container-user-profile";

  const userIcon = <UserIcon />;

  const dropdownOptions = [routes.myProfile, routes.poolPicks, routes.signOut];

  const myProfileTestId = "menu-list-item-user-profile-my-profile";
  const poolPicksTestId = "menu-list-item-user-profile-pool-picks";
  const signOutTestId = "menu-list-item-user-profile-sign-out";

  it("should render the component w applicable chevron", async () => {
    renderWithProvider(
      <MenuChevron
        testId={userProfileTestId}
        chevron={userIcon}
        menuRoutes={dropdownOptions}
      />,
    );

    await getTestIdTag(chevronTestId);
    await getTestIdTag(chevronIconTestId);
  });
});
