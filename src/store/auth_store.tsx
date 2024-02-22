import axios from "axios";

const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

export const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = (): any => async (dispatch: any) => {
  const token = window.localStorage.getItem(TOKEN);

  if (token) {
    const response = await axios.get("/api/me", {
      headers: {
        authorization: token,
      },
    });

    return dispatch(setAuth(response.data));
  }
};

// import { Dispatch } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { reducer } from "./index";
// import axios from "axios";
//
// // Define your action type
// interface SetAuthAction {
//   type: "SET_AUTH";
//   auth: any; // Replace 'any' with the actual payload type
// }
//
// // Define your setAuth action creator
// export const setAuth = (auth: any): SetAuthAction => ({
//   type: "SET_AUTH",
//   auth,
// });
//
// // Define your async action creator
// export const me = (): ThunkAction<void, RootState, unknown, SetAuthAction> => {
//   return async (dispatch: Dispatch) => {
//     const token = window.localStorage.getItem(TOKEN);
//
//     if (token) {
//       try {
//         const response = await axios.get("/api/me", {
//           headers: {
//             authorization: token,
//           },
//         });
//
//         dispatch(setAuth(response.data));
//       } catch (error) {
//         // Handle error, you might want to dispatch an error action or do something else
//         console.error("Error fetching user data:", error);
//       }
//     }
//   };
// };

export const authenticate = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("api/authorize", { email, password });
    const { token } = response.data;
    window.localStorage.setItem(TOKEN, token);
    dispatch(me());
  } catch (authError) {
    return dispatch(
      setAuth({
        error: `the error is happening in the authenticate thunk in the store: ${authError}`,
      }),
    );
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
