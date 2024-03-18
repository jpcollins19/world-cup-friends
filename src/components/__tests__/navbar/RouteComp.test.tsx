import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  mockWindowMobileView,
  renderWithMemoryRouter,
  renderWithProvider,
} from "../../testingUtils";
import RouteComp from "../../navbar/comp/RouteComp";
import { routes, tw } from "../../../store";

describe("<RouteComp/>", () => {
  const routePoolPicksDataTestId = "comp-route-pool-picks";

  const poolPicksRoute = { path: routes.poolPicks, icon: "" };

  const poolPicksComponent = <RouteComp route={poolPicksRoute} />;

  it("should render the component", async () => {
    renderWithProvider(poolPicksComponent);

    const testId = await getTestIdTag(routePoolPicksDataTestId);

    expect(testId).toBeInTheDocument();
  });

  it.todo("href is correct");
  it.todo("text is correct");

  describe("isCurrentPage testing", () => {
    const routeCompLinkBaseClass = `${tw.flexA} ${tw.whiteTextSm} hover:${tw.elevate} hover:bg-sky-400 hover:shadow-routesHover w-full py-2 my-2`;

    it("when isCurrentPage is true", async () => {
      renderWithMemoryRouter(poolPicksComponent, routes.poolPicks);

      const testId = await getTestIdTag(routePoolPicksDataTestId);

      const currentPageClass = "shadow-routesSelected bg-sky-600";

      const fullClass = `${routeCompLinkBaseClass} ${currentPageClass}`;

      expect(testId).toHaveClass(fullClass);
    });

    it("when isCurrentPage is false", async () => {
      renderWithMemoryRouter(poolPicksComponent, routes.rules);

      const testId = await getTestIdTag(routePoolPicksDataTestId);

      const currentPageClass = "shadow-routesNotSelected";

      const fullClass = `${routeCompLinkBaseClass} ${currentPageClass}`;

      expect(testId).toHaveClass(fullClass);
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      const route = { path: routes.rules, icon: "" };

      renderWithProvider(<RouteComp route={route} />);

      const testId = await getTestIdTag("comp-route-rules-mobile");

      expect(testId).toBeInTheDocument();
    });
  });
});
