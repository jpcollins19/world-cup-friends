import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import {loadUsers, me} from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(me())
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
