import * as React from "react";
import {
  loadingDefault,
  getPageTestId,
  tDispatch,
  tw,
  routes,
  loadUsers,
  geti18n,
  groupLetters,
} from "../../../store";
import { LinkButton, Loading } from "../../buffet";
import { useGetAuth, useUserGroupPicksSubmitted } from "../../../hooks";
import MyGroupPicks from "./MyGroupPicks";
import SingleGroup from "./SingleGroup";

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
  const myGroupPicksTestId = getPageTestId("my-group-picks");

  const user = useGetAuth();

  const userGroupPicksSubmitted = useUserGroupPicksSubmitted();

  const editPicksButtonText = userGroupPicksSubmitted
    ? geti18n("adjustGroupPicks")
    : geti18n("selectGroupPicks");

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
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${tw.shrinkText2XLg} pt-5`}
      >
        {user.name}
      </div>

      <div className={`${tw.flexBoth}`}>
        <LinkButton route={routes.myPicksEdit} text={editPicksButtonText} />
      </div>

      <MyGroupPicks />
    </div>
  );
};

export default MyPicks;
