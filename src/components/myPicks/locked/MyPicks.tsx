import * as React from "react";
import {
  loadingDefault,
  getPageTestId,
  tDispatch,
  tw,
  routes,
  loadUsers,
  geti18n,
} from "../../../store";
import { LinkButton, Loading } from "../../buffet";
import { useGetAuth, useUserGroupPicksSubmitted } from "../../../hooks";
import MyGroupPicks from "./MyGroupPicks";
import UserTotalPointsBreakdown from "./UserTotalPointsBreakdown";

export const MyPicks: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(loadUsers());
    })();
  }, []);

  const jCole =
    "https://cdn.shoot.co.uk/wp-content/uploads/2018/07/Joe-Cole-9.jpg";

  const pageTestId = getPageTestId("my-picks-page");
  const userNameTestId = getPageTestId("my-picks-user-name");

  const user = useGetAuth();

  const userGroupPicksSubmitted = useUserGroupPicksSubmitted();

  const editPicksButtonText = userGroupPicksSubmitted
    ? geti18n("adjustGroupPicks")
    : geti18n("selectGroupPicks");

  const paddingClass = userGroupPicksSubmitted ? "pr-44" : "";

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={pageTestId}
      className={`${tw.backgroundImage} ${tw.overFlowAuto} ${tw.cursorArrow}`}
      style={{ backgroundImage: `url(${jCole})` }}
    >
      <div
        data-testid={userNameTestId}
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${tw.shrinkText2XLg} ${paddingClass} pt-5`}
      >
        {user.name}
      </div>

      <div className={`${tw.flexBoth} ${paddingClass}`}>
        <LinkButton route={routes.myPicksEdit} text={editPicksButtonText} />
      </div>

      <UserTotalPointsBreakdown />

      <MyGroupPicks />
    </div>
  );
};

export default MyPicks;
