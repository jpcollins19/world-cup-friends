import axios from "axios";

const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

export const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
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
      })
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
