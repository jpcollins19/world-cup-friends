import * as React from "react";
import {
  loadingDefault,
  getPageTestId,
  tDispatch,
  loadTeams,
  tw,
  groupLetters,
} from "../../store";
import { Loading } from "../buffet";
import SingleGroupCont from "./SingleGroupCont";

export const GroupDetails: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(loadTeams());
    })();
  }, []);

  const legendsOfTheWC = "/public/pics/legends.jpg";

  const isAGroupFinished = false; //need to test for this during stage 3 testing

  const groupDetailsContClass = isAGroupFinished
    ? "h-5/6"
    : "h-full pt-20 px-3";

  const pageTestId = getPageTestId("group-details-page");
  const asteriskContTestId = getPageTestId("asterisk-cont-group-details");
  const groupDetailsTestId = getPageTestId("group-details-cont");

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={pageTestId}
      className={tw.backgroundImage}
      style={{ backgroundImage: `url(${legendsOfTheWC})` }}
    >
      {isAGroupFinished && (
        <div data-testid={asteriskContTestId} className="h-1/6">
          {/*{finishedGroups.length && <Asterisk_Cont />*/}
          3rd place Asterisk_Cont placeholder
        </div>
      )}

      <div
        data-testid={groupDetailsTestId}
        className={`${groupDetailsContClass} ${tw.overFlowAuto} flex flex-wrap justify-around`}
      >
        {groupLetters.map((letter) => (
          <SingleGroupCont key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
