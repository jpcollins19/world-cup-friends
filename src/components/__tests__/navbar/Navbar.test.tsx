import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<Navbar/>", () => {
  it("should render the component", async () => {
    render(<Navbar />);

    const testId = await getTestIdTag("navbar");
    const navbarTestId = await getTestIdTag("navbar-comp");

    expect(testId).toBeInTheDocument();
    expect(navbarTestId).toBeInTheDocument();
  });

  it.todo("lists all routes");

  describe("classTesting", () => {
    // const buttonClass = "button-submit";
    //
    // const buttonClassBaseInfo = "px-3 cursor-pointer rounded-lg font-bold";

    const testsToRun = [
      {
        testId: "navbar-comp",
        result: "w-full h-4/5",
      },
    ];

    describe("comp view", () => {
      testsToRun.forEach((test) => {
        it(`${test.testId}`, async () => {
          render(<Navbar />);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      render(<Navbar isMobile={true} />);

      const testId = await getTestIdTag("navbar-mobile");
      //const navbarTestId = await getTestIdTag("navbar-comp");

      expect(testId).toBeInTheDocument();
      // expect(navbarTestId).toBeInTheDocument();
    });
  });
});
