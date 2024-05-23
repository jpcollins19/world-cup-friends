import * as React from "react";
import { routes, colors } from "../../store";
import UserIcon from "@mui/icons-material/AccountBox";
import MenuChevron from "../buffet/MenuChevron";

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

  return (
    <MenuChevron
      testId={testId}
      chevron={userIcon}
      menuRoutes={dropdownOptions}
    />
  );
};

export default UserProfileChevron;
