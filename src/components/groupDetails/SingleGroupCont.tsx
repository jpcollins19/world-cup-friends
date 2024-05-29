import * as React from "react";
import { useSelector } from "react-redux";
import {
  tDispatch,
  getPageTestId,
  tw,
  loadTeams,
  groupLetters,
} from "../../store";

type SingleGroupContProps = {
  letter: string;
};

export const SingleGroupCont: React.FunctionComponent<SingleGroupContProps> = ({
  letter,
}) => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(loadTeams());
    })();
  }, []);

  const teams = useSelector((state) => state.teams).filter(
    (team) => team.group === letter,
  );

  const color1 = "bg-gray-400";
  const color2 = "zinc-400";

  //const contBackground = `bg-gradient-to-br from-${color1} via-${color2} to-${color1}`;
  const contBackground = color1;

  // const teamColumnClass = tw.bPurple;
  const teamColumnClass = `flex-[0.3]`;

  // const matchDataContClass = tw.bRed;
  const matchDataContClass = `flex flex-[0.7]`;

  const matchResultsColumnClass = `${tw.flexBoth} flex-col`;
  const matchResultsRowClass = `${tw.flexBoth} mr-2`;

  const rowClass = `flex border-${color2} w-full border-b py-2`;

  const flagHeight = "30px";
  const flagWidth = "45px";
  const flagClass = `bg-cover bg-center flex flex-[0.2] max-w-[${flagWidth}] min-w-[${flagWidth}] max-h-[${flagHeight}] min-h-[${flagHeight}] items-center mr-2`;

  const headerClass = "font-bold mr-2";

  const testId = getPageTestId(`single-group-cont-${letter}`);
  const groupHeader = getPageTestId(`group-header-${letter}`);
  const teamsDataContTestId = getPageTestId(`teams-data-${letter}`);

  const header = getPageTestId(`teams-data-header-${letter}`);
  const flagNameCont = getPageTestId(`flag-and-name-cont-${letter}`);

  return (
    <div
      data-testid={testId}
      className={`${contBackground} ${tw.flexA} flex-col m-5 rounded-3xl p-4 w-1/3`} //this is what needs to be adjusted to make the width fit better - target width is about 30% (1/3 is too big and 1/4 is too small)
    >
      <div
        data-testid={groupHeader}
        className={`${tw.shrinkTextLg} ${tw.whiteTextSm} border-${color2} border-b text-center`}
      >
        Group {letter}
      </div>

      <div
        data-testid={teamsDataContTestId}
        className={`${tw.bDodger} flex h-full w-full`}
      >
        {/*teamColumn below*/}
        <div className={teamColumnClass}>
          <div data-testid={header} className={headerClass}>
            Team
          </div>

          {teams.map((team, idx) => (
            <div key={idx} data-testid={flagNameCont} className={rowClass}>
              <div
                className={`${flagClass}`}
                style={{ backgroundImage: `url(${team.flag})` }}
              ></div>
              <div>{team.name}</div>
            </div>
          ))}
        </div>

        {/*matchDataCont below*/}
        <div className={matchDataContClass}>
          {/*matchesPlayed below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              MP
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                0
              </div>
            ))}
          </div>

          {/*wins below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              W
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                3
              </div>
            ))}
          </div>

          {/*draws below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              D
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                1
              </div>
            ))}
          </div>

          {/*losses below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              L
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                3
              </div>
            ))}
          </div>

          {/*+/- below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              +/-
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                11-5
              </div>
            ))}
          </div>

          {/*GD below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              GD
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                -10
              </div>
            ))}
          </div>

          {/*pts below*/}
          <div className={matchResultsColumnClass}>
            <div data-testid={header} className={headerClass}>
              Pts
            </div>

            {teams.map((team, idx) => (
              <div key={idx} className={`${rowClass} ${matchResultsRowClass}`}>
                13
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGroupCont;
