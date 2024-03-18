import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<LastUpdatedContainer/>", () => {
  it("should render the component", async () => {
    renderWithProvider(<Navbar />);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  it.todo("renders LastUpdatedAdmin when user is admin");
  it.todo("renders LastUpdatedReadOnly when user is not admin");
  it.todo("does not render when user is not logged in");

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
