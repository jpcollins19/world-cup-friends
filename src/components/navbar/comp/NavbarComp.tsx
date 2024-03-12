import * as React from "react";
import Rules from "@mui/icons-material/LibraryBooks";
import Scorecard from "@mui/icons-material/EmojiEvents";
import PoolPicks from "@mui/icons-material/People";
import MyPicks from "@mui/icons-material/DnsRounded";
import Admin from "@mui/icons-material/SettingsAccessibility";
import GolferOdds from "@mui/icons-material/BarChart";
import { colors, getPageTestId, routes, tw } from "../../../store";
import RouteComp, { RouteProps } from "./RouteComp";
import { useIsUserAdmin, useIsUserLoggedIn } from "../../../hooks";
import PayoutData from "../PayoutData";
import EmailUpdates from "../EmailUpdates";
import LastUpdated from "../LastUpdated";

export const NavbarComp: React.FunctionComponent = () => {
  const color = colors.navbarIconColor;
  const iconFontSize = "large";

  const rules: RouteProps = {
    path: routes.rules,
    icon: <Rules sx={{ color }} fontSize={iconFontSize} />,
  };

  const admin: RouteProps = {
    path: routes.admin,
    icon: <Admin sx={{ color }} fontSize={iconFontSize} />,
  };

  const loggedInRoutes: RouteProps[] = [
    {
      path: routes.leaderboard,
      icon: <Scorecard sx={{ color }} fontSize={iconFontSize} />,
    },
    {
      path: routes.myPicks,
      icon: <MyPicks sx={{ color }} fontSize={iconFontSize} />,
    },
    {
      path: routes.poolPicks,
      icon: <PoolPicks sx={{ color }} fontSize={iconFontSize} />,
    },
    {
      path: routes.groupDetails,
      icon: <GolferOdds sx={{ color }} fontSize={iconFontSize} />,
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

  const dataTestId = getPageTestId("navbar-comp");

  return (
    <div
      data-testid={dataTestId}
      className={`${tw.elevate} ${colors.navbarBackground} w-full h-4/5 flex flex-col justify-between`}
    >
      <div>
        {routesToUse.map((route, idx) => (
          <RouteComp key={idx} route={route} />
        ))}
      </div>

      <div className="h-full flex flex-col justify-around">
        <EmailUpdates />
        <LastUpdated />
      </div>

      <div>
        <PayoutData />
      </div>
    </div>
  );
};

export default NavbarComp;
