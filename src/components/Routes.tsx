import * as React from "react";
import {
  withRouter,
  useLocation,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { loadLastUpdated, me, routes, tDispatch } from "../store";
import SignIn from "./signIn/SignIn";
import Leaderboard from "./leaderboard/Leaderboard";
import { Loading } from "./buffet";
import PreSignIn from "./preSignIn/PreSignIn";
import { useGetLastUpdated, useIsUserLoggedIn } from "../hooks";
import CreateAccount from "./createAccount/CreateAccount";

const Routes = () => {
  const dispatch = tDispatch();
  const { pathname } = useLocation();

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, []);

  const lastUpdated = useGetLastUpdated();

  React.useEffect(() => {
    (async () => {
      await dispatch(loadLastUpdated());
    })();
  }, [lastUpdated]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [pathname]);

  //const redirectHome = <Redirect to={routes.home} />;

  const userIsLoggedIn = useIsUserLoggedIn();

  const noAuthRoutes = [
    { path: routes.signIn, component: SignIn },
    { path: routes.createAccount, component: CreateAccount },
  ];

  return loading ? (
    <Loading />
  ) : (
    <Switch>
      {!userIsLoggedIn ? (
        noAuthRoutes.map((route, key) => (
          <Route
            exact
            key={key}
            path={route.path}
            component={route.component}
          />
        ))
      ) : (
        <Route exact path={routes.leaderboard} component={Leaderboard} />
      )}
    </Switch>
  );
};

export default withRouter(Routes);
