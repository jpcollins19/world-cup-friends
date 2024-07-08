import * as React from "react";
import {
  getPageTestId,
  mapOverTeamsInAGroup,
  navbarBackground,
  TeamSchema,
  tw,
} from "../../../store";
import {
  useGetUserGroupPicks,
  useUserHas3rdPlaceTeamAdvancing,
} from "../../../hooks";

type SingleGroupProps = {
  groupLetter: string;
};

export const SingleGroup: React.FunctionComponent<SingleGroupProps> = ({
  groupLetter,
}) => {
  const testId = getPageTestId(`my-picks-single-group-${groupLetter}`);

  const groupHeaderTestId = getPageTestId(`mpsg-header-${groupLetter}`);

  const headerClass = `text-base pb-2 h-7`;

  const columnCass = `${tw.whiteTextSm} ${tw.flexJ} flex-col text-sm`;

  const predictionColumnClass = `w-40`;

  const rowClass = `h-9 border rounded border-black mb-1`;

  const astrixRowClass = `h-9 text-2xl max-w-px mt-2`;

  const rankRowClass = `${tw.flexBoth} px-3`;

  const predictionRowClass = `${tw.flexA} px-2`;

  const usersGroupPicks = useGetUserGroupPicks(groupLetter);

  // const test = groupLetter === "A";

  const AstrixColumn: React.FunctionComponent = () => {
    const userHas3rdPlaceTeamAdvancing =
      useUserHas3rdPlaceTeamAdvancing(groupLetter);

    const astrixTestId = getPageTestId(`mpsg-astrix-${groupLetter}`);

    return (
      <div data-testid={astrixTestId} className={`${columnCass} mx-1`}>
        <div className={`${tw.whiteTextSm} ${headerClass}`}></div>

        {mapOverTeamsInAGroup.map((rank, idx) => {
          const text = rank === 3 && userHas3rdPlaceTeamAdvancing ? "*" : "";

          const astrixTextTestId = getPageTestId(
            `mpsg-astrix-text-${groupLetter}-${rank}`,
          );

          return (
            <div
              key={rank}
              data-testid={astrixTextTestId}
              className={`${astrixRowClass} ${rankRowClass}`}
            >
              {text}
            </div>
          );
        })}
      </div>
    );
  };

  const RankColumn: React.FunctionComponent = () => {
    const rankTestId = getPageTestId(`mpsg-rank-${groupLetter}`);

    return (
      <div data-testid={rankTestId} className={`${columnCass} mr-1`}>
        <div className={`${tw.whiteTextSm} ${headerClass}`}>Rank</div>

        {mapOverTeamsInAGroup.map((rank) => (
          <div key={rank} className={`${rowClass} ${rankRowClass}`}>
            {rank}
          </div>
        ))}
      </div>
    );
  };

  const PredictionColumn: React.FunctionComponent = () => {
    const predictionsTestId = getPageTestId(`mpsg-predictions-${groupLetter}`);

    return (
      <div
        data-testid={predictionsTestId}
        className={`${columnCass} ${predictionColumnClass}`}
      >
        <div className={`${tw.whiteTextSm} ${headerClass} text-center`}>
          Prediction
        </div>

        {usersGroupPicks.map((team: TeamSchema, idx: number) => {
          const teamRowTestId = getPageTestId(
            `mpsg-team-row-${groupLetter}-${idx + 1}`,
          );

          return (
            <div key={team.id} className={`${rowClass} ${predictionRowClass}`}>
              <div data-testid={teamRowTestId} className={tw.flexBoth}>
                <img
                  src={team.flag}
                  className="min-w-10 max-w-10 h-5 mr-2"
                  alt=""
                ></img>

                <div>{team.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${tw.shrinkTextBase} p-5 flex-col`}
    >
      <div
        data-testid={groupHeaderTestId}
        className={`${tw.whiteTextSm} text-2xl pb-2`}
      >
        Group {groupLetter}
      </div>

      <div
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${navbarBackground} border rounded-lg py-4`}
      >
        <AstrixColumn />

        <RankColumn />

        <PredictionColumn />

        <AstrixColumn />
      </div>
    </div>
  );
};

export default SingleGroup;
