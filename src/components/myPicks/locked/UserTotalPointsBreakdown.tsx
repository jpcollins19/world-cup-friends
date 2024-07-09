import * as React from "react";
import {
  getPageTestId,
  tDispatch,
  tw,
  darkGreyGradientBackground,
} from "../../../store";
import { useUserGroupPicksSubmitted } from "../../../hooks";

export const UserTotalPointsBreakdown: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  // React.useEffect(() => {
  //   (async () => {
  //     await dispatch(loadUsers());
  //   })();
  // }, []);

  const testId = getPageTestId("user-total-pts-breakdown");

  const userGroupPicksSubmitted = useUserGroupPicksSubmitted();

  const cellClass = `${tw.flexBoth} ${tw.whiteTextMed} w-full`;

  const headerTextClass = `text-xl mb-2`;

  const rowTextClass = `${darkGreyGradientBackground} text-base mb-2 shadow-2xl border-solid border border-slate-50`;

  const columnClass = `${tw.flexBoth} flex-col m-1`;

  const stageColumnClass = `min-w-24`;

  const ptsColumnClass = `min-w-16`;

  ///load auth in useEffect during stage 3?
  //each stage pts
  //tiebreaker data

  return userGroupPicksSubmitted ? (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} fixed end-6 shadow-2xl flex-col top-1/3`}
    >
      <div className={tw.flexBoth}>
        <div className={` ${columnClass} ${stageColumnClass}`}>
          <div className={`${cellClass} ${headerTextClass}`}>Stage</div>
          <div className={`${cellClass} ${rowTextClass}`}>Group</div>
          <div className={`${cellClass} ${rowTextClass}`}>R16</div>
          <div className={`${cellClass} ${rowTextClass}`}>Quarters</div>
          <div className={`${cellClass} ${rowTextClass}`}>Semis</div>
          <div className={`${cellClass} ${rowTextClass}`}>Final</div>
          <div className={`${cellClass} ${rowTextClass}`}>Total</div>
        </div>

        <div className={` ${columnClass} ${ptsColumnClass}`}>
          <div className={`${cellClass} ${headerTextClass}`}>Pts</div>
          <div className={`${cellClass} ${rowTextClass}`}>34</div>
          <div className={`${cellClass} ${rowTextClass}`}>23</div>
          <div className={`${cellClass} ${rowTextClass}`}>21</div>
          <div className={`${cellClass} ${rowTextClass}`}>16</div>
          <div className={`${cellClass} ${rowTextClass}`}>10</div>
          <div className={`${cellClass} ${rowTextClass}`}>100</div>
        </div>
      </div>

      <div className={cellClass}>Tiebreaker: 130 goals</div>
    </div>
  ) : null;
};

export default UserTotalPointsBreakdown;
