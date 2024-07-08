import * as React from "react";
import {
  withRouter,
  useLocation,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { loadLastUpdated, me, routes, tDispatch } from "../store";
import { useIsUserLoggedIn } from "../hooks";
import { Loading } from "./buffet";
import SignIn from "./signIn/SignIn";
import Leaderboard from "./leaderboard/Leaderboard";
import PreSignIn from "./preSignIn/PreSignIn";
import CreateAccount from "./createAccount/CreateAccount";
import NoMatch from "./noMatch/NoMatch";
import Rules from "./rules/Rules";
import PoolPicks from "./poolPicks/PoolPicks";
import GroupDetails from "./groupDetails/GroupDetails";
import MyPicks from "./myPicks/locked/MyPicks";
import EditMyPicks from "./myPicks/unlocked/EditMyPicks";

const Routes = () => {
  const dispatch = tDispatch();
  const { pathname } = useLocation();

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, []);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    (async () => {
      await dispatch(loadLastUpdated());
    })();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [pathname]);

  const userIsLoggedIn = useIsUserLoggedIn();

  const preSignInRoute = { path: routes.home, component: PreSignIn };
  const signInRoute = { path: routes.signIn, component: SignIn };
  const createAccountRoute = {
    path: routes.createAccount,
    component: CreateAccount,
  };
  const rulesRoute = { path: routes.rules, component: Rules };
  const leaderboardRoute = { path: routes.leaderboard, component: Leaderboard };
  const poolPicksRoute = { path: routes.poolPicks, component: PoolPicks };
  const groupDetailsRoute = {
    path: routes.groupDetails,
    component: GroupDetails,
  };
  const myPicksRoute = {
    path: routes.myPicks,
    component: MyPicks,
  };
  const editMyPicksRoute = {
    path: routes.myPicksEdit,
    component: EditMyPicks,
  };

  const noAuthRoutes = [
    preSignInRoute,
    signInRoute,
    createAccountRoute,
    rulesRoute,
  ];

  const authRoutes = [
    leaderboardRoute,
    poolPicksRoute,
    groupDetailsRoute,
    myPicksRoute,
    editMyPicksRoute,
  ];

  const redirectHome = <Redirect to={routes.home} />;

  return loading ? (
    <Loading />
  ) : (
    <Switch>
      {!userIsLoggedIn &&
        noAuthRoutes.map((route, idx) => (
          <Route
            exact
            key={idx}
            path={route.path}
            component={route.component}
          />
        ))}

      {!userIsLoggedIn &&
        authRoutes.map((route, idx) => (
          <Route exact key={idx} path={route.path}>
            {redirectHome}
          </Route>
        ))}

      {userIsLoggedIn && (
        <Route exact path={routes.home}>
          <Redirect to={routes.leaderboard} />
        </Route>
      )}

      {userIsLoggedIn &&
        authRoutes.map((route, idx) => (
          <Route
            exact
            key={idx}
            path={route.path}
            component={route.component}
          />
        ))}

      <Route path={routes.noMatch}>
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default withRouter(Routes);
