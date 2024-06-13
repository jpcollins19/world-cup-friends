import * as React from "react";
import { getPageTestId, tw, geti18n, navbarBackground } from "../../../store";

export const PointsSystemTable: React.FunctionComponent = () => {
  const testId = getPageTestId("points-system-table");

  const indicatorColumnTestId = getPageTestId("pst-indicator-column");
  const verbiageColumnTestId = getPageTestId("pst-verbiage-column");

  const astrixTestId = getPageTestId("pst-astrix");
  const thirdPlaceTextAstrixTestId = getPageTestId(
    "pst-astrix-third-place-text",
  );

  return (
    <div data-testid={testId} className={`${tw.flexBoth} ${tw.shrinkTextBase}`}>
      <div
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${navbarBackground} border rounded-lg py-2 px-4`}
      >
        <div
          data-testid={indicatorColumnTestId}
          className={`${tw.flexBoth} flex-col pr-2`}
        >
          <div data-testid={astrixTestId} className="pt-2">
            *
          </div>
        </div>

        <div
          data-testid={verbiageColumnTestId}
          className={`${tw.flexBoth} flex-col`}
        >
          <div data-testid={thirdPlaceTextAstrixTestId}>
            {geti18n("thirdPlaceTeamAdvance")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSystemTable;
