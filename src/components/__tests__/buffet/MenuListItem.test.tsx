import * as React from "react";
import "@testing-library/jest-dom";
import { getTestIdTag, renderWithProvider, click } from "../../testingUtils";
import axios from "axios";
import { routes, tourneyStartDate } from "../../../store";
import MenuListItem from "../../buffet/MenuListItem";

jest.mock("axios");

describe("<MenuListItem/>", () => {
  const onClickMock = jest.fn();

  it("should render the component w accurate text and route", async () => {
    renderWithProvider(
      <MenuListItem
        testId="user-profile"
        route={routes.myProfile}
        onClick={onClickMock}
      />,
    );

    const testId = await getTestIdTag("menu-list-item-user-profile-my-profile");

    expect(testId).toHaveTextContent("My Profile");
    expect(testId).toHaveAttribute("href", routes.myProfile);
  });

  it("onClick works", async () => {
    renderWithProvider(
      <MenuListItem
        testId="user-profile"
        route={routes.myProfile}
        onClick={onClickMock}
      />,
    );

    const testId = await getTestIdTag("menu-list-item-user-profile-my-profile");

    click(testId);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
