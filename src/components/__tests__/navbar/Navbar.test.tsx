import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderProvider,
} from "../../testingUtils";
import Navbar from "../../navbar/Navbar";

// useMediaQuery other options
//
// 1. apply "(useMediaQuery as jest.Mock).mockReturnValue(true)" to the specific mobile test
//
// 2. break out mobile testing into it's own file, and apply the below to the overall file
//
// jest.mock("react-responsive", () => ({
//   useMediaQuery: jest.fn().mockReturnValue(true),
// }));

describe("<Navbar/>", () => {
  it("should render the component", async () => {
    renderProvider(<Navbar />, true);

    const testId = await getTestIdTag("navbar");

    expect(testId).toBeInTheDocument();
  });

  it("renders the default subcomponents - logo & Rules route dataTestIds", async () => {
    renderProvider(<Navbar />, true);

    const logoTestId = await getTestIdTag("logo");
    const rulesRouteTestId = await getTestIdTag("comp-route-rules");

    expect(logoTestId).toBeInTheDocument();
    expect(rulesRouteTestId).toBeInTheDocument();
  });

  ////NavbarComp
  it.todo("renders the comp");
  it.todo("renders correct routes when user is logged out");
  it.todo("renders correct routes when user is logged in");

  ////RouteComp
  it.todo("renders the comp");
  it.todo("href is correct");
  it.todo("text is correct");
  it.todo("class testing on isCurrentPage");

  ////PayoutData
  it.todo("test file with mocking hooks already created");
  it.todo("does not render when useShouldPayoutShow is false");
  it.todo("renders when useShouldPayoutShow is true");
  it.todo(
    "placement text and $ text and # of submitted picks is correct -- set up 3 test w diff user submitted #s",
  );

  ////EmailUpdates
  it.todo("renders the comp");
  it.todo("does not render when user is not logged in");
  it.todo("does not render when user is admin");
  it.todo("renders when user is logged in, but not admin");
  it.todo("accurate href");
  it.todo("accurate text shows based on user emailNotification");

  ////LastUpdatedContainer
  it.todo("renders LastUpdatedAdmin when user is admin");
  it.todo("renders LastUpdatedReadOnly when user is not admin");
  it.todo("does not render when user is not logged in");

  ////LastUpdatedReadOnly
  it.todo("renders the comp");
  it.todo("renders accurate lastUpdated text");

  ////LastUpdatedAdmin
  it.todo("renders the comp");
  //!editing
  it.todo("renders LastUpdatedReadOnly");
  it.todo("renders correct button");
  //editing
  it.todo("renders LastUpdatedEdit");
  it.todo("renders correct button");
  //LastUpdatedEdit
  it.todo("TextField data is accurate");
  it.todo("updating text updates the lastUpdated info in LastUpdatedReadOnly");

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      renderProvider(<Navbar />, true);

      const testId = await getTestIdTag("navbar-mobile");

      expect(testId).toBeInTheDocument();
    });
  });
});
