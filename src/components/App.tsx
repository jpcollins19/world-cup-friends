import * as React from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import { loadUsers, me, routes, tDispatch, tw } from "../store";
import Routes from "./Routes";
import Navbar from "./navbar/Navbar";

const App = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
      // dispatch(loadUsers());
    })();
  }, []);

  return (
    <div className="flex bg-gradient-to-br from-gray-200 via-neutral-400 to-gray-200 h-screen w-screen">
      <Router>
        <div className={`${tw.bPurple} h-screen w-1/5`}>
          <Route path={routes.home} component={Navbar} />
        </div>

        <div className="h-screen w-screen overflow-auto">
          <Routes />
        </div>
      </Router>
    </div>
  );
};

export default App;
