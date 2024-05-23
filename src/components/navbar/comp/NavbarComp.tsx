import * as React from "react";
import Rules from "@mui/icons-material/LibraryBooks";
import Scorecard from "@mui/icons-material/EmojiEvents";
import PoolPicks from "@mui/icons-material/People";
import MyPicks from "@mui/icons-material/DnsRounded";
import Admin from "@mui/icons-material/SettingsAccessibility";
import GolferOdds from "@mui/icons-material/BarChart";
import {
  colors,
  getPageTestId,
  navbarBackground,
  routes,
  tw,
} from "../../../store";
import RouteComp, { RouteProps } from "./RouteComp";
import { useIsUserAdmin, useIsUserLoggedIn } from "../../../hooks";
import PayoutData from "../PayoutData";
import EmailUpdates from "../EmailUpdates";
import LastUpdatedContainer from "../lastUpdated/LastUpdatedContainer";

export const NavbarComp: React.FunctionComponent = () => {
  const iconColor = colors.lightGrey;
  const iconFontSize = "large";

  const rules: RouteProps = {
    path: routes.rules,
    icon: <Rules sx={{ color: iconColor }} fontSize={iconFontSize} />,
  };

  const admin: RouteProps = {
    path: routes.admin,
    icon: <Admin sx={{ color: iconColor }} fontSize={iconFontSize} />,
  };

  const loggedInRoutes: RouteProps[] = [
    {
      path: routes.leaderboard,
      icon: <Scorecard sx={{ color: iconColor }} fontSize={iconFontSize} />,
    },
    {
      path: routes.myPicks,
      icon: <MyPicks sx={{ color: iconColor }} fontSize={iconFontSize} />,
    },
    {
      path: routes.poolPicks,
      icon: <PoolPicks sx={{ color: iconColor }} fontSize={iconFontSize} />,
    },
    {
      path: routes.groupDetails,
      icon: <GolferOdds sx={{ color: iconColor }} fontSize={iconFontSize} />,
    },
  ];

  const routesToUse: RouteProps[] = [rules];

  const userIsLoggedIn: boolean = useIsUserLoggedIn();

  if (userIsLoggedIn) {
    routesToUse.unshift(...loggedInRoutes);
  }

  const userIsAdmin: boolean = useIsUserAdmin();

  if (userIsAdmin) {
    routesToUse.unshift(admin);
  }

  const bottomContClass = userIsLoggedIn ? "shadow-routesNotSelected" : "";

  const testId = getPageTestId("navbar-comp");

  return (
    <div
      data-testid={testId}
      className={`${tw.elevate} ${navbarBackground} w-full h-4/5 flex flex-col justify-between`}
    >
      <div className="flex-1">
        {routesToUse.map((route, idx) => (
          <RouteComp key={idx} route={route} />
        ))}
      </div>

      <div className="flex-4">
        <PayoutData />
      </div>

      <div
        className={`${bottomContClass} h-full flex flex-col flex-1 justify-around`}
      >
        <EmailUpdates />
        <LastUpdatedContainer />
      </div>
    </div>
  );
};

export default NavbarComp;
