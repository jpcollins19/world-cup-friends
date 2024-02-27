import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { loadUsers, me, tDispatch } from "../store";
import Routes from "./Routes";

const App = () => {
  const dispatch = tDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(me());
      // dispatch(loadUsers());
    })();
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
