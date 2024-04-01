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
  const routePoolPicksTestId = "comp-route-pool-picks";

  const poolPicksRoute = { path: routes.poolPicks, icon: "" };

  const poolPicksComponent = <RouteComp route={poolPicksRoute} />;

  it("should render the component", async () => {
    renderWithProvider(poolPicksComponent);

    const testId = await getTestIdTag(routePoolPicksTestId);

    expect(testId).toBeTruthy();
  });

  it("href and text are accurate", async () => {
    renderWithProvider(poolPicksComponent);

    const testId = await getTestIdTag(routePoolPicksTestId);
    const textTestId = await getTestIdTag("route-comp-text");

    expect(testId).toHaveAttribute("href", "/pool-picks");
    expect(textTestId.textContent).toEqual("Pool Picks");
  });

  describe("isCurrentPage testing", () => {
    const routeCompLinkBaseClass = `${tw.flexA} ${tw.whiteTextSm} hover:${tw.elevate} hover:bg-sky-400 hover:shadow-routesHover w-full py-2 my-2`;

    it("when isCurrentPage is true", async () => {
      renderWithMemoryRouter(poolPicksComponent, routes.poolPicks);

      const testId = await getTestIdTag(routePoolPicksTestId);

      const currentPageClass = "shadow-routesSelected bg-sky-600";

      const fullClass = `${routeCompLinkBaseClass} ${currentPageClass}`;

      expect(testId).toHaveClass(fullClass);
    });

    it("when isCurrentPage is false", async () => {
      renderWithMemoryRouter(poolPicksComponent, routes.rules);

      const testId = await getTestIdTag(routePoolPicksTestId);

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

      expect(testId).toBeTruthy();
    });
  });
});
