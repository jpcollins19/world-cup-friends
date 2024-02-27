import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter, useLocation, Route, Switch } from "react-router-dom";
import { me, routes, tDispatch } from "../store";
import SignIn from "./signIn/SignIn";
import Leaderboard from "./leaderboard/Leaderboard";
import Loading from "./buffet/Loading";

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
    }, 1000);
  }, [pathname]);

  const auth = useSelector((state) => state.auth);

  return loading ? (
    <Loading />
  ) : (
    <Switch>
      {auth.id ? (
        <Route exact path={routes.leaderboard} component={Leaderboard} />
      ) : (
        <Route exact path={routes.signIn} component={SignIn} />
      )}
    </Switch>
  );
};

export default withRouter(Routes);
