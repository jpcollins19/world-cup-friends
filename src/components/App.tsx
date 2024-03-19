import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  loadTourneyStage,
  loadUsers,
  me,
  routes,
  tDispatch,
  tw,
} from "../store";
import Routes from "./Routes";
import Navbar from "./navbar/Navbar";

const App = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
      await dispatch(loadUsers());
      await dispatch(loadTourneyStage());
    })();
  }, []);

  //const dataTestId = getPageTestId("app");

  // const navbarClass =
  //   "max-w-sm mx-auto bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out";

  const navbarClass = "bg-white";

  return (
    <div
      // data-testid={dataTestId}
      className="flex bg-gradient-to-bl from-gray-200 via-neutral-400 to-gray-200 h-screen w-screen"
    >
      <Router>
        <div className={`${navbarClass} ${tw.elevate} h-screen w-1/5`}>
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
