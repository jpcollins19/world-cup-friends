import * as React from "react";
import { routes, colors } from "../../store";
import UserIcon from "@mui/icons-material/AccountBox";
import MenuChevron from "../buffet/MenuChevron";
import { useIsUserLoggedIn } from "../../hooks";

export const UserProfileChevron: React.FunctionComponent = () => {
  const testId = "user-profile";

  const userIcon = (
    <UserIcon
      sx={{
        fontSize: 50,
        color: colors.darkGrey,
        background: colors.lightGrey,
      }}
    />
  );

  const dropdownOptions = [routes.myProfile, routes.signOut];

  const userIsLoggedIn = useIsUserLoggedIn();

  return userIsLoggedIn ? (
    <MenuChevron
      testId={testId}
      chevron={userIcon}
      menuRoutes={dropdownOptions}
    />
  ) : null;
};

export default UserProfileChevron;
