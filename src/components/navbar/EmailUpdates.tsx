import * as React from "react";
import { Link } from "react-router-dom";
import { me, routes, tDispatch } from "../../store";
import { useGetUser } from "../../hooks";

export const EmailUpdates: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, []);

  const user = useGetUser();

  // const emailNotificationSetting = user?.emailNotifications ? "out of" : "into";
  //
  // const compVerbiage = `Opt me ${emailNotificationSetting} email notifications`;
  //
  // const pageVerbiage = isMobile ? "Edit Notification Settings" : compVerbiage;

  return (
    <Link
      to={routes.editProfileEmailNotifications}
      // className={`email-notifications-cont${isMobile ? "-mobile" : ""}`}
    >
      {/*{pageVerbiage}*/}joe
      <p>
        Email notifications can be sent out to you each time the website is
        updated with new golfer scores!
      </p>
    </Link>
  );
};

export default EmailUpdates;
