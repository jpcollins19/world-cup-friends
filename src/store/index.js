import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import auth from "./auth_store";

const { users } = require("./users_store");

const reducer = combineReducers({ auth, users });
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth_store";
export * from "./users_store";
export * from "./funcs";
