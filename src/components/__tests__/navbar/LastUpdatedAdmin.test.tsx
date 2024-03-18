import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<LastUpdatedAdmin/>", () => {
  it("should render the component", async () => {
    renderProvider(<Navbar />, true);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  //!editing
  it.todo("renders LastUpdatedReadOnly");
  it.todo("renders correct button");
  //editing
  it.todo("renders LastUpdatedEdit");
  it.todo("renders correct button");
  //LastUpdatedEdit
  it.todo("TextField data is accurate");
  it.todo("updating text updates the lastUpdated info in LastUpdatedReadOnly");

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
