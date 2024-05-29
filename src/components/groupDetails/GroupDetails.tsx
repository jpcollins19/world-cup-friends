import * as React from "react";
import { loadingDefault, getPageTestId, tw, groupLetters } from "../../store";
import { Loading } from "../buffet";
import SingleGroupCont from "./SingleGroupCont";

export const GroupDetails: React.FunctionComponent = () => {
  const legendsOfTheWC = "/public/pics/legends.jpg";

  const testId = getPageTestId("group-details-page");
  const groupDetailsTestId = getPageTestId("group-details-cont");

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={testId}
      className={`${tw.backgroundImage} ${tw.overFlowAuto}`}
      style={{ backgroundImage: `url(${legendsOfTheWC})` }}
    >
      <div className={`${tw.bRed} h-1/6`}>
        3rd place Asterisk_Cont placeholder
        {/*{finishedGroups.length && <Asterisk_Cont />*/}
      </div>

      <div
        data-testid={groupDetailsTestId}
        className={`${tw.bPurple} flex flex-wrap justify-around h-5/6`}
      >
        {groupLetters.map((letter) => (
          <SingleGroupCont key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
