import * as React from "react";
import { geti18n, getPageTestId, routes, tw, colors } from "../../store";
import UserIcon from "@mui/icons-material/AccountBox";
import MenuChevron from "../buffet/MenuChevron";

export const UserProfileChevron: React.FunctionComponent = () => {
  const testId = getPageTestId("user-profile-dropdown");

  const chevronTestId = "user-profile";

  const chevronPlacement = "h-24 fixed right-10 top-10";

  const menuOptionsPlacement = "fixed right-10 top-15";

  const userIcon = (
    <UserIcon
      sx={{
        fontSize: 50,
        color: colors.navbarBackground,
        background: colors.navbarIconColor,
      }}
    />
  );

  const myProfile = { text: geti18n("myProfile"), route: routes.myProfile };
  const signOut = { text: geti18n("signOut"), route: routes.signIn };

  const dropdownOptions = [myProfile, signOut];

  return (
    <div data-testid={testId} className="h-24 fixed right-10 top-5">
      <MenuChevron
        testId={chevronTestId}
        chevronPlacement={chevronPlacement}
        chevron={userIcon}
        menuOptionsPlacement={menuOptionsPlacement}
        menuOptions={dropdownOptions}
      />
    </div>
  );
};

export default UserProfileChevron;
