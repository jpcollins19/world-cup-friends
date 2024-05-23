import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  renderWithProvider,
  click,
} from "../../testingUtils";
import axios from "axios";
import MenuChevron from "../../buffet/MenuChevron";
import UserIcon from "@mui/icons-material/AccountBox";
import { routes } from "../../../store";

jest.mock("axios");

describe("<MenuChevron/>", () => {
  const userIcon = <UserIcon />;

  const dropdownOptions = [routes.myProfile, routes.poolPicks, routes.signOut];

  it("should render the component w applicable chevron", async () => {
    renderWithProvider(
      <MenuChevron
        testId="user-profile"
        chevron={userIcon}
        menuRoutes={dropdownOptions}
      />,
    );

    await getTestIdTag("menu-chevron-user-profile");
    await getTestIdTag("menu-chevron-icon-user-profile");
  });

  it("no menu list items show on default", async () => {
    renderWithProvider(
      <MenuChevron
        testId="navbar-mobile"
        chevron={userIcon}
        menuRoutes={dropdownOptions}
      />,
    );

    const myProfileRoute = await queryTestIdTag(
      "menu-list-item-navbar-mobile-my-profile",
    );

    const poolPicksRoute = await queryTestIdTag(
      "menu-list-item-navbar-mobile-pool-picks",
    );

    const signOutRoute = await queryTestIdTag(
      "menu-list-item-navbar-mobile-sign-out",
    );

    expect(myProfileRoute).toBeFalsy();
    expect(poolPicksRoute).toBeFalsy();
    expect(signOutRoute).toBeFalsy();
  });

  it("all applicable menu list items show on chevron click", async () => {
    renderWithProvider(
      <MenuChevron
        testId="navbar-mobile"
        chevron={userIcon}
        menuRoutes={dropdownOptions}
      />,
    );

    const chevronTestId = await getTestIdTag("menu-chevron-icon-navbar-mobile");

    click(chevronTestId);

    const myProfileRoute = await getTestIdTag(
      "menu-list-item-navbar-mobile-my-profile",
    );

    const poolPicksRoute = await getTestIdTag(
      "menu-list-item-navbar-mobile-pool-picks",
    );

    const signOutRoute = await getTestIdTag(
      "menu-list-item-navbar-mobile-sign-out",
    );

    expect(myProfileRoute).toHaveTextContent("My Profile");
    expect(poolPicksRoute).toHaveTextContent("Pool Picks");
    expect(signOutRoute).toHaveTextContent("Sign Out");

    expect(myProfileRoute).toHaveAttribute("href", routes.myProfile);
    expect(poolPicksRoute).toHaveAttribute("href", routes.poolPicks);
    expect(signOutRoute).toHaveAttribute("href", routes.signOut);
  });
});
