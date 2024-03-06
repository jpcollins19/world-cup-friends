import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  withRouter,
  useLocation,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { me, routes, tDispatch } from "../store";
import SignIn from "./signIn/SignIn";
import Leaderboard from "./leaderboard/Leaderboard";
import { Loading } from "./buffet";
import PreSignIn from "./preSignIn/PreSignIn";

const Routes = () => {
  const dispatch = tDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, []);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [pathname]);

  const auth = useSelector((state) => state.auth);

  //const redirectHome = <Redirect to={routes.home} />;

  return loading ? (
    <Loading />
  ) : (
    <Switch>
      {auth.id ? (
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
