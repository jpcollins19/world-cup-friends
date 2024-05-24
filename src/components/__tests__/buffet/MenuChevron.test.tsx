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

  it("no menu list items show on default", async () => {
    renderWithProvider(
      <MenuChevron
        testId={userProfileTestId}
        chevron={userIcon}
        menuRoutes={dropdownOptions}
      />,
    );

    const dropdownOptionsCont = await queryTestIdTag(dropdownOptionsContTestId);

    const myProfileRoute = await queryTestIdTag(myProfileTestId);
    const poolPicksRoute = await queryTestIdTag(poolPicksTestId);
    const signOutRoute = await queryTestIdTag(signOutTestId);

    //in order to verify that a testId does not render, you need to
    //use queryTestIdTag and then verify "toBeFalsy"

    expect(dropdownOptionsCont).toBeFalsy();

    expect(myProfileRoute).toBeFalsy();
    expect(poolPicksRoute).toBeFalsy();
    expect(signOutRoute).toBeFalsy();
  });

  it("all applicable menu list items show on chevron click", async () => {
    renderWithProvider(
      <MenuChevron
        testId={userProfileTestId}
        chevron={userIcon}
        menuRoutes={dropdownOptions}
      />,
    );

    const chevronTestId = await getTestIdTag(chevronIconTestId);

    click(chevronTestId);

    await getTestIdTag(dropdownOptionsContTestId);

    await getTestIdTag(myProfileTestId);
    await getTestIdTag(poolPicksTestId);
    await getTestIdTag(signOutTestId);
  });

  describe("chevron placement", () => {
    const compViewPlacement_chevron = "h-24 fixed right-10 top-10";
    const compViewPlacement_dropdownOptions = "fixed right-10 top-15";

    type PlacementTestingProps = {
      title: string;
      click?: boolean;
      testId: string;
      result: string;
    };

    const compPlacementTesting: PlacementTestingProps[] = [
      {
        title: "chevron",
        testId: chevronTestId,
        result: compViewPlacement_chevron,
      },
      {
        title: "dropdownOptions",
        click: true,
        testId: dropdownOptionsContTestId,
        result: compViewPlacement_dropdownOptions,
      },
    ];

    describe("comp view", () => {
      compPlacementTesting.forEach((test) => {
        it(`${test.title}`, async () => {
          renderWithProvider(
            <MenuChevron
              testId={userProfileTestId}
              chevron={userIcon}
              menuRoutes={dropdownOptions}
            />,
          );

          if (test?.click) {
            const chevron = await getTestIdTag(chevronIconTestId);
            click(chevron);
          }

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockWindowMobileView(true);

      renderWithProvider(
        <MenuChevron
          testId={userProfileTestId}
          chevron={userIcon}
          menuRoutes={dropdownOptions}
        />,
      );

      await getTestIdTag("menu-chevron-user-profile-mobile");
      await getTestIdTag(`${chevronIconTestId}-mobile`);
    });
  });
});
