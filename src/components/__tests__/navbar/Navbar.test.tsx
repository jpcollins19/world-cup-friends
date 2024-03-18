import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderProvider,
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
    renderProvider(<Navbar />, true);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  it("renders the default subcomponents - logo & Rules route dataTestIds", async () => {
    renderProvider(<Navbar />, true);

    const logoTestId = await getTestIdTag("logo");
    const rulesRouteTestId = await getTestIdTag("comp-route-rules");

    expect(logoTestId).toBeInTheDocument();
    expect(rulesRouteTestId).toBeInTheDocument();
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      renderProvider(<Navbar />, true);

      const testId = await getTestIdTag("navbar-mobile");

      expect(testId).toBeInTheDocument();
    });
  });
});
