import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithRouter,
} from "../../testingUtils";
import { LinkButton } from "../../buffet";
import { routes } from "../../../store";

describe("<LinkButton/>", () => {
  it("should render the component with accurate text and route data", async () => {
    renderWithRouter(
      <LinkButton route={routes.myPicksEdit} text="Select Group Picks" />,
    );

    await getTestIdTag(`link-button-cont-select-group-picks`);
    await getTestIdTag(`link-button-select-group-picks`);
    const linkTestId = await getTestIdTag(
      `link-button-link-select-group-picks`,
    );

    expect(linkTestId).toHaveAttribute("href", routes.myPicksEdit);
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockWindowMobileView(true);

      renderWithRouter(
        <LinkButton route={routes.myPicksEdit} text="Adjust Group Picks" />,
      );

      await getTestIdTag(`link-button-cont-adjust-group-picks-mobile`);
      await getTestIdTag(`link-button-adjust-group-picks-mobile`);
      const linkTestId = await getTestIdTag(
        `link-button-link-adjust-group-picks-mobile`,
      );

      expect(linkTestId).toHaveAttribute("href", routes.myPicksEdit);
    });
  });
});
