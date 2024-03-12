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

  it.todo("renders the default subcomponents - logo & Rules route dataTestIds");

  it.todo(
    "NavBarComp -- new test file -- renders the RouteComp components and all routes based on applicable auth state",
  );

  it.todo("RouteComp -- new test file");

  it.todo("PayoutData -- test file with mocking hooks already created");

  it.todo("EmailUpdates");

  it.todo("LastUpdated");

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      renderProvider(<Navbar />, true);

      const testId = await getTestIdTag("navbar-mobile");

      expect(testId).toBeInTheDocument();
    });
  });
});
