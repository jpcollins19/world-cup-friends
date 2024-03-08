import * as React from "react";
import Rules from "@mui/icons-material/LibraryBooks";
import Scorecard from "@mui/icons-material/EmojiEvents";
import PoolPicks from "@mui/icons-material/People";
import MyPicks from "@mui/icons-material/DnsRounded";
import Admin from "@mui/icons-material/SettingsAccessibility";
import GolferOdds from "@mui/icons-material/BarChart";
import { routes, tw } from "../../../store";
import RouteComp, { RouteProps } from "./RouteComp";
import { useIsUserAdmin, useIsUserLoggedIn } from "../../../hooks";
import PayoutData from "../PayoutData";

export const NavbarComp: React.FunctionComponent = () => {
  const color = "#cbd5e1";
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

  return (
    <div
      data-testid="navbar-comp"
      className={`${tw.elevate} w-full h-4/5 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700`}
    >
      {routesToUse.map((route, idx) => (
        <RouteComp key={idx} route={route} />
      ))}

      <PayoutData />
    </div>
  );
};

export default NavbarComp;
