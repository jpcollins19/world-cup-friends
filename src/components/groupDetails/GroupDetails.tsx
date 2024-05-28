import * as React from "react";
import { loadingDefault, getPageTestId, tw, groupLetters } from "../../store";
import { Loading } from "../buffet";
import SingleGroupCont from "./SingleGroupCont";

export const GroupDetails: React.FunctionComponent = () => {
  const testId = getPageTestId("group-details-page");

  const legendsOfTheWC = "/public/pics/legends.jpg";

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={testId}
      className={`${tw.backgroundImage}`}
      style={{ backgroundImage: `url(${legendsOfTheWC})` }}
    >
      <div className={`${tw.bRed} h-1/6`}>
        3rd place Asterisk_Cont placeholder
        {/*{finishedGroups.length && <Asterisk_Cont />*/}
      </div>

      <div className={`${tw.bPurple} flex flex-wrap justify-around h-5/6`}>
        {groupLetters.map((letter) => (
          <SingleGroupCont key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
