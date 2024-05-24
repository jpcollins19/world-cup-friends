import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  renderWithProvider,
  click,
  mockWindowMobileView,
} from "../../testingUtils";
import axios from "axios";
import { routes } from "../../../store";
import MenuListItem from "../../buffet/MenuListItem";

jest.mock("axios");

describe("<MenuListItem/>", () => {
  const onClickMock = jest.fn();

  const userProfileTestId = "user-profile";

  const listItemTestId = "menu-list-item-user-profile-my-profile";

  it("should render the component w accurate text and route", async () => {
    renderWithProvider(
      <MenuListItem
        testId={userProfileTestId}
        route={routes.myProfile}
        onClick={onClickMock}
      />,
    );

    const testId = await getTestIdTag(listItemTestId);

    expect(testId).toHaveTextContent("My Profile");
    expect(testId).toHaveAttribute("href", routes.myProfile);
  });

  it("onClick works", async () => {
    renderWithProvider(
      <MenuListItem
        testId={userProfileTestId}
        route={routes.myProfile}
        onClick={onClickMock}
      />,
    );

    const testId = await getTestIdTag(listItemTestId);

    click(testId);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockWindowMobileView(true);

      renderWithProvider(
        <MenuListItem
          testId={userProfileTestId}
          route={routes.myProfile}
          onClick={onClickMock}
        />,
      );

      const testId = await getTestIdTag(`${listItemTestId}-mobile`);

      expect(testId).toHaveTextContent("My Profile");
      expect(testId).toHaveAttribute("href", routes.myProfile);
    });
  });
});
