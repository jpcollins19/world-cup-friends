import * as React from "react";
import { Link } from "react-router-dom";
import {
  geti18n,
  getPageTestId,
  me,
  tDispatch,
  tw,
  navbarBackground,
  routes,
} from "../../store";
import { useGetAuth, useIsUserAdmin, useIsUserLoggedIn } from "../../hooks";

export const EmailUpdates: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, []);

  const user = useGetAuth();

  const compVerbiage = user?.emailNotifications
    ? geti18n("emailNotificationsOptOut")
    : geti18n("emailNotificationsOptIn");

  const isAdmin = useIsUserAdmin();

  const hoverClass = isHovered ? "" : "hidden";

  const testId = getPageTestId("email-updates");

  return useIsUserLoggedIn() && !isAdmin ? (
    <Link
      data-testid={testId}
      to={routes.editProfileEmailNotifications}
      className={`${tw.flexBoth} ${tw.whiteTextMed} ${tw.shrinkTextSm}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {compVerbiage}
      <p
        className={`${navbarBackground} ${hoverClass} text-center fixed top-65 left-72 p-2 border border-black border-solid rounded-md max-w-xs`}
      >
        {geti18n("emailNotificationExplanation")}
      </p>
    </Link>
  ) : null;
};

export default EmailUpdates;
