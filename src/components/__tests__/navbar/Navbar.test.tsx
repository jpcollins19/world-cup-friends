import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

// useMediaQuery other options
//
// 1. apply "(useMediaQuery as jest.Mock).mockReturnValue(true)" to the specific mobile test
//
// 2. break out mobile testing into it's own file, and apply the below to the overall file
//
// jest.mock("react-responsive", () => ({
//   useMediaQuery: jest.fn().mockReturnValue(true),
// }));

describe("<Navbar/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Navbar />);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeTruthy();
  });

  it("renders the default subcomponents - logo & Rules route dataTestIds", async () => {
    renderWithProvider(<Navbar />);

    const logoTestId = await getTestIdTag("logo");
    const rulesRouteTestId = await getTestIdTag("comp-route-rules");

    expect(logoTestId).toBeTruthy();
    expect(rulesRouteTestId).toBeTruthy();
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      renderWithProvider(<Navbar />);

      const testId = await getTestIdTag("navbar-mobile");

      expect(testId).toBeTruthy();
    });
  });
});
