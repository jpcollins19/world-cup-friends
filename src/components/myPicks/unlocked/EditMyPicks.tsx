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
// import MyGroupPicks from "./MyGroupPicks";
// import SingleGroup from "./SingleGroup";

export const EditMyPicks: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(loadUsers());
    })();
  }, []);

  const pageTestId = getPageTestId("edit-my-picks-page");
  const userNameTestId = getPageTestId("my-picks-user-name");

  const user = useGetAuth();

  const userGroupPicksSubmitted = useUserGroupPicksSubmitted();

  const editPicksButtonText = userGroupPicksSubmitted
    ? geti18n("adjustGroupPicks")
    : geti18n("selectGroupPicks");

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div data-testid={pageTestId} className={tw.cursorArrow}>
      <div
        data-testid={userNameTestId}
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${tw.shrinkText2XLg} pt-5`}
      >
        {user.name} - edit picks
      </div>

      <div className={`${tw.flexBoth}`}>
        <LinkButton route={routes.myPicksEdit} text={editPicksButtonText} />
      </div>
    </div>
  );
};

export default EditMyPicks;
