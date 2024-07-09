import * as React from "react";
import { getPageTestId, groupLetters, tw } from "../../../store";
import { useUserGroupPicksSubmitted } from "../../../hooks";
import PointsSystemTable from "./PointsSystemTable";
import SingleGroup from "./SingleGroup";

export const MyGroupPicks: React.FunctionComponent = () => {
  const testId = getPageTestId("my-group-picks");
  const myGroupPicksDataTestId = getPageTestId("my-group-picks-data");

  const userGroupPicksSubmitted = useUserGroupPicksSubmitted();

  return userGroupPicksSubmitted ? (
    <div data-testid={testId} className="h-3/4 pr-44">
      <PointsSystemTable />

      <div
        data-testid={myGroupPicksDataTestId}
        className={`${tw.flexBoth} ${tw.shrinkTextBase} flex-wrap`}
      >
        {groupLetters.map((groupLetter) => (
          <SingleGroup key={groupLetter} groupLetter={groupLetter} />
        ))}
      </div>
    </div>
  ) : null;
};

export default MyGroupPicks;
