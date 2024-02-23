// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import auth from "./auth_store";
//
// const { users } = require("./users_store");
//
// export const reducer = combineReducers({ auth, users });
// const middleware = applyMiddleware(thunk);
// const store = createStore(reducer, middleware);
//
// export default store;
// export * from "./auth_store";
// export * from "./users_store";
// export * from "./utils/index";

import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Reducer,
} from "redux";
import { thunk } from "redux-thunk";
import auth, { AuthState } from "./auth_store";
import users, { UsersState } from "./users_store";

// Define the root state type
export interface RootState {
  auth: AuthState;
  users: UsersState;
}

const reducer: Reducer<RootState> = combineReducers({
  auth,
  users,
});

const middleware = applyMiddleware(thunk);

// Use RootState as the preloadedState type
const store: Store<RootState> = createStore(reducer, middleware);

export default store;
export * from "./auth_store";
export * from "./users_store";
export * from "./utils/index";
