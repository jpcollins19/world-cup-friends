import * as React from "react";
import { useSelector } from "react-redux";
import { tDispatch, getPageTestId, tw, loadTeams } from "../../store";

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

  // const contBackground = `bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-300`;
  const contBackground = `bg-zinc-400`;

  const testId = getPageTestId(`single-group-cont-${letter}`);

  return (
    <div
      data-testid={testId}
      className={`${contBackground} ${tw.flexA} flex-col w-1/5 m-5 rounded-3xl`}
    >
      <div className={`${tw.shrinkTextBase} ${tw.whiteTextSm} my-2`}>
        Group {letter}
      </div>
      joe
    </div>
  );
};

export default SingleGroupCont;
