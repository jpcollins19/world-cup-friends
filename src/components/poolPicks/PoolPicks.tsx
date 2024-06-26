import * as React from "react";
import { loadingDefault, getPageTestId, tw } from "../../store";
import { Loading, PreTourneyHeader } from "../buffet";
import { useFindTourneyStage, useHasTourneyStarted } from "../../hooks";
// import {Link} from "react-router-dom";
// import { useAppDispatch } from "../hooks";
// import Sign_In_Options from "../Sign_In_Options";
// import Button from "../../Misc/Button";
// import toast, {Toaster} from "react-hot-toast";
// import Error from "@mui/icons-material/ErrorOutline";

export const PoolPicks: React.FunctionComponent = () => {
  // const dispatch = useDispatch();
  //
  // const [loading, setLoading] = useState(true);
  //
  // useEffect(() => {
  //   dispatch(loadUsers());
  // }, []);
  //
  // setTimeout(() => {
  //   setLoading(false);
  // }, 500);
  //
  // const joe = findJoe(useSelector((state) => state.users));
  //
  // const users = useSelector((state) => state.users).filter(
  //     (user) => user.tiebreaker
  // );
  //
  // const user = useSelector((state) => state.auth);
  // const teams = useSelector((state) => state.teams);
  //
  // const rankInfo =
  //     joe?.tourneyStage > 1 ? getCurrentScores(users, teams, joe) : null;
  //
  // const showPayout = shouldPayoutShow(joe, user);
  //
  // const isMobile = getScreenWidth("max", 65);

  // const dispatch = tDispatch();
  // const history = useHistory();

  const hasTourneyStarted = useHasTourneyStarted();

  const testId = getPageTestId("pool-picks-page");
  const chooseUserDropdownTestId = getPageTestId("pool-picks-user-dropdown");
  const userPicksTestId = getPageTestId("pool-picks-user-picks");

  const jaime = "https://i.ytimg.com/vi/3jKj1_aI1EI/maxresdefault.jpg";

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={testId}
      className={`${tw.backgroundImage} ${tw.flexJ}`}
      style={{ backgroundImage: `url(${jaime})` }}
    >
      <PreTourneyHeader page="Pool Picks" />

      {hasTourneyStarted && (
        <div data-testid={chooseUserDropdownTestId}>user picks dropdown</div>
      )}

      {hasTourneyStarted && (
        <div data-testid={userPicksTestId}>pool picks user picks container</div>
      )}
    </div>
  );
};

export default PoolPicks;
