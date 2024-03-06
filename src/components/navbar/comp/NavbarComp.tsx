import * as React from "react";
import Rules from "@mui/icons-material/LibraryBooks";
import Scorecard from "@mui/icons-material/EmojiEvents";
import PoolPicks from "@mui/icons-material/People";
import MyPicks from "@mui/icons-material/DnsRounded";
import Admin from "@mui/icons-material/SettingsAccessibility";
import GolferOdds from "@mui/icons-material/BarChart";
import { routes, tw } from "../../../store";
import RouteComp from "./RouteComp";

export const NavbarComp: React.FunctionComponent = () => {
  const color = "#cbd5e1";

  const rules = {
    path: routes.rules,
    icon: <Rules sx={{ color }} fontSize="large" />,
  };

  const admin = {
    path: routes.admin,
    icon: <Admin sx={{ color }} fontSize="large" />,
  };

  const loggedInRoutes = [
    {
      path: routes.leaderboard,
      icon: <Scorecard sx={{ color }} fontSize="large" />,
    },
    {
      path: routes.myPicks,
      icon: <MyPicks sx={{ color }} fontSize="large" />,
    },
    {
      path: routes.poolPicks,
      icon: <PoolPicks sx={{ color }} fontSize="large" />,
    },
    {
      path: routes.groupDetails,
      icon: <GolferOdds sx={{ color }} fontSize="large" />,
    },
  ];

  const routesToUse = [admin, ...loggedInRoutes, rules];

  return (
    <div
      data-testid="navbar-comp"
      className={`${tw.elevate} w-full h-4/5 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700`}
    >
      {routesToUse.map((route, idx) => (
        <RouteComp key={idx} route={route} />
      ))}
    </div>
  );
};

export default NavbarComp;
