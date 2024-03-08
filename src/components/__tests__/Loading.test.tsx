import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag, mockIsMobile } from "../testingUtils";
import Loading from "../buffet/Loading";

describe("<Loading/>", () => {
  it("should render the component", async () => {
    render(<Loading />);

    const testId = await getTestIdTag("loading");

    expect(testId).toBeInTheDocument();
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockIsMobile(true);

      render(<Loading />);

      const testId = await getTestIdTag("loading-mobile");

      expect(testId).toBeInTheDocument();
    });
  });
});
