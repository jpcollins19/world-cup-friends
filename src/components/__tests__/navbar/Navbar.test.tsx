import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getTestIdTag, mockIsMobile } from "../../testingUtils";
import Navbar from "../../navbar/Navbar";
import store from "../../../store";

// useMediaQuery other options
//
// 1. apply "(useMediaQuery as jest.Mock).mockReturnValue(true)" to the specific mobile test
//
// 2. breka out mobile testing into it's own file, and apply the below to the overall file
//
// jest.mock("react-responsive", () => ({
//   useMediaQuery: jest.fn().mockReturnValue(true),
// }));

describe("<Navbar/>", () => {
  it("should render the component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const testId = await getTestIdTag("navbar");
    const navbarTestId = await getTestIdTag("navbar-comp");

    expect(testId).toBeInTheDocument();
    expect(navbarTestId).toBeInTheDocument();
  });

  it.todo("renders the logo and NavbarComp components");

  it.todo(
    "NavBarComp -- renders the RouteComp components and all routes based on applicable auth state",
  );

  it.todo("RouteComp -- renders the data needed");

  it.todo("PayoutTable -- renders the data needed");

  // describe("classTesting", () => {
  //   const testsToRun = [
  //     {
  //       testId: "navbar-comp",
  //       result: "w-full h-4/5",
  //     },
  //   ];
  //
  //   describe("comp view", () => {
  //     testsToRun.forEach((test) => {
  //       it(`${test.testId}`, async () => {
  //         render(
  //           <Router>
  //             <Navbar />
  //           </Router>,
  //         );
  //
  //         const testId = await getTestIdTag(test.testId);
  //         expect(testId).toHaveClass(test.result);
  //       });
  //     });
  //   });
  // });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockIsMobile(true);

      render(
        <Provider store={store}>
          <Router>
            <Navbar />
          </Router>
        </Provider>,
      );

      const testId = await getTestIdTag("navbar-mobile");
      //const navbarTestId = await getTestIdTag("navbar-comp");

      expect(testId).toBeInTheDocument();
      // expect(navbarTestId).toBeInTheDocument();
    });

    it.todo("renders the logo and navBar mobile components");

    it.todo("PayoutTable -- renders the data needed");
  });
});
