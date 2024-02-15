import { useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { me } from "./store";
import { useSelector, useDispatch } from "react-redux";
// import Pre_Login_Page from "./pre_login/Pre_Login_Page";
import Login_Page from "./components/Login_Page";
import Home_Page from "./components/Home_Page";

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(me()), []);

  const auth = useSelector((state) => state.auth);

  return auth.id ? (
    <Switch>
      <Route exact path="/home" component={Home_Page} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={Login_Page} />
    </Switch>
  );
};

export default withRouter(Routes);
