import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import PreSignIn from "../../preSignIn/PreSignIn";

describe("<PreSignIn/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<PreSignIn />);

    const pageTestId = await getTestIdTag("home-page");

    expect(pageTestId).toBeTruthy();
    expect(pageTestId).toHaveTextContent("Sign In");
    expect(pageTestId).toHaveStyle({
      backgroundImage: `url(/public/pics/messiTrophy.jpg)`,
    });
  });

  it("link takes user to signIn url", async () => {
    renderWithProvider(<PreSignIn />);

    const pageTestId = await getTestIdTag("home-page-link");

    expect(pageTestId).toHaveAttribute("href", "/sign-in");
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      renderWithProvider(<PreSignIn />);

      mockWindowMobileView(true);

      const pageTestId = await getTestIdTag("home-page-mobile");

      expect(pageTestId).toBeTruthy();
      expect(pageTestId).toHaveTextContent("Sign In");
      expect(pageTestId).toHaveStyle({
        backgroundImage: `url(/public/pics/messiTrophy.jpg)`,
      });
    });
  });
});
