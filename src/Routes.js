import { useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { me, routes } from "./store";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "./components/signIn/SignIn";
// import Home_Page from "./components/Home_Page";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
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
