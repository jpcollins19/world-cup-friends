import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { me, routes, tDispatch } from "../store";
import SignIn from "./signIn/SignIn";
// import Home_Page from "./components/Home_Page";

const Routes = () => {
  const dispatch = tDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, []);

  const auth = useSelector((state) => state.auth);

  return (
    <Switch>
      {auth.id ? (
        // <Route exact path="/home" component={Home_Page} />
        <div>home page byah!</div>
      ) : (
        <Route exact path={routes.home} component={SignIn} />
      )}
    </Switch>
  );
};

export default withRouter(Routes);
