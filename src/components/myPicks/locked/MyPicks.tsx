import * as React from "react";
import {
  loadingDefault,
  getPageTestId,
  tDispatch,
  tw,
  routes,
  me,
  loadUsers,
  loadTourneyStage,
  loadTeams,
  RootState,
  TeamSchema,
  geti18n,
} from "../../../store";
import { LinkButton, Loading } from "../../buffet";
import { useSelector } from "react-redux";
import { useGetAuth, useGetUser } from "../../../hooks";

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
  const myPicksContTestId = getPageTestId("my-picks-cont");
  const asteriskContTestId = getPageTestId("asterisk-cont-my-picks");
  const myPicksDataContTestId = getPageTestId("my-picks-data-cont");

  const didUserSubmitPicks = false;

  const auth = useGetAuth();
  const user = useGetUser(auth.id!!);

  // console.log("auth", auth);
  // console.log("user", user);

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={pageTestId}
      className={tw.backgroundImage}
      style={{ backgroundImage: `url(${jCole})` }}
    >
      <div
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${tw.shrinkText2XLg} pt-5`}
      >
        {user.name}
      </div>

      <div className={tw.flexBoth}>
        <LinkButton
          route={routes.myPicksEdit}
          text={geti18n("selectGroupPicks")}
        />
      </div>

      {didUserSubmitPicks && (
        <div data-testid={myPicksContTestId} className="h-1/6">
          <div data-testid={asteriskContTestId} className="h-1/6">
            {/*{finishedGroups.length && <Asterisk_Cont />*/}
            3rd place Asterisk_Cont placeholder
          </div>

          <div data-testid={myPicksDataContTestId} className="h-1/6">
            userPicks cont
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPicks;
