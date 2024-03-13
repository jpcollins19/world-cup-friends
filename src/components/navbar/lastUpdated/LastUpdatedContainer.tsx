import * as React from "react";
import { useIsUserAdmin, useIsUserLoggedIn } from "../../../hooks";
import LastUpdatedReadOnly from "./LastUpdatedReadOnly";
import LastUpdatedAdmin from "./LastUpdatedAdmin";

export const LastUpdatedContainer: React.FunctionComponent = () => {
  const userIsLoggedIn: boolean = useIsUserLoggedIn();
  const userIsAdmin: boolean = useIsUserAdmin();

  return userIsAdmin ? (
    <LastUpdatedAdmin />
  ) : userIsLoggedIn ? (
    <LastUpdatedReadOnly />
  ) : null;
};

export default LastUpdatedContainer;
