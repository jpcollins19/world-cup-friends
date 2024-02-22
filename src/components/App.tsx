import * as React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { loadUsers, me } from "../store";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUsers());
    dispatch(me());
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
