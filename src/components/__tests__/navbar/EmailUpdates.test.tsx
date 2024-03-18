import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<EmailUpdates/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Navbar />);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  it.todo("does not render when user is not logged in");
  it.todo("does not render when user is admin");
  it.todo("renders when user is logged in, but not admin");
  it.todo("accurate href");
  it.todo("accurate text shows based on user emailNotification");

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
