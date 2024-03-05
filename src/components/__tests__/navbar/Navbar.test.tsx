import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

describe("<Navbar/>", () => {
  it("should render the component", async () => {
    render(<Navbar />);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  it.todo("lists all routes");

  describe("mobile vs. comp testing", () => {
    it("renders the mobile page", async () => {
      render(<Navbar isMobile={true} />);

      const testId = await getTestIdTag("navbar-mobile");

      expect(testId).toBeInTheDocument();
    });

    // describe("classTesting", () => {
    //   const buttonClass = "button-submit";
    //
    //   const buttonClassBaseInfo = "px-3 cursor-pointer rounded-lg font-bold";
    //
    //   const testsToRun = {
    //     comp: [
    //       {
    //         testId: buttonClass,
    //         result: `${buttonClassBaseInfo} min-w-[10rem] py-2`,
    //       },
    //     ],
    //     mobile: [
    //       {
    //         testId: `${buttonClass}-mobile`,
    //         result: `${buttonClassBaseInfo} min-w-[15rem] text-2xl py-4`,
    //       },
    //     ],
    //   };
    //
    //   describe("comp view", () => {
    //     testsToRun.comp.forEach((test) => {
    //       it(`${test.testId}`, async () => {
    //         render(<Button text={submitUpperCase} />);
    //
    //         const testId = await getTestIdTag(test.testId);
    //         expect(testId).toHaveClass(test.result);
    //       });
    //     });
    //   });
    //
    //   describe("mobile view", () => {
    //     testsToRun.mobile.forEach((test) => {
    //       it(`${test.testId}`, async () => {
    //         render(<Button text={submitUpperCase} isMobile={true} />);
    //
    //         const testId = await getTestIdTag(test.testId);
    //         expect(testId).toHaveClass(test.result);
    //       });
    //     });
    //   });
    // });
  });
});
