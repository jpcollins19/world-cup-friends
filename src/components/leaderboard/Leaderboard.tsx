import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  tDispatch,
  logout,
  loadingDefault,
  getPageTestId,
  tw,
} from "../../store";
import { Loading, PreTourneyHeader } from "../buffet";
import { useFindTourneyStage } from "../../hooks";
// import {Link} from "react-router-dom";
// import { useAppDispatch } from "../hooks";
// import Sign_In_Options from "../Sign_In_Options";
// import Button from "../../Misc/Button";
// import toast, {Toaster} from "react-hot-toast";
// import Error from "@mui/icons-material/ErrorOutline";

//const SignIn = () => {
export const Leaderboard: React.FunctionComponent = () => {
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

  const dispatch = tDispatch();
  const history = useHistory();

  const testId = getPageTestId("leaderboard-page");

  const zidane =
    "https://as01.epimg.net/futbol/imagenes/2020/04/10/primera/1586529604_835391_1586529700_noticia_normal.jpg";

  const tourneyStage = useFindTourneyStage();

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={testId}
      className={`${tw.backgroundImage} ${tw.flexJ}`}
      style={{ backgroundImage: `url(${zidane})` }}
    >
      <PreTourneyHeader page="Leaderboard" />

      {/*{!isMobile && showPayout && <Payout />}*/}
      {/*{joe?.tourneyStage === 1 ? (*/}
      {/*  <h1 className="pre-tourney-header">*/}
      {/*    {createPreTourneyDataNotAvailableYetMessage("Leaderboard")}*/}
      {/*  </h1>*/}
      {/*) : user?.tiebreaker ? (*/}
      {/*  <Leaderboard_Cont joe={joe} rankInfo={rankInfo} />*/}
      {/*) : (*/}
      {/*  ""*/}
      {/*)}*/}
    </div>
  );
};

export default Leaderboard;
