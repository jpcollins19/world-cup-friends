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
  const testId = getPageTestId("my-picks-single-group");

  const headerClass = `text-base pb-2 h-7`;

  const columnCass = `${tw.whiteTextSm} ${tw.flexJ} flex-col text-sm`;

  const predictionColumnClass = `w-40`;

  const rowClass = `h-9 border rounded border-black mb-1`;

  const astrixRowClass = `h-9 text-2xl max-w-px mt-2`;

  const rankRowClass = `${tw.flexBoth} px-3`;

  const predictionRowClass = `${tw.flexA} px-2`;

  const usersGroupPicks = useGetUserGroupPicks(groupLetter);

  const AstrixColumn: React.FunctionComponent = () => {
    const userHas3rdPlaceTeamAdvancing =
      useUserHas3rdPlaceTeamAdvancing(groupLetter);

    return (
      <div className={`${columnCass} mx-1`}>
        <div className={`${tw.whiteTextSm} ${headerClass}`}></div>

        {mapOverTeamsInAGroup.map((rank, idx) => {
          const text = rank === 3 && userHas3rdPlaceTeamAdvancing ? "*" : "";

          return (
            <div key={rank} className={`${astrixRowClass} ${rankRowClass}`}>
              {text}
            </div>
          );
        })}
      </div>
    );
  };

  const RankColumn: React.FunctionComponent = () => {
    return (
      <div className={`${columnCass} mr-1`}>
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
    return (
      <div className={`${columnCass} ${predictionColumnClass}`}>
        <div className={`${tw.whiteTextSm} ${headerClass} text-center`}>
          Prediction
        </div>

        {usersGroupPicks.map((team: TeamSchema) => (
          <div key={team.id} className={`${rowClass} ${predictionRowClass}`}>
            <div className={tw.flexBoth}>
              <img
                src={team.flag}
                className="min-w-10 max-w-10 h-5 mr-2"
                alt=""
              ></img>

              <div>{team.name}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${tw.shrinkTextBase} p-5 flex-col`}
    >
      <div className={`${tw.whiteTextSm} text-2xl pb-2`}>
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
