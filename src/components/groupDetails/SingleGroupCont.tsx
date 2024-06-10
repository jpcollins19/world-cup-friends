import * as React from "react";
import { useSelector } from "react-redux";
import { getPageTestId, tw, TeamSchema, RootState } from "../../store";

type SingleGroupContProps = {
  letter: string;
};

export const SingleGroupCont: React.FunctionComponent<SingleGroupContProps> = ({
  letter,
}) => {
  const teams = useSelector((state: RootState) => state.teams).filter(
    (team: TeamSchema) => team.group === letter,
  );

  const contBackground = "bg-gray-400";

  const lineBreakColor = "zinc-400";

  const isLastTwoGroups = letter === "K" || letter === "L";

  const singleGroupContClass = isLastTwoGroups ? "mt-5 mb-20" : "my-5";

  const boxClass = "flex flex-[0.5]";

  const teamColumnClass = "flex-col";

  const rowClass = `${tw.flexA} w-full h-12 border-b border-${lineBreakColor} py-2`;

  const matchResultsColumnClass = `${tw.flexBoth} flex-col w-10`;

  const matchResultsRowClass = tw.flexBoth;

  const headerClass = `${tw.shrinkTextBase} font-bold`;

  const testId = getPageTestId(`single-group-cont-${letter}`);
  const groupHeaderTestId = getPageTestId(`group-header-${letter}`);
  const groupDataContTestId = getPageTestId(`group-data-cont-${letter}`);

  const groupDataContHeaderTeamTestId = getPageTestId(
    `group-data-header-team-${letter}`,
  );

  const groupDataContHeader_MP_TestId = getPageTestId(
    `group-data-header-MP-${letter}`,
  );

  const groupDataContHeader_W_TestId = getPageTestId(
    `group-data-header-W-${letter}`,
  );

  const groupDataContHeader_D_TestId = getPageTestId(
    `group-data-header-D-${letter}`,
  );

  const groupDataContHeader_L_TestId = getPageTestId(
    `group-data-header-L-${letter}`,
  );

  const groupDataContHeader_PlusMinus_TestId = getPageTestId(
    `group-data-header-plusMinus-${letter}`,
  );

  const groupDataContHeader_GD_TestId = getPageTestId(
    `group-data-header-GD-${letter}`,
  );

  const groupDataContHeader_pts_TestId = getPageTestId(
    `group-data-header-Pts-${letter}`,
  );

  return (
    <div
      data-testid={testId}
      className={`${contBackground} ${singleGroupContClass} ${tw.flexA} flex-col rounded-3xl px-7 pt-4 pb-7 w-2/5`} //this is what needs to be adjusted to make the width fit better - target width is about 30% (1/3 is too big and 1/4 is too small)
    >
      <div
        data-testid={groupHeaderTestId}
        className={`${tw.shrinkTextLg} ${tw.whiteTextSm} border-${lineBreakColor} border-b text-center w-full mb-2`}
      >
        Group {letter}
      </div>

      <div
        data-testid={groupDataContTestId}
        className={`${tw.flexBoth} ${tw.shrinkTextSm} w-full`}
      >
        {/*teamColumn below*/}
        <div className={`${boxClass} ${teamColumnClass}`}>
          <div
            data-testid={groupDataContHeaderTeamTestId}
            className={headerClass}
          >
            Team
          </div>

          {teams.map((team: TeamSchema, idx: number) => {
            const flagAndNameTestId = getPageTestId(
              `flag-and-name-cont-${team.name}`,
            );

            return (
              <div
                key={idx}
                data-testid={flagAndNameTestId}
                className={rowClass}
              >
                <img
                  src={team.flag}
                  className="min-w-14 max-w-14 h-8 mr-2"
                  alt=""
                ></img>
                <div>{team.name}</div>
              </div>
            );
          })}
        </div>

        {/*matchDataCont below*/}
        <div className={boxClass}>
          {/*matchesPlayed below*/}

          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_MP_TestId}
              className={headerClass}
            >
              MP
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const mpTestId = getPageTestId(`MP-cont-${team.name}`);

              return (
                <div
                  key={idx}
                  data-testid={mpTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0
                </div>
              );
            })}
          </div>

          {/*wins below*/}
          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_W_TestId}
              className={headerClass}
            >
              W
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const wTestId = getPageTestId(`W-cont-${team.name}`);

              return (
                <div
                  key={idx}
                  data-testid={wTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0
                </div>
              );
            })}
          </div>

          {/*draws below*/}
          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_D_TestId}
              className={headerClass}
            >
              D
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const dTestId = getPageTestId(`D-cont-${team.name}`);

              return (
                <div
                  key={idx}
                  data-testid={dTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0
                </div>
              );
            })}
          </div>

          {/*losses below*/}
          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_L_TestId}
              className={headerClass}
            >
              L
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const lTestId = getPageTestId(`L-cont-${team.name}`);

              return (
                <div
                  key={idx}
                  data-testid={lTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0
                </div>
              );
            })}
          </div>

          {/*+/- below*/}
          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_PlusMinus_TestId}
              className={headerClass}
            >
              +/-
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const plusMinusTestId = getPageTestId(
                `plusMinus-cont-${team.name}`,
              );

              return (
                <div
                  key={idx}
                  data-testid={plusMinusTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0-0
                </div>
              );
            })}
          </div>

          {/*GD below*/}
          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_GD_TestId}
              className={headerClass}
            >
              GD
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const gdTestId = getPageTestId(`GD-cont-${team.name}`);

              return (
                <div
                  key={idx}
                  data-testid={gdTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0
                </div>
              );
            })}
          </div>

          {/*pts below*/}
          <div className={matchResultsColumnClass}>
            <div
              data-testid={groupDataContHeader_pts_TestId}
              className={headerClass}
            >
              Pts
            </div>

            {teams.map((team: TeamSchema, idx: number) => {
              const ptsTestId = getPageTestId(`Pts-cont-${team.name}`);

              return (
                <div
                  key={idx}
                  data-testid={ptsTestId}
                  className={`${rowClass} ${matchResultsRowClass}`}
                >
                  0
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGroupCont;
