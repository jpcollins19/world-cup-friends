import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

// jest.mock("../../../hooks", () => ({
//   // useIsMobile: jest.fn(),
//   // useIsUserAdmin: jest.fn(),
//   // useIsUserLoggedIn: jest.fn(),
//   // useGetLastUpdated: jest.fn(),
// }));

describe("<LastUpdatedReadOnly/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Navbar />);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeTruthy();
  });

  it.todo("renders accurate lastUpdated text");

  // describe("mobile view", () => {
  //   it("renders the mobile page", async () => {
  //     mockWindowMobileView(true);
  //
  //     renderProvider(<Navbar />, true);
  //
  //     const testId = await getTestIdTag("navbar-mobile");
  //
  //     expect(testId).toBeTruthy();
  //   });
  // });
});
