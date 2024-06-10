import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import NoMatch from "../../noMatch/NoMatch";

describe("<NoMatch/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<NoMatch />);

    const pageTestId = await getTestIdTag("no-match-page");

    expect(pageTestId).toBeTruthy();

    expect(pageTestId).toHaveTextContent("404 Error");
    expect(pageTestId).toHaveTextContent("Click here for the Home Page");
    expect(pageTestId).toHaveStyle({
      backgroundImage: `url(/public/pics/monkey404.jpg)`,
    });
  });

  it("link takes user to signIn url", async () => {
    renderWithProvider(<NoMatch />);

    const pageTestId = await getTestIdTag("no-match-link");

    expect(pageTestId).toHaveAttribute("href", "/leaderboard");
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      renderWithProvider(<NoMatch />);

      mockWindowMobileView(true);

      const pageTestId = await getTestIdTag("no-match-page-mobile");

      expect(pageTestId).toBeTruthy();
      expect(pageTestId).toHaveTextContent("404 Error");
      expect(pageTestId).toHaveTextContent("Click here for the Home Page");
      expect(pageTestId).toHaveStyle({
        backgroundImage: `url(/public/pics/monkey404.jpg)`,
      });
    });
  });
});
