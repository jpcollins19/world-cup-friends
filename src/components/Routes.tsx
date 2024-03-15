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

  return loading ? (
    <Loading />
  ) : (
    <Switch>
      {userIsLoggedIn ? (
        <Route exact path={routes.leaderboard} component={Leaderboard} />
      ) : (
        <Route exact path={routes.signIn} component={SignIn} />
        //  <div>
        //   <Route exact path={routes.home} component={PreSignIn} />
        // <Route exact path={routes.signIn} component={SignIn} />
        //   <Route exact path={routes.leaderboard} component={Leaderboard} />
        //  </div>
      )}
    </Switch>
  );
};

export default withRouter(Routes);
