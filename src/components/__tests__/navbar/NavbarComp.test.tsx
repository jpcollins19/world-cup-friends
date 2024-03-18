import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<NavbarComp/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Navbar />);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  it.todo("renders correct routes when user is logged out");
  it.todo("renders correct routes when user is logged in");

  // describe("mobile view", () => {
  //   it("renders the mobile page", async () => {
  //     mockWindowMobileView(true);
  //
  //     renderProvider(<Navbar />, true);
  //
  //     const testId = await getTestIdTag("navbar-mobile");
  //
  //     expect(testId).toBeInTheDocument();
  //   });
  // });
});
