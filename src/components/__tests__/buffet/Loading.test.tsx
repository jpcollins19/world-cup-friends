import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag, mockWindowMobileView } from "../../testingUtils";
import { Loading } from "../../buffet";

describe("<Loading/>", () => {
  it("should render the component", async () => {
    render(<Loading />);

    const testId = await getTestIdTag("loading");

    expect(testId).toBeTruthy();
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      render(<Loading />);

      const testId = await getTestIdTag("loading-mobile");

      expect(testId).toBeTruthy();
    });
  });
});
