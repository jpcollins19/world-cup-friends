import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { loadUsers } from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
