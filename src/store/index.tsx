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
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Reducer,
  AnyAction,
} from "redux";
import { thunk, ThunkDispatch, ThunkAction } from "redux-thunk";
import auth, { AuthState } from "./auth_store";
import users, { UsersState } from "./users_store";
import tourneyStage, { TourneyStageSchema } from "./tourneyStage_store";
import lastUpdated, { LastUpdatedSchema } from "./lastUpdated_store";

// Define the root state type
export interface RootState {
  auth: AuthState;
  users: UsersState;
  tourneyStage: TourneyStageSchema;
  lastUpdated: LastUpdatedSchema;
}

export const reducer: Reducer<RootState> = combineReducers({
  auth,
  users,
  tourneyStage,
  lastUpdated,
});

//const middleware = applyMiddleware(thunk);

// Use RootState as the preloadedState type

//export type TypedDispatch = typeof store.dispatch;
// export type TypedThunk<R = void> = ThunkAction<R, ReduxState, unknown, Action>;

//export const useTypedDispatch = () => useDispatch<TypedDispatch>();
// export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

//const middleware: Middleware[] = [...getDefaultMiddleware<ReduxState>()];

// const middleware: Middleware<{}, any, Dispatch<AnyAction>>[];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof reducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const tDispatch = () => useDispatch<TypedDispatch>();
//export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

//const store: Store<RootState> = createStore(reducer, middleware);

export default store;
export * from "./auth_store";
export * from "./users_store";
export * from "./tourneyStage_store";
export * from "./lastUpdated_store";
export * from "./utils/index";
