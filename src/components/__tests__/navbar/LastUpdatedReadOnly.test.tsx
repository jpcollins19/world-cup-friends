import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<LastUpdatedReadOnly/>", () => {
  it("should render the component", async () => {
    renderProvider(<Navbar />, true);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
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
  //     expect(testId).toBeInTheDocument();
  //   });
  // });
});
