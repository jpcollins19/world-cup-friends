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
    <div className="bg-gradient-to-br from-gray-200 via-neutral-400 to-gray-200 h-full">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
