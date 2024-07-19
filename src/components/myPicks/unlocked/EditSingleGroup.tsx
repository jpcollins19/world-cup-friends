import * as React from "react";
import { useFormikContext } from "formik";
import {
  convertTeamDropdown,
  getPageTestId,
  mapOverTeamsInAGroup,
  navbarBackground,
  tw,
} from "../../../store";
import {
  useGetTeamsForGroupDropdown,
  useGetUserGroupPicks,
} from "../../../hooks";
import { Dropdown } from "../../buffet";
import { UserGroupPicksSchema } from "./GroupPicksSchema";

type SingleGroupProps = {
  onChange: any;
  groupLetter: string;
};

export const EditSingleGroup: React.FunctionComponent<SingleGroupProps> = ({
  onChange,
  groupLetter,
}) => {
  const testId = getPageTestId(`edit-single-group-${groupLetter}`);

  const groupHeaderTestId = getPageTestId(`esg-header-${groupLetter}`);

  const headerClass = `text-base pb-2 h-7`;

  const columnCass = `${tw.whiteTextSm} ${tw.flexJ} flex-col text-sm`;

  const rowClass = `${tw.flexBoth} px-3 h-10 border-2 rounded border-white mb-1`;

  const usersGroupPicks = useGetUserGroupPicks(groupLetter);

  const groupTeams = useGetTeamsForGroupDropdown("A");

  const RankColumn: React.FunctionComponent = () => {
    const rankTestId = getPageTestId(`esg-rank-${groupLetter}`);

    return (
      <div data-testid={rankTestId} className={`${columnCass} mr-1 ml-4`}>
        <div className={`${tw.whiteTextSm} ${headerClass}`}>Rank</div>

        {mapOverTeamsInAGroup.map((rank) => (
          <div key={rank} className={rowClass}>
            {rank}
          </div>
        ))}
      </div>
    );
  };

  const PredictionColumn: React.FunctionComponent = () => {
    const predictionsTestId = getPageTestId(`esg-predictions-${groupLetter}`);

    const { values } = useFormikContext<UserGroupPicksSchema>();

    return (
      <div data-testid={predictionsTestId} className={columnCass}>
        <div className={`${tw.whiteTextSm} ${headerClass} text-center`}>
          Prediction
        </div>

        {groupTeams.map((team: any, idx: number) => {
          const placement = idx + 1;

          const dropdownRowTestId = getPageTestId(
            `esg-dropdown-row-${groupLetter}-${placement}`,
          );

          const userHasAPick = usersGroupPicks?.length;

          const key = `${groupLetter}${placement}`;

          const teamPick = convertTeamDropdown(values[key]);

          // console.log("team", team);
          //
          // console.log("byahValues", values);

          return (
            <div
              key={idx}
              data-testid={dropdownRowTestId}
              className={`${tw.flexBoth} mb-1`}
            >
              <Dropdown
                placeholder={userHasAPick ? null : "Select Team"}
                defaultValue={userHasAPick ? teamPick.value : null}
                // defaultValue={
                //   userHasAPick
                //     ? convertTeamDropdown(usersGroupPicks[idx])
                //     : null
                // }
                options={groupTeams}
                width="14"
                set={(value) => onChange(groupLetter, value.value, idx + 1)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const ThirdPlaceToAdvanceColumn: React.FunctionComponent = () => {
    const thirdPlaceToAdvanceTestId = getPageTestId(
      `esg-3rd-place-advance-${groupLetter}`,
    );

    return (
      <div
        data-testid={thirdPlaceToAdvanceTestId}
        className={`${columnCass} ml-1`}
      >
        <div className={`${tw.whiteTextSm} ${headerClass}`}></div>

        {mapOverTeamsInAGroup.map((rank) =>
          rank === 3 ? (
            <input
              key={rank}
              type="checkbox"
              //defaultChecked={userSelectedThirdPlaceToAdvance}
              //onChange={() => onChange(group, "thirdPlaceAdvanceToKO")}
            ></input>
          ) : (
            <div key={rank} className="px-3 h-10 mb-1"></div>
          ),
        )}
      </div>
    );
  };

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${tw.shrinkTextBase} px-10 flex-col`}
    >
      <div
        data-testid={groupHeaderTestId}
        className={`${tw.whiteTextSm} text-2xl pb-2`}
      >
        Group {groupLetter}
      </div>

      <div
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${navbarBackground} border rounded-lg py-4 w-80`}
      >
        <RankColumn />

        <PredictionColumn />

        <ThirdPlaceToAdvanceColumn />
      </div>
    </div>
  );
};

export default EditSingleGroup;
